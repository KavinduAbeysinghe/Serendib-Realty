import React, { useEffect, useState } from "react";
import "../styles/AgentDashboard.scss";
import { useLocation } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import Model from "../components/Model";
import axiosInstance from "../config/axiosInstance";

interface PropertyObj {
  propertyId: number;
  propertyType: string;
  noOfBedRooms: number;
  noOfBathrooms: number;
  propertyLocation: string;
  propertyPrice: number;
  propertyDescription: string;
  propertyImgURL: string;
}

const AgentDashboard: React.FC = () => {
  const [updateClick, setUpdateClick] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUpdateClick(false);
    updateView();
  };
  const handleShow = () => setShow(true);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  const [agentName, setAgentName] = useState("");
  const [agentId, setAgentId] = useState(0);

  const [propertyObjArray, setPropertyObjArray] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/agents/${userId}`)
      .then((res) => {
        setAgentName(res.data.agentName);
        setAgentId(res.data.agentId);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [agentName]);

  useEffect(() => {
    axiosInstance
      .get(`/properties/agent/${userId}`)
      .then((res) => {
        console.log(res.data);
        setPropertyObjArray(res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response.data);
      });
  }, []);

  const updateView = async () => {
    const response = await axiosInstance.get(`/properties/agent/${userId}`);
    setPropertyObjArray(response.data);
  };

  const [propertyObj, setPropertyObj] = useState<PropertyObj>();

  const handleUpdate = (propObj: PropertyObj) => {
    console.log(propObj);
    setPropertyObj(propObj);
    setUpdateClick(true);
    setShow(true);
  };

  const handleDelete = (propObj: PropertyObj) => {
    axiosInstance
      .delete(`/properties/${propObj.propertyId}`)
      .then((res) => {
        alert(res.data);
        updateView();
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <React.Fragment>
      <div className="d-flex flex-grow-1 pt-5 justify-content-center">
        <div className="container mt-5">
          <h1>Welcome, {agentName}</h1>
          <div className="d-flex mb-5 mt-5 gap-1">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleShow}
            >
              Add New Property
            </button>
            {/* <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="First name"
            />
            <button className="btn btn-secondary btn-sm">Search</button> */}
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {propertyObjArray.map((propObj: PropertyObj) => (
              <PropertyCard
                key={propObj.propertyId}
                propertyCardProps={propObj}
                handleUpdate={() => handleUpdate(propObj)}
                handleDelete={() => handleDelete(propObj)}
              />
            ))}
          </div>
        </div>
      </div>
      <Model
        onHide={handleClose}
        show={show}
        userId={agentId}
        isUpdateClicked={updateClick}
        propertyObj={propertyObj}
      />
    </React.Fragment>
  );
};

export default AgentDashboard;
