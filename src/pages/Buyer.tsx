import React from "react";
import "../styles/Buyer.scss";
import LoginForm from "../components/LoginForm";

function Buyer() {
  const formText = {
    formTitle: "Buyer Login",
    formRegBtnTxt: "Create an account?",
    loginUrl: "/buyers/login",
  };

  return (
    <div className="agent-container2 d-flex justify-content-center align-items-center vh-100">
      <LoginForm formTxt={formText} />
    </div>
  );
}

export default Buyer;
