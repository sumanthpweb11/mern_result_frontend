import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DefaultLayout = ({ children }) => {
  const { employee } = useSelector((state) => state.employee);
  const navigate = useNavigate();
  return (
    <div className="layout">
      <div className="header flex justify-between items-center">
        <h1 className="text-white">
          <b className="secondary-text">Mern</b> RESULTS{" "}
        </h1>
        <div>
          <h1 className="text-white text-small">{employee?.name}</h1>
          <h1
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              localStorage.removeItem("emptoken");
              navigate("/login");
            }}
          >
            Logout
          </h1>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default DefaultLayout;
