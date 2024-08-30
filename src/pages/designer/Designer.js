import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaSave } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";
import Canvas from "./Canvas";
import DeleteModal from "./DeleteModal";
import LinksModal from "./LinksModal";
import Modal from "./Modal";
import DemoModal from "./DemoModal";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
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
          process.env.REACT_APP_API_BASE_URL +
            "tables?database_id=" +
            selectedDatabase,
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
        { tables: tables, links: links, id: selectedDatabase },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setReload((prevReload) => prevReload + 1);
      if(response.data.status==="demo"){
        setShowDemoModal(true);
      }
      console.log("Response:", response);
    } catch (error) {
      console.error("Error updating tables:", error);
    }
  };

  const addTable = () => {
    const newTable = {
      id: 0,
      name: `Table ${tables.length + 1}`,
      fields: [
        {
          id: 0,
          name: "id",
          field_type: "int",
          index_field: 0,
          lenght: 11,
          default_value: "NULL",
          primary_field: 1,
          ai: 1,
          nullable: 0,
        },
      ],
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

  const handleDemoClose = () => {
    setShowDemoModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setReload((prevReload) => prevReload + 1);
  };

  const handleCloseLinksModal = () => {
    setShowLinksModal(false);
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
      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        selectedTable={selectedTable}
      />
      <LinksModal
        show={showLinksModal}
        handleClose={handleCloseLinksModal}
        selectedTable={selectedTable}
        links={links}
        setLinks={setLinks}
      />
      <DemoModal
        show={showDemoModal}
        handleDemoClose={handleDemoClose}
      />
      <DndProvider backend={HTML5Backend}>
        <div className="page">
          <div ref={containerRef}>
            <div className="buttonContainer">
              <button className="designerButton" onClick={() => addTable()}>
                <IoMdAddCircle />
                Add Table
              </button>
              <button className="designerButton" onClick={() => updateTables()}>
                <FaSave />
                Save
              </button>

              <div className="selectContainer">
                <span>Database</span>
                <select
                  value={selectedDatabase}
                  onChange={handleDatabaseChange}
                >
                  {databases.map((db) => (
                    <option key={db.id} value={db.id}>
                      {db.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Canvas
              tables={tables}
              moveTable={moveTable}
              addLink={addLink}
              links={links}
              setLinks={setLinks}
              containerRef={containerRef}
              setShowModal={setShowModal}
              setShowDeleteModal={setShowDeleteModal}
              setShowLinksModal={setShowLinksModal}
              setSelectedTable={setSelectedTable}
            />
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default Designer;
