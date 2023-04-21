import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AgentPropCard from "../components/AgentPropCard";
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

function ViewProperties() {
  const location = useLocation();

  const searchParam = new URLSearchParams(location.search);

  const agentId = searchParam.get("agentId");

  const [agentPropArray, setAgentPropArray] = useState([]);

  const [agentName, setAgentName] = useState("");

  useEffect(() => {
    getAgentName();
    const fetchAgentsProp = async () => {
      try {
        const res = await axiosInstance.get(`/properties/agent/${agentId}`);
        setAgentPropArray(res.data);
      } catch (error: any) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchAgentsProp();
  }, []);

  const getAgentName = async () => {
    try {
      const res = await axiosInstance.get(`/agents/${agentId}`);
      setAgentName(res.data.agentName);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="d-flex flex-grow-1 pt-5 justify-content-center">
      <div className="container mt-5">
        <h1 className="mb-5">Properties of, {agentName}</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {agentPropArray.map((agentsProp: PropertyObj) => (
            <AgentPropCard
              key={agentsProp.propertyId}
              propertyCardProps={agentsProp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewProperties;
