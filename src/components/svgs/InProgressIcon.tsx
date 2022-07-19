import React from "react";

const InProgressIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
    >
      <g
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
        fill="none"
        stroke="#212121"
        strokeMiterlimit="10"
      >
        <circle cx="32" cy="8" r="6"></circle>{" "}
        <circle cx="48.971" cy="15.029" r="5.4" stroke="#212121"></circle>{" "}
        <circle cx="56" cy="32" r="4.8"></circle>{" "}
        <circle cx="48.971" cy="48.971" r="4.2" stroke="#212121"></circle>{" "}
        <circle cx="32" cy="56" r="3.6"></circle>{" "}
        <circle cx="15.029" cy="48.971" r="3" stroke="#212121"></circle>{" "}
        <circle cx="8" cy="32" r="2.4"></circle>{" "}
        <circle cx="15.029" cy="15.029" r="1.8" stroke="#212121"></circle>
      </g>
    </svg>
  );
};

export default InProgressIcon;
