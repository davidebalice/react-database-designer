import {
  faCircleChevronLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import Divider from "../../components/divider/index";
import Spacer from "../../components/spacer/index";
import { Context } from "../../context/UserContext";
import isAllowed from "../../middlewares/allow";
import NotPermission from "../Auth/notPermission";

const Edit = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { userData, demoMode } = useContext(Context);
  const title = "Edit database";
  const [file, setFile] = useState(null);
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}database/edit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data.database);
        console.log("response.data");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);

        Swal.fire("Error", error, "error");
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("demo");
    console.log(demoMode);
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
          `${process.env.REACT_APP_API_BASE_URL}database/edit/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log("response.data");
          console.log(response.data);
          if (response.data.status === "success") {
            Swal.fire({
              title: "Database updated",
              text: "",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Back to databases",
              cancelButtonText: "Close",
            }).then((result) => {
              if (result.isConfirmed) {
                if (response.data.status === "success") {
                  navigate("/databases");
                }
              }
            });
          } else if (response.data.status === "demo") {
            Swal.fire({
              title: "Demo mode",
              text: "Crud operations are not allowed",
              icon: "error",
              cancelButtonText: "Close",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      {userData &&
      formData &&
      isAllowed(
        userData.role,
        userData.id,
        formData.members,
        formData.owner
      ) ? (
        <div className="page">
          <div class="row">
            <Link to={`/databases`}>
              <div class="backButton col-sm-4 col-md-4 col-lg-3">
                <FontAwesomeIcon
                  icon={faCircleChevronLeft}
                  className="backButtonIcon"
                />
                <div class="card-body d-flex px-1">Back</div>
              </div>
            </Link>
          </div>
          <Breadcrumb title={title} brad={brad} />
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-center formContainer">
                <div className="col-12 mt-3">
                  <label for="name">
                    <b>Database name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInput}
                  />
                </div>

                <Spacer height={12} />
               
                <div className="col-md-12">
                  <label for="summary">
                    <b>Summary</b>
                  </label>
                  <textarea
                    className="form-control"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInput}
                  ></textarea>
                </div>
              </div>

              <Spacer height={12} />

              <button
                onClick={submitForm}
                className="btn btn-sm saveButton mt-3"
              >
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className="saveButtonIcon"
                />{" "}
                Save
              </button>

              <Divider
                marginTop={80}
                marginBottom={60}
                borderSize={1}
                borderType={"solid"}
                borderColor={"#ddd"}
              />

              <div className="col-md-6 mt-3"></div>
            </div>
          </div>
        </div>
      ) : (
        <NotPermission />
      )}
    </>
  );
};

export default Edit;
