import React from "react";
import { useDrag } from "react-dnd";

const Field = ({ field, table }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: { field },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const style = {
    cursor: "move",
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? "1px solid red" : "none",
    padding: "4px 8px",
    margin: "4px 0",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
  };

  return (
    <div ref={drag} style={style} className="field" >
      <div id={`${table}-${field}`} style={{width:"10px"}}>pallino</div> {field}
    </div>
  );
};

export default Field;
