import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Students = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const getStudents = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/student/get-all-students",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("emptoken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const deleteStudent = async (rolNo) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `/api/student/delete-student/${rolNo}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("emptoken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getStudents();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-3">
          <AiOutlineDelete
            className="cursor-pointer"
            onClick={() => {
              deleteStudent(record.rollNo);
            }}
          />

          <AiOutlineEdit
            className="cursor-pointer"
            onClick={() => {
              navigate(`/employee/students/edit/${record.rollNo}`);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title="Students" />
      <div className="flex justify-between items-center ">
        <input
          type="text"
          className="w-300 px-2"
          placeholder="search students"
        />
        <button
          onClick={() => {
            navigate("/employee/students/add");
          }}
          className="primary text-white p-3"
        >
          Add Student
        </button>
      </div>
      <Table columns={columns} dataSource={students} />
    </div>
  );
};

export default Students;
