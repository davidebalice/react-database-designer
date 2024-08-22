import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaKey } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";

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
      <div id={`${table}-${field.name}`} className="fieldIcon">
      {field.primary_field === 1 ? <FaKey style={{ color: "#c2b812",fontSize:"18px" }} /> : field.index_field === 1 ? (<FaKey style={{ color: "#999",fontSize:"18px" }} />) : ('')}
      </div>
      <div className="fieldIcon">
        {field.field_type === "varchar" || field.field_type === "text" ? (
          <PiTextTBold style={{ fontSize: "22px" }} />
        ) : field.field_type === "date" || field.field_type === "datetime" ? (
          <MdDateRange />
        ) : (
          <GoNumber style={{ fontSize: "22px" }} />
        )}
      </div>
      <span>{field.name}</span>
    </div>
  );
};

export default Field;
