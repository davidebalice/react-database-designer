import React,{useEffect,useState} from "react";

const Line = ({ start, end, color = "black", strokeWidth = 2,containerRef }) => {
    const [offsets, setOffsets] = useState({ top: 0, left: 0 });
 // const marginTop = 100;
 // const marginLeft = 250;


  useEffect(() => {
    const calculateOffsets = () => {
      const container = containerRef.current;

      if (container) {
        const containerRect = container.getBoundingClientRect();

        const offsetTop = containerRect.top;
        const offsetLeft = containerRect.left;

        setOffsets({ x: offsetTop, y: offsetLeft });
      }
    };

    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);

    return () => window.removeEventListener('resize', calculateOffsets);
  }, []);

  const controlX = (start.x - offsets.x + end.x - offsets.x) / 2 - 100;
  const controlY = (start.y - offsets.y + end.y - offsets.y) / 2;
  const dotRadius = 4;

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
      <path
        d={`M ${start.x - offsets.x} ${
          start.y - offsets.y
        } Q ${controlX} ${controlY} ${end.x - offsets.x} ${end.y - offsets.y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        style={{
          pointerEvents: "none",
        }}
      />
      <circle
        cx={start.x-offsets.x}
        cy={start.y-offsets.y}
        r={dotRadius}
        fill={color}
        stroke="none"
      />

      <circle cx={end.x-offsets.x} cy={end.y-offsets.y} r={dotRadius} fill={color} stroke="none" />
    </svg>
  );
};

export default Line;
