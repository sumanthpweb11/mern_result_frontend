import { Col, Form, Row } from "antd";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts";
import { useNavigate } from "react-router-dom";

function EmployeeForm({ employee, type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "edit") {
        response = await axios.post(
          `/api/employee/update-employee/${employee.employeeId}`,
          // values,
          {
            payload: {
              ...values,
              employeeId: employee.employeeId,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("emptoken")}`,
            },
          }
        );
      } else {
        response = await axios.post("/api/employee/add-employee", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("emptoken")}`,
          },
        });
      }

      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/employee/all-employees");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Form layout="vertical" initialValues={employee} onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <Form.Item label="employeeId" name="employeeId">
              <input type="text" disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="name" name="name">
              <input type="text" disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="isApproved" name="isApproved">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end mt-2">
          <button className="primary text-white px-5">Save</button>
        </div>
      </Form>
    </div>
  );
}

export default EmployeeForm;
