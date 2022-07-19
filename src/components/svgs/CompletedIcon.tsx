import React from "react";

const CompletedIcon: React.FC = () => {
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
        <rect x="5" y="5" width="21" height="21"></rect>{" "}
        <rect x="38" y="38" width="21" height="21"></rect>{" "}
        <rect x="5" y="38" width="21" height="21"></rect>{" "}
        <polyline points="38 15 46 23 61 5" stroke="#212121"></polyline>
      </g>
    </svg>
  );
};

export default CompletedIcon;
