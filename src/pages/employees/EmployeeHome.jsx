import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { CgUserList, CgProfile } from "react-icons/cg";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useSelector } from "react-redux";

function EmployeeHome() {
  const navigate = useNavigate();

  return (
    <div className="h-screen   w-full flex  justify-center    items-center">
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <div
            className="p-3 flex  primary-border card w-[300px] h-[150px] cursor-pointer items-center justify-center gap-2 hover:bg-slate-100"
            onClick={() => {
              navigate("/employee/students");
            }}
          >
            <CgProfile size={30} />
            <h1>Students</h1>
          </div>
        </Col>
        <Col span={8}>
          <div
            className="p-3  primary-border card w-[300px]  h-[150px] cursor-pointer flex   items-center justify-center gap-2 hover:bg-slate-100"
            onClick={() => {
              navigate("/employee/results");
            }}
          >
            <CgUserList size={30} />
            <h1>Results</h1>
          </div>
        </Col>

        <Col span={8}>
          <div
            className="p-3  primary-border card w-[300px]  h-[150px] cursor-pointer flex   items-center justify-center gap-2 hover:bg-slate-100"
            onClick={() => {
              navigate("/employee/all-employees");
            }}
          >
            <FaChalkboardTeacher size={30} />
            <h1>Employees</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default EmployeeHome;
