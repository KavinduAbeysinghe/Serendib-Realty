import { useForm } from "react-hook-form";
import "../styles/LoginForm.scss";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SignupFormModal from "./SignupFormModal";
import axiosInstance from "../config/axiosInstance";

interface FormText {
  formTitle: string;
  formRegBtnTxt: string;
  loginUrl: string;
}

interface FormTxtProps {
  formTxt: FormText;
}

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC<FormTxtProps> = ({ formTxt }) => {
  const [show, setShow] = useState(false);

  const onHide = () => {
    setShow(false);
  };

  const handleFormPopup = () => {
    setShow(true);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FormData>();

  const returnObject = (data: FormData) => {
    if (formTxt.loginUrl === "/buyers/login") {
      return {
        buyerEmail: data.email,
        buyerPassword: data.password,
      };
    } else if (formTxt.loginUrl === "/agents/login") {
      return {
        agentEmail: data.email,
        agentPassword: data.password,
      };
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    axiosInstance
      .post(formTxt.loginUrl, returnObject(data))
      .then((res) => {
        if (formTxt.loginUrl === "/buyers/login") {
          const queryString = `?userId=${res.data.buyerId}`;
          navigate(`/BuyerDashboard${queryString}`);
        } else if (formTxt.loginUrl === "/agents/login") {
          const queryString = `?userId=${res.data.agentId}`;
          navigate(`/AgentDashboard${queryString}`);
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        // console.log(error.response.data);
      });
    reset();
  };

  return (
    <React.Fragment>
      <div className="card p-3" style={{ width: "35rem" }}>
        <img
          src="../images/bg.jpg"
          //   https://hips.hearstapps.com/hmg-prod/images/reschio-estate-cercoschene-13-1666198556.jpg?crop=1.00xw:0.867xh;0,0.124xh&resize=1200:*
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h1>{formTxt.formTitle}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid Email",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                {...register("password", { required: "Password is Required" })}
                onKeyUp={() => trigger("password")}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <a
                className="text-decoration-none register-btn"
                onClick={handleFormPopup}
              >
                {formTxt.formRegBtnTxt}
              </a>
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <SignupFormModal
        show={show}
        onHide={onHide}
        loginURL={formTxt.loginUrl}
      />
    </React.Fragment>
  );
};

export default LoginForm;
