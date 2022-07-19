import React from "react";

const TodoIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <g
        strokeWidth="1"
        fill="none"
        stroke="#212121"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line
          x1="0.5"
          y1="2.5"
          x2="2.5"
          y2="2.5"
          data-cap="butt"
          stroke="#212121"
        ></line>{" "}
        <line
          x1="0.5"
          y1="6.5"
          x2="2.5"
          y2="6.5"
          data-cap="butt"
          stroke="#212121"
        ></line>{" "}
        <line
          x1="0.5"
          y1="10.5"
          x2="2.5"
          y2="10.5"
          data-cap="butt"
          stroke="#212121"
        ></line>{" "}
        <line
          x1="0.5"
          y1="14.5"
          x2="2.5"
          y2="14.5"
          data-cap="butt"
          stroke="#212121"
        ></line>{" "}
        <line x1="5.5" y1="2.5" x2="15.5" y2="2.5" data-cap="butt"></line>{" "}
        <line x1="5.5" y1="6.5" x2="11.5" y2="6.5" data-cap="butt"></line>{" "}
        <line x1="5.5" y1="10.5" x2="15.5" y2="10.5" data-cap="butt"></line>{" "}
        <line x1="5.5" y1="14.5" x2="10.5" y2="14.5" data-cap="butt"></line>
      </g>
    </svg>
  );
};

export default TodoIcon;
