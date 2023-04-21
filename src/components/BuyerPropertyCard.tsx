import React from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import "../styles/BuyerPropertyCard.scss";

interface PropObj {
  propertyImgURL: string;
  propertyType: string;
  propertyDescription: string;
  propertyId: number;
  noOfBedRooms: number;
  noOfBathrooms: number;
  propertyLocation: string;
  propertyPrice: number;
  agent: {
    agentName: string;
    agentEmail: string;
  };
}

interface PropObjProps {
  propObj: PropObj;
}

const BuyerPropertyCard: React.FC<PropObjProps> = ({ propObj }) => {
  return (
    <div className="col">
      <div className="card h-100 overflow-hidden buyer-prop-card">
        <img
          src={propObj.propertyImgURL}
          className="card-img-top img-fluid"
          style={{ objectFit: "cover", height: "200px" }}
          alt="..."
        />
        <div className="card-body" style={{ color: "#000" }}>
          <h5 className="card-title">{propObj.propertyType}</h5>
          <p className="card-text">{propObj.propertyDescription}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Bedrooms: {propObj.noOfBedRooms}</li>
          <li className="list-group-item">
            Bathrooms: {propObj.noOfBathrooms}
          </li>
          <li className="list-group-item">
            Location: {propObj.propertyLocation}
          </li>
          <li className="list-group-item">Price: {propObj.propertyPrice}</li>
          <li className="list-group-item">
            Agent Name: {propObj.agent.agentName}
          </li>
          <li className="list-group-item">
            Agent Email: {propObj.agent.agentEmail}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BuyerPropertyCard;
