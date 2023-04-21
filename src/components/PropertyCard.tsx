import React from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import "../styles/PropertyCard.scss";

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
  handleUpdate: () => void;
  handleDelete: () => void;
}

// interface propertyCardDataProps {
//   propertyCardProps: PropertyCardData;
// }

const PropertyCard = (props: PropertyCardData) => {
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
          <li className="d-flex justify-content-between control-btns-con">
            <button
              className="delete-btn flex-grow-1 text-center p-2"
              // style={{ backgroundColor: "#dc3545", color: "white" }}
              onClick={props.handleDelete}
            >
              <BsTrash />
            </button>
            <button
              className="update-btn flex-grow-1 text-center p-2"
              // style={{ backgroundColor: "#ffc107", color: "white" }}
              onClick={props.handleUpdate}
            >
              <BsPencil />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyCard;
