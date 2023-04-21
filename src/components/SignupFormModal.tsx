import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axiosInstance";

interface SignupFormModalProps {
  show: boolean;
  onHide: () => void;
  loginURL: string;
}

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignupFormModal(props: SignupFormModalProps) {
  const loginPerson = (): string => {
    if (props.loginURL === "/agents/login") {
      return "agents";
    } else if (props.loginURL === "/buyers/login") {
      return "buyers";
    } else {
      return "admins";
    }
  };

  const changeTitle = () => {
    const login = loginPerson();
    if (login === "agents") {
      return "Agent SignUp";
    } else if (login === "buyers") {
      return "Buyer SignUp";
    }
  };

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm<SignUpFormData>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const returnObj = (data: SignUpFormData) => {
    const agentObj = {
      agentName: data.name,
      agentEmail: data.email,
      agentPassword: data.password,
    };

    const buyerObj = {
      buyerName: data.name,
      buyerEmail: data.email,
      buyerPassword: data.password,
    };

    if (loginPerson() === "agents") {
      return agentObj;
    } else if (loginPerson() === "buyers") {
      return buyerObj;
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data);

    try {
      const res = await axiosInstance.post(
        `/${loginPerson()}`,
        returnObj(data)
      );
      alert(res.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }

    reset();
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setError("Passwords do not match");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{changeTitle()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              {...register("name", {
                required: "Name is required",
              })}
              onKeyUp={() => {
                trigger("name");
              }}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid Email" },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a password"
              {...register("password", {
                required: "Password is required",
              })}
              onKeyUp={() => {
                trigger("password");
              }}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm the password"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: validateConfirmPassword,
              })}
              onKeyUp={() => {
                trigger("confirmPassword");
              }}
            />
            {errors.confirmPassword && (
              <small className="text-danger">{error}</small>
            )}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              SignUp
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignupFormModal;
