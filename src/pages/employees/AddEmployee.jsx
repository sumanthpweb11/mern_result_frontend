import React from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm";
import PageTitle from "../../components/PageTitle";

const AddEmployee = () => {
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Add Employee" />
      <EmployeeForm />
    </div>
  );
};

export default AddEmployee;
