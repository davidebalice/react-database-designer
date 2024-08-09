import React from "react";

const Line = ({ start, end, color = "black", strokeWidth = 2 }) => {
  const length = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

  console.log("Line Start:", start);
  console.log("Line End:", end);

  const marginTop=100;
  const marginLeft=230;

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 100,
      }}
      className="line-svg"
    >
      <line
        x1={start.x-marginLeft}
        y1={start.y-marginTop}
        x2={end.x-marginLeft}
        y2={end.y-marginTop}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{
          pointerEvents: "none",
        }}
      />
    </svg>
  );
};

export default Line;
