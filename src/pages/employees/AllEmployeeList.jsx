import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";

const AllEmployeeList = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const getEmployees = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/employee/get-all-employees",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("emptoken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setEmployees(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const columns = [
    {
      title: "employeeId",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "isApproved",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (record, text) => String(text.isApproved),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-3">
          {/* <AiOutlineDelete
           onClick={() => {
             deleteStudent(record.rollNo);
           }}
         /> */}

          <AiOutlineEdit
            className="cursor-pointer"
            onClick={() => {
              navigate(`/employee/edit/${record.employeeId}`);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title="All Employees" />
      <div className="flex justify-between items-center w-full ">
        <input
          type="text"
          className="w-300 px-2"
          placeholder="search employees"
        />
      </div>
      <Table columns={columns} dataSource={employees} />
    </div>
  );
};

export default AllEmployeeList;
