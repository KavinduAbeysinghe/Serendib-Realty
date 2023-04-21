import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import axiosInstance from "../config/axiosInstance";

interface SearchFilterProps {
  onHide: () => void;
  show: boolean;
  person: string;
  userId: number;
  isUpdateBtnClicked: boolean;
  personObj: any;
}

interface UpdateFormData {
  name: string;
  email: string;
  password: string;
}

function UpdateModal(props: SearchFilterProps) {
  const changeHeading = () => {
    if (props.person === "agent") {
      return props.isUpdateBtnClicked ? "Agent Update" : "Add Agent";
    } else if (props.person === "buyer") {
      return props.isUpdateBtnClicked ? "Buyer Update" : "Add Buyer";
    }
  };

  const returnPersonObj = (data: UpdateFormData) => {
    const Agent = {
      agentName: data.name,
      agentEmail: data.email,
      agentPassword: data.password,
    };

    const Buyer = {
      buyerName: data.name,
      buyerEmail: data.email,
      buyerPassword: data.password,
    };

    if (props.person === "agent") {
      return Agent;
    } else if (props.person === "buyer") {
      return Buyer;
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm<UpdateFormData>();

  const onSubmit = async (data: UpdateFormData) => {
    console.log(data);
    let URL = "";
    if (props.person === "agent") {
      URL = `/agents`;
    } else if (props.person === "buyer") {
      URL = `/buyers`;
    }

    if (!props.isUpdateBtnClicked) {
      try {
        const res = await axiosInstance.post(URL, returnPersonObj(data));
        console.log(res);
        alert(res.data);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    } else {
      URL += `/${props.userId}`;
      try {
        console.log(URL);
        const res = await axiosInstance.put(URL, returnPersonObj(data));
        console.log(res);
        alert(res.data);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }

    reset();
  };

  const handleDefaultValueName = (): string => {
    if (props.isUpdateBtnClicked) {
      return props.person === "agent"
        ? props.personObj.agentName
        : props.personObj.buyerName;
    } else {
      return "";
    }
  };

  const handleDefaultValueEmail = (): string => {
    if (props.isUpdateBtnClicked) {
      return props.person === "agent"
        ? props.personObj.agentEmail
        : props.personObj.buyerEmail;
    } else {
      return "";
    }
  };

  const handleDefaultValuePass = (): string => {
    if (props.isUpdateBtnClicked) {
      return props.person === "agent"
        ? props.personObj.agentPassword
        : props.personObj.buyerPassword;
    } else {
      return "";
    }
  };

  useEffect(() => {
    reset();
  }, [props.onHide, props.show]);

  return (
    <div>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{changeHeading()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                defaultValue={handleDefaultValueName()}
                type="text"
                placeholder="Enter Name"
                {...register("name", { required: "Name is required" })}
                onKeyUp={() => trigger("name")}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={handleDefaultValueEmail()}
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid Email" },
                })}
                onKeyUp={() => trigger("email")}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                defaultValue={handleDefaultValuePass()}
                type="text"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                onKeyUp={() => trigger("password")}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Confirm
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateModal;
