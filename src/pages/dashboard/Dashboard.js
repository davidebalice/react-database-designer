import "../../App.css";
import cover from "../../assets/img/cover.jpg";
import github from "../../assets/img/github.png";
import db from "../../assets/img/logo.png";
import node from "../../assets/img/node.jpg";
import react from "../../assets/img/react.jpg";
import react_node from "../../assets/img/react_node.png";

export default function Dashboard() {
  const token = localStorage.getItem("authToken");

  return (
    <>
      <div className="page">
        <div className="row justify-content-between">
          <div
            className="col d-flex align-items-center"
            style={{ whiteSpace: "nowrap" }}
          >
            <span className="text-xl" style={{ fontSize: "150%" }}>
              {" "}
            </span>
          </div>
        </div>

        <div className="accordion mb-3">
          <h2 className="accordion-header">
            <button className="dashboardBar" type="button">
              <h3 className="">Dashboard</h3>
            </button>
          </h2>

          <div className="accordion-item">
            <div className="accordion-collapse col-12 collapse show">
              <div className="dashboardSection">
                <div className="card-body">
                  <div className="row">
                    <div className="dashboardCol col-md-3 col-12">
                      <div className="dashboardDescription">
                        <b className="dashboardText1">Database designer</b>
                        <p className="dashboardText2">
                          Create database, tables, fields and field links using
                          the editor.
                          <br />
                          Export sql code generated.
                        </p>
                        <img
                          src={react_node}
                          className="dashboardLogo"
                          alt="dashboard logo"
                        />

                        <img
                          src={cover}
                          className="dashboardImg"
                          alt="dashboard cover"
                        />
                      </div>
                    </div>

                    <div className="dashboardCol col-md-3 col-12">
                      <div className="dashboardDescription ">
                        <img src={db} className="dbLogo" alt="db logo" />
                        <br />
                        <b className="dashboardText3">Important</b>
                        <p className="dashboardText4">
                          App is in <b>DEMO Mode</b>
                          <br />
                          CRUD operations are not allowed!
                        </p>
                      </div>
                    </div>

                    <div className="dashboardCol col-md-3 col-12">
                      <div className="dashboardDescription">
                        <div className="githubContainer">
                          <img
                            src={github}
                            className="dashboardLogo2"
                            alt="dashboard logo"
                          />
                          <img
                            src={react}
                            className="dashboardLogo2"
                            alt="dashboard logo"
                          />
                        </div>
                        <p className="githubTitle">Frontend</p>
                        <a
                          href="https://github.com/davidebalice/react-database-designer"
                          target="_blank"
                          className="githubLink"
                          rel="noreferrer"
                        >
                          github.com/davidebalice/react-database-designer
                        </a>
                      </div>
                    </div>

                    <div className="dashboardCol col-md-3 col-12">
                      <div className="dashboardDescription">
                        <div className="githubContainer">
                          <img
                            src={github}
                            className="dashboardLogo2"
                            alt="dashboard logo"
                          />
                          <img
                            src={node}
                            className="dashboardLogo2"
                            alt="dashboard logo"
                          />
                        </div>
                        <p className="githubTitle">Backend</p>
                        <a
                          href="https://github.com/davidebalice/node-database-designer-api"
                          target="_blank"
                          className="githubLink"
                          rel="noreferrer"
                        >
                          github.com/davidebalice/node-database-designer-api
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
