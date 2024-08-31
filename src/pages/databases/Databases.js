import {
  faCirclePlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AiOutlineDatabase } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import { PiFileSqlDuotone } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination/Pagination";
import { Context } from "../../context/UserContext";
import MobileMessage from "../../components/mobileMessage";

const Databases = () => {
  const { userData, demoMode } = useContext(Context);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    let apiUrl = `${process.env.REACT_APP_API_BASE_URL}databases?page=${page}`;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.databases);
        setLoading(false);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token, page, reload]);

  const onDeleteDemo = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this Demo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (demoMode) {
          Swal.fire({
            title: "Demo mode",
            text: "Crud operations are not allowed",
            icon: "error",
            cancelButtonText: "Close",
          });
        } else {
          axios
            .post(
              `${process.env.REACT_APP_API_BASE_URL}database/delete/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            )
            .then((response) => {
              setReload((prevCount) => prevCount + 1);
            })
            .catch((error) => {
              console.error("Error:", error);

              Swal.fire("Error", error, "error");
            });
        }
      }
    });
  };

  return (
    <>
      <div className="page">
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="row">
              <MobileMessage/>
              <Link to={`/database/add`}>
                <div className="designerButton col-sm-4 col-md-4 col-lg-3">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="addButtonIcon"
                  />
                  <div className="card-body d-flex px-1">Add database</div>
                </div>
              </Link>
            </div>

            <div className="row">
              {data.map((data, i) => (
                <div className="col-12" key={`db${i}`}>
                  <div className="rowItem">
                    <div className="dbTextContainer">
                      <p className="rowDetailColumn">
                        <span className="rowDetailTitle">{data.name}</span>
                        <span className="rowDetailSubTitle">
                          {data.summary}
                        </span>
                      </p>
                    </div>

                    <div className="rowItemLinkContainer">
                      {data.backend && (
                        <a
                          href={data.backend}
                          target="_blank"
                          title="frontend link"
                          className="linkButtonLink"
                          rel="noreferrer"
                        >
                          <div className="linkButton linkButtonBackend">
                            <FaDatabase />
                            <span>Backend</span>
                          </div>
                        </a>
                      )}
                    </div>
                    <div className="rowItemButtonContainer">
                      <Link to={`/designer/${data.id}`}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">Designer</Tooltip>
                          }
                        >
                          <button className="btn btn-primary btn-sm rowItemButton">
                            <div className="text-black iconContainer">
                              <AiOutlineDatabase className="iconEdit" />
                            </div>
                            <p className="rowItemButtonTitle">Designer</p>
                          </button>
                        </OverlayTrigger>
                      </Link>

                      <Link to={`/sql/${data.id}`}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">Designer</Tooltip>
                          }
                        >
                          <button className="btn btn-primary btn-sm rowItemButton">
                            <div className="text-black iconContainer">
                              <PiFileSqlDuotone className="iconEdit" />
                            </div>
                            <p className="rowItemButtonTitle">Sql</p>
                          </button>
                        </OverlayTrigger>
                      </Link>

                      <Link to={`/database/edit/${data.id}`}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">Edit database</Tooltip>
                          }
                        >
                          <button className="btn btn-primary btn-sm rowItemButton">
                            <div className="text-black iconContainer">
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="rowItemIcon"
                              />
                            </div>
                            <p className="rowItemButtonTitle">Edit</p>
                          </button>
                        </OverlayTrigger>
                      </Link>

                      <Link
                        onClick={() => {
                          onDeleteDemo(data.id);
                        }}
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">
                              Delete database
                            </Tooltip>
                          }
                        >
                          <button className="btn btn-primary btn-sm rowItemButton bg-red">
                            <div className="text-black iconContainer">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="rowItemIcon"
                              />
                            </div>
                            <p className="rowItemButtonTitle">Delete</p>
                          </button>
                        </OverlayTrigger>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {data && data.length > 0 && (
        <Pagination
          pageName="databases"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default Databases;
