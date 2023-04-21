import React, { useEffect, useState } from "react";
import BuyerPropertyCard from "../components/BuyerPropertyCard";
import "../styles/BuyerDashboard.scss";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import SearchFilter from "../components/SearchFilter";
import { FiSearch } from "react-icons/fi";
import { Accordion } from "react-bootstrap";
import axiosInstance from "../config/axiosInstance";

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

type SearchProperty = {
  buyerId: number;
  propertyType: string | null;
  noOfBedRooms: number;
  noOfBathrooms: number;
  propertyLocation: string | null;
  priceRange: {
    startingPrice: number;
    endingPrice: number;
  };
};

function BuyerDashboard() {
  const [propObjArray, setPropObjArray] = useState([]);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const buyerId = searchParams.get("userId");

  const [buyerName, setBuyerName] = useState("");

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const res = await axiosInstance.get(`/buyers/${buyerId}`);
        setBuyerName(res.data.buyerName);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };
    fetchBuyerData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/properties");
        setPropObjArray(res.data);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  const { register, handleSubmit, watch } = useForm<SearchProperty>();

  const onSubmit = (data: SearchProperty) => {
    console.log(data);

    if (data.propertyType === "") data.propertyType = null;
    if (data.propertyLocation === "") data.propertyLocation = null;

    const fetchSearchResults = async () => {
      try {
        const res = await axiosInstance.post("/properties/searching", {
          buyerId: buyerId,
          propertyType: data.propertyType,
          noOfBedRooms: data.noOfBedRooms,
          noOfBathrooms: data.noOfBathrooms,
          propertyLocation: data.propertyLocation,
          priceRange: {
            startingPrice: data.priceRange.startingPrice,
            endingPrice: data.priceRange.endingPrice,
          },
        });
        setPropObjArray(res.data);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };
    fetchSearchResults();

    // const newPropObjArray = propObjArray.filter(
    //   (propObj: PropObj) => propObj.propertyType === data.searchProperty
    // );
    // setPropObjArray(newPropObjArray);
  };

  const [show, setShow] = useState(false);

  const handleHide = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <React.Fragment>
      <div className="d-flex flex-grow-1 pt-5 justify-content-center">
        <div className="container mt-5">
          <h1>Welcome, {buyerName}</h1>
          <h2 className="title2">
            Explore a wide variety of our luxurious properties...
          </h2>

          <Accordion className="mt-5 mb-5" style={{ maxWidth: "780px" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header
                style={{ whiteSpace: "pre-wrap", fontStyle: "italic" }}
              >
                <FiSearch /> Search Poperty Listings
              </Accordion.Header>
              <Accordion.Body>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex mb-1 mt-1 gap-1 flex-wrap"
                >
                  <input
                    type="text search-input"
                    className="form-control"
                    placeholder="Property type"
                    aria-label="First name"
                    {...register("propertyType")}
                  />
                  <input
                    type="text search-input"
                    className="form-control"
                    placeholder="No of bedrooms"
                    aria-label="First name"
                    {...register("noOfBedRooms", { valueAsNumber: true })}
                  />
                  <input
                    type="text search-input"
                    className="form-control"
                    placeholder="No of bathrooms"
                    aria-label="First name"
                    {...register("noOfBathrooms", { valueAsNumber: true })}
                  />
                  <input
                    type="text search-input"
                    className="form-control"
                    placeholder="Property Location"
                    aria-label="First name"
                    {...register("propertyLocation")}
                  />
                  <input
                    type="text search-input"
                    className="form-control"
                    placeholder="Starting Price"
                    aria-label="First name"
                    {...register("priceRange.startingPrice", {
                      valueAsNumber: true,
                    })}
                  />
                  <input
                    type="text search-input"
                    className="form-control"
                    placeholder="Ending Price"
                    aria-label="First name"
                    {...register("priceRange.endingPrice", {
                      valueAsNumber: true,
                    })}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm">
                    Search
                  </button>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {propObjArray.map((propObj: PropObj) => (
              <BuyerPropertyCard key={propObj.propertyId} propObj={propObj} />
            ))}
          </div>
        </div>
      </div>
      <SearchFilter onHide={handleHide} show={show} />
    </React.Fragment>
  );
}

export default BuyerDashboard;
