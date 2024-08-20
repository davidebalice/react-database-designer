import {
  faCirclePlus,
  faClose,
  faPenToSquare,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Modal = ({ show, handleClose, selectedTable }) => {
  const [tableData, setTableData] = useState(null);
  const [modTitle, setModTitle] = useState(false);
  const [modField, setModField] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getAuthToken = () => localStorage.getItem("authToken");
  const fieldTypes = [
    "int",
    "tinyint",
    "bigint",
    "float",
    "boolean",
    "double",
    "varchar",
    "text",
    "datetime",
    "date",
  ];

  useEffect(() => {
    if (show) {
      const fetchTableData = async () => {
        try {
          setLoading(true);
          const token = getAuthToken();
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}table/${selectedTable}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTableData(response.data.table);
          setLoading(false);
        } catch (error) {
          console.error("Error loading table:", error);
          setLoading(false);
        }
      };

      fetchTableData();
    }
  }, [show, selectedTable]);

  const handleInputChange = (e, fieldId) => {
    const { name, value } = e.target;
    if (fieldId) {
      setTableData((prevData) => ({
        ...prevData,
        fields: prevData.fields.map((field) =>
          field.id === fieldId ? { ...field, [name]: value } : field
        ),
      }));
    } else {
      setTableData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    console.log("Sending updated tableData:", tableData);
    setIsSaving(true);

    const sanitizedTableData = {
      ...tableData,
      fields: tableData.fields.map((field) => {
        if (typeof field.id === "string" && field.id.startsWith("temp-")) {
          const { id, ...rest } = field;
          return rest;
        }
        return field;
      }),
    };

    try {
      const token = getAuthToken();
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}edit/table/${tableData.id}`,
        sanitizedTableData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewField = () => {
    const newField = {
      id: `temp-${Date.now()}`,
      name: "Field name",
      field_type: "varchar",
    };

    setTableData((prevData) => ({
      ...prevData,
      fields: [...prevData.fields, newField],
    }));
  };

  const handleFieldChange = (e, fieldId) => {
    const { name, value } = e.target;
    setTableData((prevData) => ({
      ...prevData,
      fields: prevData.fields.map((field) =>
        field.id === fieldId ? { ...field, [name]: value } : field
      ),
    }));
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {modTitle ? (
            <div className="flex-row">
              <input
                type="text"
                name="name"
                value={tableData?.name || ""}
                onChange={handleInputChange}
                placeholder="Table name"
                className="modal-title-input"
              />
              <div onClick={() => setModTitle(!modTitle)}>
                <FontAwesomeIcon icon={faClose} className="modal-icon" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex-row">
                <span>{tableData?.name || ""}</span>
                <div onClick={() => setModTitle(!modTitle)}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="modal-icon"
                  />
                </div>
              </div>
            </>
          )}
          <div className="modal-button-container">
            <button onClick={handleNewField} className="modal-button">
              <FontAwesomeIcon icon={faCirclePlus} className="modal-icon" />
              New field
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="modal-button"
            >
              <FontAwesomeIcon icon={faSave} className="modal-icon" />
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button onClick={handleClose} className="modal-button">
              <FontAwesomeIcon icon={faClose} className="modal-icon" />
              Close
            </button>
          </div>
        </div>
        <div className="modal-body">
          {loading ? (
            <p>Loading...</p>
          ) : tableData ? (
            <div>
              <ul className="w-100">
                {tableData.fields.map((field) => (
                  <li key={field.id} className="field-row">
                    {modField === field.id ? (
                      <>
                        <div>key</div>
                        <div>
                          <input
                            type="text"
                            name="name"
                            value={field.name}
                            onChange={(e) => handleInputChange(e, field.id)}
                            placeholder="Field Name"
                          />
                        </div>
                        <div>
                          <select
                            name="field_type"
                            value={field.field_type}
                            onChange={(e) => handleFieldChange(e, field.id)}
                          >
                            {fieldTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div onClick={() => setModField("")}>
                          <FontAwesomeIcon
                            icon={faClose}
                            className="modal-icon2"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>key</div>
                        <div>{field.name}</div>
                        <div>{field.field_type}</div>

                        <div onClick={() => setModField(field.id)}>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="modal-icon2"
                          />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Fileds not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
