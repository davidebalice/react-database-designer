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


  console.log("links");
  console.log(links);

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
        const formattedTables = response.data.tables.map((table) => ({
          ...table,
          position: { x: table.x, y: table.y },
          fields: table.fields.map((field) => field.name),
        }));
        const formattedLinks = response.data.links.map((link) => ({
          ...link,
          sourcePosition: { x: link.sourcePositionX, y: link.sourcePositionY },
          targetPosition: { x: link.targetPositionX, y: link.targetPositionY },
        }));
        setTables(formattedTables);
        setLinks(formattedLinks);
      } catch (error) {
        console.error("Error loading tables:", error);
      }
    };

    fetchTables();
  }, [id]);

  const updateTables = async () => {
    console.log("tables");
    console.log("links prima format");

    
    console.log(links);

   

    try {
      const token = getAuthToken();
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "update-tables",
        { tables: tables, links: links, id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error updating tables:", error);
    }
  };

  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      name: `Table ${tables.length + 1}`,
      fields: ["id"],
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
        <div ref={containerRef}>
          <button onClick={() => addTable()}>Add Table</button>
          <button onClick={() => updateTables()}>Save</button>
          <Canvas
            tables={tables}
            moveTable={moveTable}
            addLink={addLink}
            links={links}
            setLinks={setLinks}
            containerRef={containerRef}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default Designer;
