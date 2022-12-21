import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";

import { useParams } from "react-router-dom";
import StudentForm from "../../components/StudentForm";
import EmployeeForm from "../../components/EmployeeForm";

function EditEmployee() {
  const [employee, setEmployee] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEmployee = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/employee/get-employee/${params.employeeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("emptoken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setEmployee(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);
  const params = useParams();
  return (
    <div>
      <PageTitle title="Edit Employee" />
      <img
        src="https://cdn-icons-png.flaticon.com/512/2444/2444472.png"
        alt=""
        height={100}
        width={100}
        className="my-2"
      />
      {employee && <EmployeeForm employee={employee} type="edit" />}
    </div>
  );
}

export default EditEmployee;
