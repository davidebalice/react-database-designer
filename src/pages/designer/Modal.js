import axios from "axios";
import React, { useEffect, useState } from "react";

const Modal = ({ show, handleClose, selectedTable }) => {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getAuthToken = () => localStorage.getItem("authToken");

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

  const handleSaveChanges = async () => {
    console.log("Sending updated tableData:", tableData);
    setIsSaving(true);
    try {
      const token = getAuthToken();
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}edit/table/${tableData.id}`,
        tableData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Changes saved successfully!");
      handleClose();
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <input
            type="text"
            name="name"
            value={tableData?.name || ""}
            onChange={handleInputChange}
            placeholder="Table Name"
          />
          <button onClick={handleClose} className="close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {loading ? (
            <p>Loading...</p>
          ) : tableData ? (
            <div>
              <ul className="field-row">
                {tableData.fields.map((field) => (
                  <li key={field.id}>
                    <input
                      type="text"
                      name="name"
                      value={field.name}
                      onChange={(e) => handleInputChange(e, field.id)}
                      placeholder="Field Name"
                    />
                    <input
                      type="text"
                      name="field_type"
                      value={field.field_type}
                      onChange={(e) => handleInputChange(e, field.id)}
                      placeholder="Field Type"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
