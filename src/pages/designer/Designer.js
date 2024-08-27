import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";
import Canvas from "./Canvas";
import Modal from "./Modal";

const Designer = () => {
  let { id } = useParams();
  if (!id) {
    id = 0;
  }
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [links, setLinks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(0);
  const [reload, setReload] = useState(0);
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(id);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + "databases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDatabases(response.data.databases);
        if (id === 0 && response.data.databases.length > 0) {
          console.log(response.data.databases[0].id);
          setSelectedDatabase(response.data.databases[0].id);
        }
      } catch (error) {
        console.error("Error loading databases:", error);
      }
    };

    fetchDatabases();
  }, []);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + "tables?database_id=" + selectedDatabase,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedTables = response.data.tables.map((table) => ({
          ...table,
          position: { x: table.x, y: table.y },
          fields: table.fields,
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
  }, [selectedDatabase, reload]);

  const updateTables = async () => {
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

  const handleCloseModal = () => {
    setShowModal(false);
    setReload((prevReload) => prevReload + 1);
  };

  const handleDatabaseChange = (e) => {
    const newDatabaseId = e.target.value;
    setSelectedDatabase(newDatabaseId);
    navigate(`/designer/${newDatabaseId}`);
  };

  return (
    <>
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        selectedTable={selectedTable}
      />
      <DndProvider backend={HTML5Backend}>
        <div className="page">
          <div ref={containerRef}>
            <button onClick={() => addTable()}>Add Table</button>
            <button onClick={() => updateTables()}>Save</button>
            <select value={selectedDatabase} onChange={handleDatabaseChange}>
              {databases.map((db) => (
                <option key={db.id} value={db.id}>
                  {db.name}
                </option>
              ))}
            </select>
            <Canvas
              tables={tables}
              moveTable={moveTable}
              addLink={addLink}
              links={links}
              setLinks={setLinks}
              containerRef={containerRef}
              setShowModal={setShowModal}
              setSelectedTable={setSelectedTable}
            />
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default Designer;
