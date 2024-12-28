import React from "react";
import * as StyleX from "@stylexjs/stylex";
import Left from "../../../public/assets/arrowLeft.svg";
import Right from "../../../public/assets/arrowRight.svg";
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div {...StyleX.props(x.paginationContainer)}>
      <span style={{ textTransform: "capitalize", fontWeight: 600 }}>
        Items per page:
      </span>
      <select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        style={{
          width: "70px",
          height: 40,
          border: "1px solid #05031a",
          borderRadius: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 16,
          fontWeight: "600",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {[2, 5, 10, 20, 50, 100].map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
      <span>
        {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} –{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </span>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        {...StyleX.props(x.btn)}
      >
        <Image src={Left} alt="" />
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        {...StyleX.props(x.btn)}
      >
        <Image src={Right} alt="" />
      </button>
    </div>
  );
};

const x = StyleX.create({
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    padding: "10px 40px",
    width: "100%",
  },
  btn: {
    padding: "5px",
    border: "none",
    borderRadius: 100,
    background: "#05031a",
    color: "#fff",
    outline: "none",
    cursor: "pointer",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Pagination;
