import { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../../App.css";
import Canvas from "./Canvas";

const Designer = () => {
  const containerRef = useRef(null);
  const [tables, setTables] = useState([]);
  const [links, setLinks] = useState([]);

  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      name: `Table ${tables.length + 1}`,
      fields: ["field1", "field2", "field3"],
      position: { x: 100, y: 100 },
    };
    setTables([...tables, newTable]);
  };

  const moveTable = (id, newPosition) => {
    setTables((tables) =>
      tables.map((table) =>
        table.id === id ? { ...table, position: newPosition } : table
      )
    );
  };

  const addLink = (sourceTable, sourceField, targetTable, targetField) => {
    setLinks([
      ...links,
      { sourceTable, sourceField, targetTable, targetField },
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="page">
        <div  ref={containerRef}>
          <button onClick={addTable}>Add Table</button>
          <Canvas
            tables={tables}
            moveTable={moveTable}
            addLink={addLink}
            links={links}
            containerRef={containerRef}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Designer;
