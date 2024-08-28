import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LinksModal = ({ show, handleClose, selectedTable, links, setLinks }) => {
  const [tableData, setTableData] = useState(null);
  const [linkData, setLinkData] = useState(null);
  const [delLink, setDelLink] = useState("");
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

          const filteredLinks = links.filter(
            (link) =>
              link.sourceTable === response.data.table.name ||
              link.targetTable === response.data.table.name
          );

          setLinkData(filteredLinks);
        } catch (error) {
          console.error("Error loading table:", error);
          setLoading(false);
        }
      };

      fetchTableData();
    }
  }, [show, selectedTable, links]);

  const onDeleteLink = (linkId) => {
    setDelLink(linkId);
  };

  const prevDeleteLink = () => {
    setDelLink("");
  };

  const deleteLink = async (linkId) => {
    try {
      const token = getAuthToken();
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}link/delete/${linkId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedLinks = links.filter((link) => link.id !== linkId);
      setLinks(updatedLinks);
      setLinkData(updatedLinks);
      setDelLink("");

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
          ) : linkData && linkData.length > 0 ? (
            <>
              <div className="link-row field-header">
                <div>Source table</div>
                <div>Source field</div>
                <div>Target table</div>
                <div>Target field</div>
              </div>
              <div>
                <ul className="w-100">
                  {linkData &&
                    linkData.map((link) => (
                      <li key={link.id} className="link-row">
                        {delLink === link.id ? (
                          <>
                            <div>Confirm delete?</div>
                            <div
                              className="deleteButton"
                              onClick={() => deleteLink(link.id)}
                            >
                              ok
                            </div>
                            <div
                              className="deleteButton"
                              onClick={() => prevDeleteLink()}
                            >
                              no
                            </div>
                          </>
                        ) : (
                          <>
                            <div>{link.sourceTable}</div>
                            <div>{link.sourceField}</div>
                            <div>{link.targetTable}</div>
                            <div>{link.targetField}</div>
                            <div>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="modal-icon2 trash"
                                onClick={() => onDeleteLink(link.id)}
                              />
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          ) : (
            <p style={{ padding: "30px 0px" }}>Links not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinksModal;
