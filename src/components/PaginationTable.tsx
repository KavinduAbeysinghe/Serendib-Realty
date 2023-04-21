import React from "react";

interface PaginationTableProps {
  itemsToShow: never[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
}

interface SearchData {
  searchId: number;
  buyerId: number;
  searchLocation: string;
  searchPriceRange: string;
  searchNumBedrooms: number;
  searchNumBathrooms: number;
  searchPropType: string;
  timestamp: string;
}

function PaginationTable(props: PaginationTableProps) {
  const handleNull = (data: any): string => {
    return data == null ? "table-active" : "";
  };

  const handlePreviousPage = (): void => {
    props.onPageChange(props.currentPage - 1);
  };

  const handleNextPage = (): void => {
    props.onPageChange(props.currentPage + 1);
  };

  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Search ID</th>
            <th scope="col">Search Location</th>
            <th scope="col">Search Price Range</th>
            <th scope="col">Search No of Bedrooms</th>
            <th scope="col">Search No of Bathrooms</th>
            <th scope="col">Search Property Type</th>
            <th scope="col">Search Time</th>
          </tr>
        </thead>
        <tbody>
          {props.itemsToShow.map((searchData: SearchData) => (
            <tr key={searchData.searchId}>
              <td>{searchData.searchId}</td>
              <td className={handleNull(searchData.searchLocation)}>
                {searchData.searchLocation}
              </td>
              <td className={handleNull(searchData.searchPriceRange)}>
                {searchData.searchPriceRange}
              </td>
              <td className={handleNull(searchData.searchNumBedrooms)}>
                {searchData.searchNumBedrooms}
              </td>
              <td className={handleNull(searchData.searchNumBathrooms)}>
                {searchData.searchNumBathrooms}
              </td>
              <td className={handleNull(searchData.searchPropType)}>
                {searchData.searchPropType}
              </td>
              <td>{searchData.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className={
                props.currentPage === 1 ? "page-link disabled" : "page-link"
              }
              href="#"
              onClick={handlePreviousPage}
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a
              className={
                props.currentPage === totalPages
                  ? "page-link disabled"
                  : "page-link"
              }
              href="#"
              onClick={handleNextPage}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default PaginationTable;
