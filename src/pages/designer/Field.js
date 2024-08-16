import React from "react";
import { useDrag, useDrop } from "react-dnd";

const Field = ({ field, table }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: { field },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) => {
      console.log(`Dropped ${item.field} on ${field}`);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const style = {
    cursor: "move",
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? "1px solid red" : "none",
    padding: "4px 8px",
    margin: "4px 0",
    backgroundColor: isOver ? "#d1e7dd" : "#f0f0f0",
    borderRadius: "4px",
  };

  return (
    <div ref={(node) => drag(drop(node))} style={style} className="field">
      <div id={`${table}-${field}`} className="fieldDot">palla</div>
      <span>{field}</span>
    </div>
  );
};

export default Field;
