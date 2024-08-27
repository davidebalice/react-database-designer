import { faBars, faTableList, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "boxicons";
import React, { useContext, useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FiDatabase } from "react-icons/fi";
import { GiMove } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { TbFileTypeSql } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/img/logoWhite.png";
import logo2 from "../assets/img/logoWhite2.png";
import { Context } from "../context/UserContext";
import "./layout.css";

export default function Layouts() {
  const { userData } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [render, setRender] = useState(true);
  const [headerToggle, setHeaderToggle] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [headerNavManu, setheaderNavManu] = useState(true);
  const mainBody = document.getElementById("mainBody");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/forgot-password" ||
      pathname === "/register"
    ) {
      setSidebar(false);
      mainBody.classList.remove("mainBody");
    } else {
      setSidebar(true);
    }
  }, [pathname]);

  useEffect(() => {
    setHeaderToggle(false);
    setheaderNavManu(true);
  }, []);

  const headerTogglehandle = () => {
    localStorage.setItem("defaultOpenSidebar", "close");
  };

  const showMobileMenu = () => {
    let navbar = document.getElementsByClassName("l-navbar")[0];
    if (navbar) {
      navbar.style.cssText = "display: block !important;";
    }
  };

  const closeMobileMenu = () => {
    let navbar = document.getElementsByClassName("l-navbar")[0];
    if (navbar) {
      navbar.style.cssText = "display: none !important;";
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 1068) {
      if (headerToggle) {
        mainBody.classList.add("mainBody");
      } else {
        mainBody.classList.remove("mainBody");
      }
    } else {
      localStorage.setItem("defaultOpenSidebar", "close");
      setHeaderToggle(false);
      setheaderNavManu(false);
    }

    if (document.getElementById("header") !== null) {
      headerToggle &&
        document.getElementById("header").classList.add("mainBody");
      headerToggle !== true &&
        document.getElementById("header").classList.remove("mainBody");
    }
  }, [mainBody.classList, headerToggle]);

  const updateActive = () => {
    setRender(!render);
  };
  const logoutHandle = () => {
    Swal.fire({
      icon: "warning",
      title: "Logout?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("logout Success", "", "success");
        localStorage.removeItem("authToken");
        navigate("/login");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      {sidebar !== false && (
        <>
          <header className="header mb-4 dropdown" id="header">
            <div onClick={showMobileMenu} className="mobileButton">
              <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
            </div>

            <div className="headerMenu">
              <Link
                onClick={updateActive}
                to="/"
                key="dashboard"
                className={`nav_link ${pathname === "/" && "active"}`}
              >
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Dashboard</span>
              </Link>

              <Link
                to="/databases"
                key="databases"
                onClick={updateActive}
                className={`nav_link ${pathname === "/databases" && "active"}`}
              >
                <FiDatabase style={{ fontSize: "20px" }} />
                <span className="nav_name">Databases</span>
              </Link>

              <Link
                to="/designer"
                key="designer"
                onClick={updateActive}
                className={`nav_link ${pathname === "/designer" && "active"}`}
              >
                <GiMove style={{ fontSize: "22px" }} />
                <span className="nav_name">Designer</span>
              </Link>

              <Link
                to="/sql"
                key="sql"
                onClick={updateActive}
                className={`nav_link ${pathname === "/sql" && "active"}`}
              >
                <TbFileTypeSql style={{ fontSize: "22px" }} />
                <span className="nav_name">Sql</span>
              </Link>

              <Link
                to="/info"
                key="info"
                onClick={updateActive}
                className={`nav_link ${pathname === "/info" && "active"}`}
              >
                <FaInfoCircle style={{ fontSize: "20px" }} />
                <span className="nav_name">Info</span>
              </Link>

              <Link
                onClick={logoutHandle}
                key="logout"
                to="#"
                className={`nav_link `}
              >
                <MdLogout style={{ fontSize: "22px" }} />
                <span className="nav_name">Logout</span>
              </Link>
            </div>
            <div
              className="d-flex align-items-center dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <span className="header_img">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/api/user/img/${
                    userData && userData.photo
                  }`}
                  className="userImg"
                  alt=""
                />{" "}
              </span>{" "}
              <span className="ms-1">
                {userData && (
                  <>
                    {userData.surname} {userData.name}
                  </>
                )}
              </span>{" "}
            </div>

            <ul
              className="dropdown-menu dropdown-menu-end"
              style={{ width: "auto", padding: "0, 2rem" }}
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>

              <li className="dropdown-item" onClick={logoutHandle}>
                Log Out
              </li>
            </ul>
          </header>

          <div className="manubar">
            <div
              className={`l-navbar ${headerToggle ? "show" : ""}`}
              id="nav-bar"
            >
              <nav className="nav">
                <div>
                  <div className="sidebarHeaderContainer">
                    <a
                      href="#"
                      alt="db logo"
                      className="sidebarHeader"
                      style={{
                        justifyContent: headerToggle ? "center" : "left",
                        width: headerToggle ? "100%" : "50px",
                      }}
                    >
                      <img
                        src={headerToggle ? logo : logo2}
                        className={
                          headerToggle ? "logoSidebar" : "logoSidebarClosed"
                        }
                        alt="db logo"
                      />
                    </a>

                    <p onClick={closeMobileMenu} className="mobileButton">
                      {" "}
                      <FontAwesomeIcon icon={faX} style={{ color: "white" }} />
                    </p>
                  </div>

                  <div className="nav_list">
                    <Link
                      onClick={updateActive}
                      to="/"
                      key="dashboard"
                      className={`nav_link ${pathname === "/" && "active"}`}
                    >
                      <i className="bx bx-grid-alt nav_icon"></i>
                      <span className="nav_name">Dashboard</span>
                    </Link>

                    <Link
                      to="/databases"
                      key="databases"
                      onClick={updateActive}
                      className={`nav_link ${
                        pathname === "/databases" && "active"
                      }`}
                    >
                      <FiDatabase style={{ fontSize: "20px" }} />
                    </Link>

                    <Link
                      to="/designer"
                      key="designer"
                      onClick={updateActive}
                      className={`nav_link ${
                        pathname === "/designer" && "active"
                      }`}
                    >
                      <GiMove style={{ fontSize: "22px" }} />
                    </Link>

                    <Link
                      to="/sql"
                      key="sql"
                      onClick={updateActive}
                      className={`nav_link ${pathname === "/sql" && "active"}`}
                    >
                      <TbFileTypeSql style={{ fontSize: "22px" }} />
                    </Link>

                    <Link
                      to="/info"
                      key="info"
                      onClick={updateActive}
                      className={`nav_link ${pathname === "/info" && "active"}`}
                    >
                      <FaInfoCircle style={{ fontSize: "20px" }} />
                    </Link>

                    <Link
                      onClick={logoutHandle}
                      key="logout"
                      to="#"
                      className={`nav_link `}
                    >
                      <MdLogout style={{ fontSize: "22px" }} />
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
