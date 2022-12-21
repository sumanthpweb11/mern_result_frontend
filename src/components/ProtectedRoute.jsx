import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";
import { useNavigate } from "react-router-dom";
import { SetEmployee } from "../redux/employees";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [readyToRednder, setReadyToRednder] = useState(false);
  const dispatch = useDispatch();

  const getEmployeeData = async () => {
    try {
      dispatch(ShowLoading());
      const emptoken = localStorage.getItem("emptoken");
      dispatch(HideLoading());
      const response = await axios.post(
        "/api/employee/get-employee-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${emptoken} `,
          },
        }
      );

      if (response.data.success) {
        dispatch(SetEmployee(response.data.data));
        setReadyToRednder(true);
      }
    } catch (error) {
      localStorage.removeItem("emptoken");
      dispatch(HideLoading());
      // toast.error("Something went wrong/Invalid Token");
      navigate("/login");
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);
  return readyToRednder && <DefaultLayout>{children}</DefaultLayout>;
};

export default ProtectedRoute;
