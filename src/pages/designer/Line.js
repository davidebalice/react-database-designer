import React, { useEffect, useState } from "react";

const Line = ({
  start,
  end,
  color = "black",
  strokeWidth = 2,
  containerRef,
}) => {
  const [offsets, setOffsets] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const calculateOffsets = () => {
      const container = containerRef.current;

      if (container) {
        const containerRect = container.getBoundingClientRect();

        const offsetTop = containerRect.top;
        const offsetLeft = containerRect.left;

        setOffsets({ x: offsetLeft, y: offsetTop });
      }
    };

    calculateOffsets();
    window.addEventListener("resize", calculateOffsets);

    return () => window.removeEventListener("resize", calculateOffsets);
  }, [containerRef]);

  const startX = start.x - offsets.x;
  const startY = start.y - offsets.y - 16;
  const endX = end.x - offsets.x;
  const endY = end.y - offsets.y - 16;

  // Assicurati che il punto medio sia sempre a sinistra del punto di partenza
  const midX = Math.min(startX - 50, endX); 
  const midY = startY + (endY - startY) / 2;

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
      {startX && startY && (
        <>
          <path
            d={`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              pointerEvents: "none",
            }}
          />
          <circle cx={startX} cy={startY} r={4} fill={color} stroke="none" />
          <circle cx={endX} cy={endY} r={4} fill={color} stroke="none" />
        </>
      )}
    </svg>
  );
};

export default Line;
