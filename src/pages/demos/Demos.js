import {
  faCirclePlus,
  faImage,
  faNoteSticky,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaDatabase, FaDesktop, FaGithub } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import angular from "../../assets/img/angular.png";
import javascript from "../../assets/img/javascript.png";
import laravel from "../../assets/img/laravel.png";
import node from "../../assets/img/node.png";
import nophoto from "../../assets/img/nophoto.jpg";
import php from "../../assets/img/php.png";
import react from "../../assets/img/react.png";
import spring from "../../assets/img/spring.png";
import typescript from "../../assets/img/typescript.png";
import Breadcrumb from "../../components/breadcrumb";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination/Pagination";
import { Context } from "../../context/UserContext";

const Demos = () => {
  const { userData, demoMode } = useContext(Context);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const tecnology = searchParams.get("tecnology");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    let apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/demos?page=${page}`;

    if (tecnology) {
      apiUrl += `&tecnology=${tecnology}`;
    }

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setData(response.data.demos);
        setLoading(false);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error during api call:", error);
      });
  }, [token, page, reload, tecnology]);

  const tecnologyFunc = (str) => {
    return str.split(",").map((tech) => tech.trim());
  };

  const getTechnologyIcon = (tech) => {
    switch (tech) {
      case "React":
        return react;
      case "React native":
        return react;
      case "Angular":
        return angular;
      case "Spring":
        return spring;
      case "Node":
        return node;
      case "Laravel":
        return laravel;
      case "Php":
        return php;
      case "Javascript":
        return javascript;
      case "Typescript":
        return typescript;

      default:
        return null;
    }
  };

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
              `${process.env.REACT_APP_API_BASE_URL}/api/demo/delete/${id}`,
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

  const title = "Demos";

  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  return (
    <>
      <div className="page">
        <Breadcrumb title={title} brad={brad} />

        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="row">
              <Link to={`/add/demo/`}>
                <div className="addButton col-sm-4 col-md-4 col-lg-3">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="addButtonIcon"
                  />
                  <div className="card-body d-flex px-1">Add demo</div>
                </div>
              </Link>
            </div>

            <div className="row">
              {data.map((data, i) => (
                <div
                  className="col-sm-4 col-md-4 col-lg-4 col-xl-3 "
                  key={`demo${i}`}
                >
                  <div className="demoCard">
                    <div>
                      {data.imageCover ? (
                        <div
                          className="demoCardCover"
                          style={{
                            backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL}/api/demo/cover/${data.imageCover})`,
                          }}
                        >
                          <div className="tecnologyContainer">
                            {data.tecnology &&
                              tecnologyFunc(data.tecnology).map(
                                (tech, index) => (
                                  <div key={index} className="tecnologyIcon">
                                    <img
                                      className="tecnologyImg"
                                      src={getTechnologyIcon(tech)}
                                      alt={tech}
                                    />
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="demoCardCover"
                          style={{
                            backgroundImage: `url(${nophoto})`,
                          }}
                        ></div>
                      )}

                      <div className="demoTextContainer">
                        <p className="demoDetailColumn">
                          <span className="demoDetailTitle">{data.title}</span>
                          <span className="demoDetailSubTitle">
                            {data.subtitle}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="demoCardLinkContainer">
                      {data.frontend && (
                        <a
                          href={data.frontend}
                          target="_blank"
                          title="frontend link"
                          rel="noreferrer"
                          className="linkButtonLink"
                        >
                          <div className="linkButton linkButtonFrontend">
                            <FaDesktop />
                            <span>Frontend</span>
                          </div>
                        </a>
                      )}

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

                      {data.github && (
                        <a
                          href={data.github}
                          target="_blank"
                          title="frontend link"
                          rel="noreferrer"
                          className="linkButtonLink"
                        >
                          <div className="linkButton linkButtonGithub">
                            <FaGithub />
                            <span>Github</span>
                          </div>
                        </a>
                      )}
                    </div>
                    <div className="demoCardButtonContainer">
                      <Link to={`/cover/demo/${data._id}`}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">Photo Cover</Tooltip>
                          }
                        >
                          <button className="btn btn-primary btn-sm demoCardButton">
                            <div className="text-black iconContainer">
                              <FontAwesomeIcon
                                icon={faNoteSticky}
                                className="demoCardIcon"
                              />
                            </div>
                            <p className="demoCardButtonTitle">Cover</p>
                          </button>
                        </OverlayTrigger>
                      </Link>

                      <Link to={`/edit/demo/${data._id}`}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">Edit demo</Tooltip>
                          }
                        >
                          <button className="btn btn-primary btn-sm demoCardButton">
                            <div className="text-black iconContainer">
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="demoCardIcon"
                              />
                            </div>
                            <p className="demoCardButtonTitle">Edit</p>
                          </button>
                        </OverlayTrigger>
                      </Link>

                      <Link to={`/demo/gallery/${data._id}`}>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip className="tooltip">Tasks</Tooltip>}
                        >
                          <button className="btn btn-primary btn-sm demoCardButton">
                            <div className="text-black iconContainer">
                              <FontAwesomeIcon
                                icon={faImage}
                                className="demoCardIcon"
                              />
                            </div>
                            <p className="demoCardButtonTitle">Gallery</p>
                          </button>
                        </OverlayTrigger>
                      </Link>

                      <Link
                        onClick={() => {
                          onDeleteDemo(data._id);
                        }}
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip className="tooltip">Delete demo</Tooltip>
                          }
                        >
                          <button className="btn btn-primary btn-sm demoCardButton bg-red">
                            <div className="text-black iconContainer">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="demoCardIcon"
                              />
                            </div>
                            <p className="demoCardButtonTitle">Delete</p>
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
          pageName="demos"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default Demos;
