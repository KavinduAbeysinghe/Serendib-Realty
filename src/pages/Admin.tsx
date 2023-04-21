import React from "react";
import "../styles/Admin.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";

interface AdminLoginForm {
  email: string;
  password: string;
}

function Admin() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm<AdminLoginForm>();

  const onSubmit = async (adminData: AdminLoginForm) => {
    console.log(adminData);
    try {
      const res = await axiosInstance.post("/admin/login", {
        adminEmail: adminData.email,
        adminPassword: adminData.password,
      });
      console.log(res.data);
      navigate("/adminDash");
    } catch (error: any) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
    reset();
  };

  return (
    <div className="agent-container3 d-flex justify-content-center align-items-center vh-100">
      <div className="card p-3" style={{ width: "35rem" }}>
        <img
          src=""
          //   https://hips.hearstapps.com/hmg-prod/images/reschio-estate-cercoschene-13-1666198556.jpg?crop=1.00xw:0.867xh;0,0.124xh&resize=1200:*
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h1>Admin Login</h1>
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
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid Email" },
                })}
                onKeyUp={() => trigger("email")}
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
                {...register("password", {
                  required: "Password is required",
                })}
                onKeyUp={() => trigger("password")}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
