import React, { useState, useEffect } from "react";
import UpdateModal from "../components/UpdateModal";
import Agent from "./Agent";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.scss";
import axiosInstance from "../config/axiosInstance";

interface Agent {
  agentId: number;
  agentName: string;
  agentEmail: string;
  agentPassword: string;
}

interface Buyer {
  buyerId: number;
  buyerName: string;
  buyerEmail: string;
  buyerPassword: string;
}

function AdminDashboard() {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);

  const [show, setShow] = useState(false);

  const [person, setPerson] = useState("");

  const [userId, setUserId] = useState(0);

  const handleClose = () => {
    setShow(false);
    fetchAgentData();
    fetchBuyerData();
  };

  const [personObj, setPersonObj] = useState<Agent | Buyer>();

  const handleAgentUpdate = (agent: Agent) => {
    setPersonObj(agent);
    setIsUpdateClicked(true);
    setPerson("agent");
    setUserId(agent.agentId);
    setShow(true);
  };

  const handleAddAgent = () => {
    setIsUpdateClicked(false);
    setPerson("agent");
    setShow(true);
  };

  const [agentArray, setAgentArray] = useState([]);

  const fetchAgentData = async () => {
    try {
      const res = await axiosInstance.get("/agents");
      setAgentArray(res.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAgentData();
  }, []);

  const handleAgentDelete = async (agentObj: Agent) => {
    try {
      const res = await axiosInstance.delete(`/agents/${agentObj.agentId}`);
      alert(res.data);
      fetchAgentData();
      console.log(res.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const [buyerArray, setBuyerArray] = useState([]);

  const fetchBuyerData = async () => {
    try {
      const res = await axiosInstance.get("/buyers");
      setBuyerArray(res.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBuyerData();
  }, []);

  const handleBuyerDelete = async (buyer: Buyer) => {
    try {
      const res = await axiosInstance.delete(`/buyers/${buyer.buyerId}`);
      alert(res.data);
      console.log(res.data);
      fetchBuyerData();
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const handleAddBuyer = () => {
    setIsUpdateClicked(false);
    setPerson("buyer");
    setShow(true);
  };

  const handleBuyerUpdate = (buyer: Buyer) => {
    setPersonObj(buyer);
    setIsUpdateClicked(true);
    setPerson("buyer");
    setUserId(buyer.buyerId);
    setShow(true);
  };

  const navigate = useNavigate();

  const handleViewProperty = (agent: Agent) => {
    const queryString = `?agentId=${agent.agentId}`;
    navigate(`/ViewProperties${queryString}`);
  };

  const handleViewSearches = (buyer: Buyer) => {
    const queryString = `?buyerId=${buyer.buyerId}`;
    navigate(`/ViewSearches${queryString}`);
  };

  return (
    <React.Fragment>
      <div className="d-flex flex-grow-1 pt-5 justify-content-center">
        <div className="container mt-5">
          <h1 className="mb-5 text-center title">Admin Dashboard</h1>
          <div className="mb-5">
            <h2>Agents Details</h2>
            <hr />
            <button
              className="btn btn-outline-primary"
              onClick={handleAddAgent}
            >
              Add New Agent
            </button>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Agent ID</th>
                  <th scope="col">Agent Name</th>
                  <th scope="col">Agent Email</th>
                  <th scope="col">Agent Password</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {agentArray.map((agent: Agent) => (
                  <tr key={agent.agentId}>
                    <td>{agent.agentId}</td>
                    <td>{agent.agentName}</td>
                    <td>{agent.agentEmail}</td>
                    <td>{agent.agentPassword}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleAgentDelete(agent)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleAgentUpdate(agent)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewProperty(agent)}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        View Properties
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-5">
            <h2>Buyer Details</h2>
            <hr />
            <button
              className="btn btn-outline-primary"
              onClick={handleAddBuyer}
            >
              Add New Buyer
            </button>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Buyer ID</th>
                  <th scope="col">Buyer Name</th>
                  <th scope="col">Buyer Email</th>
                  <th scope="col">Buyer Password</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {buyerArray.map((buyer: Buyer) => (
                  <tr key={buyer.buyerId}>
                    <td>{buyer.buyerId}</td>
                    <td>{buyer.buyerName}</td>
                    <td>{buyer.buyerEmail}</td>
                    <td>{buyer.buyerPassword}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleBuyerDelete(buyer)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleBuyerUpdate(buyer)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewSearches(buyer)}
                        className="btn btn-outline-secondary btn-sm"
                      >
                        View Searches
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UpdateModal
        show={show}
        onHide={handleClose}
        person={person}
        userId={userId}
        isUpdateBtnClicked={isUpdateClicked}
        personObj={personObj}
      />
    </React.Fragment>
  );
}

export default AdminDashboard;
