import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DeleteModal = ({ show, handleClose, selectedTable }) => {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const deleteTable = async () => {
    try {
      const token = getAuthToken();
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}table/delete/${tableData.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-row">
            <span>{tableData?.name || ""}</span>
          </div>

          <div className="modal-button-container">
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
              <div className="modal-confirm">
                Confirm deletation of table <b>{tableData.name}</b>, fields and
                links?
                <br />
                <div className="modal-confirm-buttons">
                  {" "}
                  <div onClick={() => deleteTable()} className="modal-confirm-button">yes</div>
                  <div onClick={handleClose} className="modal-confirm-button">no</div>
                </div>
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

export default DeleteModal;
