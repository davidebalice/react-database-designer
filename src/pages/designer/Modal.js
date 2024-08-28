import {
  faCirclePlus,
  faClose,
  faPenToSquare,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaKey } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";

const Modal = ({ show, handleClose, selectedTable }) => {
  const [tableData, setTableData] = useState(null);
  const [modTitle, setModTitle] = useState(false);
  const [modField, setModField] = useState("");
  const [delField, setDelField] = useState("");
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

  const handleCheckboxChange = (e, fieldId) => {
    const { name, checked } = e.target;

    setTableData((prevData) => ({
      ...prevData,
      fields: prevData.fields.map((field) =>
        field.id === fieldId ? { ...field, [name]: checked ? 1 : 0 } : field
      ),
    }));
  };

  const onDeleteField = (fieldId) => {
    setDelField(fieldId);
  };

  const prevDeleteField = () => {
    setDelField("");
  };

  const deleteField = async (fieldId) => {
    try {
      const token = getAuthToken();
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}field/delete/${fieldId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTableData((prevData) => ({
        ...prevData,
        fields: prevData.fields.filter((field) => field.id !== fieldId),
      }));
      setDelField("");

    } catch (error) {
      console.error("Error deleting field:", error);
    }
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
            <>
              <div className="field-row field-header">
                <div>pk</div>
                <div></div>
                <div>name</div>
                <div>type</div>
                <div>lenght</div>
                <div>default</div>
                <div>pk</div>
                <div>ai</div>
                <div>null</div>
                <div>index</div>
                <div></div>
              </div>

              <div>
                <ul className="w-100">
                  {tableData.fields.map((field) => (
                    <li key={field.id} className="field-row">
                      {modField === field.id ? (
                        <>
                          <div></div>
                          <div></div>
                          <div>
                            <input
                              type="text"
                              name="name"
                              value={field.name}
                              onChange={(e) => handleInputChange(e, field.id)}
                              placeholder="Field Name"
                              className="inputField"
                            />
                          </div>
                          <div>
                            <select
                              name="field_type"
                              value={field.field_type}
                              onChange={(e) => handleFieldChange(e, field.id)}
                              className="inputField"
                            >
                              {fieldTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <input
                              type="text"
                              name="lenght"
                              value={field.lenght}
                              onChange={(e) => handleInputChange(e, field.id)}
                              placeholder="Lenght"
                              className="inputField"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              name="default_value"
                              value={field.default_value}
                              onChange={(e) => handleInputChange(e, field.id)}
                              placeholder="Default value"
                              className="inputField"
                            />
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="primary_field"
                              checked={field.primary_field === 1}
                              className="checkboxField"
                              onChange={(e) =>
                                handleCheckboxChange(e, field.id)
                              }
                            />
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="ai"
                              checked={field.ai === 1}
                              className="checkboxField"
                              onChange={(e) =>
                                handleCheckboxChange(e, field.id)
                              }
                            />
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="nullable"
                              checked={field.nullable === 1}
                              className="checkboxField"
                              onChange={(e) =>
                                handleCheckboxChange(e, field.id)
                              }
                            />
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="index_field"
                              checked={field.index_field === 1}
                              className="checkboxField"
                              onChange={(e) =>
                                handleCheckboxChange(e, field.id)
                              }
                            />
                          </div>
                          <div onClick={() => setModField("")}>
                            <FontAwesomeIcon
                              icon={faClose}
                              className="modal-icon2 mt-1"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          {delField === field.id ? (
                            <>
                              <div></div>
                              <div></div>
                              <div>Confirm delete?</div>
                              <div
                                className="deleteButton"
                                onClick={() => deleteField(field.id)}
                              >
                                ok
                              </div>
                              <div
                                className="deleteButton"
                                onClick={() => prevDeleteField()}
                              >
                                no
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="fieldIcon">
                                {field.primary_field === 1 ? (
                                  <FaKey
                                    style={{
                                      color: "#c2b812",
                                      fontSize: "18px",
                                    }}
                                  />
                                ) : field.index_field === 1 ? (
                                  <FaKey
                                    style={{ color: "#999", fontSize: "18px" }}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="fieldIcon">
                                {field.field_type === "varchar" ||
                                field.field_type === "text" ? (
                                  <PiTextTBold style={{ fontSize: "22px" }} />
                                ) : field.field_type === "date" ||
                                  field.field_type === "datetime" ? (
                                  <MdDateRange />
                                ) : (
                                  <GoNumber style={{ fontSize: "22px" }} />
                                )}
                              </div>
                              <div>{field.name}</div>
                              <div>{field.field_type}</div>
                              <div>{field.lenght}</div>
                              <div>{field.default_value}</div>
                              <div>
                                {field.primary_field === 1 && (
                                  <IoMdCheckmarkCircleOutline />
                                )}
                              </div>
                              <div>
                                {field.ai === 1 && (
                                  <IoMdCheckmarkCircleOutline />
                                )}
                              </div>
                              <div>
                                {field.nullable === 1 && (
                                  <IoMdCheckmarkCircleOutline />
                                )}
                              </div>
                              <div>
                                {field.index_field === 1 && (
                                  <IoMdCheckmarkCircleOutline />
                                )}
                              </div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faPenToSquare}
                                  className="modal-icon2"
                                  onClick={() => setModField(field.id)}
                                />
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="modal-icon2 trash"
                                  onClick={() => onDeleteField(field.id)}
                                />
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p>Fields not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
