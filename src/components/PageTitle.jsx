import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function PageTitle({ title }) {
  const navigate = useNavigate();
  return (
    <div className="px-2 flex gap-5 items-center mb-2">
      <AiOutlineArrowLeft
        onClick={() => {
          navigate(-1);
        }}
      />
      <h1 className="text-large">{title}</h1>
      <hr className="bg-red-900" />
    </div>
  );
}

export default PageTitle;
