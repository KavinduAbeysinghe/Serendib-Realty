import React from "react";

interface PropertyCardData {
  propertyCardProps: {
    propertyId: number;
    propertyType: string;
    noOfBedRooms: number;
    noOfBathrooms: number;
    propertyLocation: string;
    propertyPrice: number;
    propertyDescription: string;
    propertyImgURL: string;
  };
}

function AgentPropCard(props: PropertyCardData) {
  return (
    <div className="col">
      <div className="card h-100 overflow-hidden">
        <img
          src={props.propertyCardProps.propertyImgURL}
          className="card-img-top img-fluid"
          style={{ objectFit: "cover", height: "200px" }}
          alt="..."
        />
        <div className="card-body" style={{ color: "#000" }}>
          <h5 className="card-title">{props.propertyCardProps.propertyType}</h5>
          <p className="card-text">
            {props.propertyCardProps.propertyDescription}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Property ID: {props.propertyCardProps.propertyId}
          </li>
          <li className="list-group-item">
            Bedrooms: {props.propertyCardProps.noOfBedRooms}
          </li>
          <li className="list-group-item">
            Bathrooms: {props.propertyCardProps.noOfBathrooms}
          </li>
          <li className="list-group-item">
            Location: {props.propertyCardProps.propertyLocation}
          </li>
          <li className="list-group-item">
            Price: {props.propertyCardProps.propertyPrice}
          </li>
          <li className="d-flex justify-content-between control-btns-con"></li>
        </ul>
      </div>
    </div>
  );
}

export default AgentPropCard;
