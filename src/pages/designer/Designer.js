import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";
import "../../App.css";
import Canvas from "./Canvas";

const Designer = () => {
  const { id } = useParams();
  const containerRef = useRef(null);
  const [tables, setTables] = useState([]);
  const [links, setLinks] = useState([]);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + "tables?database_id=" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response.data");
        console.log(response.data.tables);
        const transformedTables = response.data.tables.map((table) => ({
          ...table,
          position: { x: table.x, y: table.y },
          fields: table.fields.map((field) => field.name),
        }));

        setTables(transformedTables);
      } catch (error) {
        console.error("Error loading tables:", error);
      }
    };

    fetchTables();
  }, [id]);

  const updateTables = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "update-tables",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        tables
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error updating tables:", error);
    }
  };
/*
  fetch("/api/update-tables", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tables),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
*/
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

  console.log(tables);
  console.log(tables);
  console.log(tables);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="page">
        <div ref={containerRef}>
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
