import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ViewSearches.scss";
import axiosInstance from "../config/axiosInstance";
import PaginationTable from "../components/PaginationTable";

function ViewSearches() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const buyerId = searchParams.get("buyerId");

  const [buyerName, setBuyerName] = useState("");

  const [searchDataArray, setSearchDataArray] = useState([]);

  const fetchBuyerName = async () => {
    try {
      const res = await axiosInstance.get(`/buyers/${buyerId}`);
      setBuyerName(res.data.buyerName);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBuyerName();
    const fetchSearchData = async () => {
      try {
        const res = await axiosInstance.get(`/savedSearches/buyer/${buyerId}`);
        setSearchDataArray(res.data);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    };
    fetchSearchData();
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const itemsToShow = searchDataArray.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="d-flex flex-grow-1 pt-5 justify-content-center">
      <div className="container mt-5">
        <h1 className="mb-5">Search Data of, {buyerName}</h1>
        <PaginationTable
          onPageChange={handlePageChange}
          currentPage={currentPage}
          itemsPerPage={10}
          totalItems={searchDataArray.length}
          itemsToShow={itemsToShow}
        />
      </div>
    </div>
  );
}

export default ViewSearches;
