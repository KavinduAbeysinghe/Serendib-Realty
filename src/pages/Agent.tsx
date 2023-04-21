import React from "react";
import "../styles/Agent.scss";
import LoginForm from "../components/LoginForm";

function Agent() {
  const formText = {
    formTitle: "Agent Login",
    formRegBtnTxt: "Register as an Agent?",
    loginUrl: "/agents/login",
  };

  return (
    <div className="agent-container d-flex justify-content-center align-items-center vh-100">
      <LoginForm formTxt={formText} />
    </div>
  );
}

export default Agent;
