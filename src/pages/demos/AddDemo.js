import {
  faCircleChevronLeft,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import Spacer from "../../components/spacer";
import { Context } from "../../context/UserContext";

const AddDemo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { userData, demoMode } = useContext(Context);
  const title = "Add demo";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const [responseData, setResponseData] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    tecnology: "",
    slug: "",
    order: "",
    summary: "",
    description: "",
    frontend: "",
    backend: "",
    github: "",
  });


  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (demoMode) {
      Swal.fire({
        title: "Demo mode",
        text: "Crud operations are not allowed",
        icon: "error",
        cancelButtonText: "Close",
      });
    } else {
      axios
        .post(process.env.REACT_APP_API_BASE_URL + "/api/add/demo", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("response.data");
          console.log(response.data);
          setResponseData(response.data.message);
          const owner = data.owner;
          setFormData({
            ...formData,
            owner: owner,
          });

          if (response.data.create === "success") {
            navigate("/demos");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <div className="page">
        <div class="row">
          <Link to={`/demos`}>
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
        <div className="card pageContainerFull">
          <div className="card-body">
            <div className="row justify-content-center formContainer">
              <div className="col-12 mt-3">
                <label for="name">
                  <b>Demo title</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInput}
                />
              </div>
              <div className="col-12 mt-3">
                <label for="subtitle">
                  <b>Subtitle</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInput}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label for="tecnology">
                  <b>Tecnology</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="tecnology"
                  value={formData.tecnology}
                  onChange={handleInput}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label for="slug">
                  <b>Slug</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInput}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label for="order">
                  <b>Order</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="order"
                  value={formData.order}
                  onChange={handleInput}
                />
              </div>

              <div className="col-md-6 mt-3"></div>

              <Spacer height={40} />

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

              <Spacer height={40} />

              <div className="col-md-12">
                <label for="description">
                  <b>Full description</b>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInput}
                  style={{ height: "150px" }}
                ></textarea>
              </div>
            </div>
            <div className="col-md-6 mt-3"></div>
            <Spacer height={40} />

            <div className="row justify-content-center formContainer">
              <div className="col-12">
                <b>Link</b>:
              </div>
              <div className="col-md-6 mt-3">
                <label for="slug">
                  <b>Frontend</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="frontend"
                  value={formData.frontend}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-6 mt-3">
                <label for="slug">
                  <b>Backend</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="backend"
                  value={formData.backend}
                  onChange={handleInput}
                />
              </div>{" "}
              <div className="col-md-6 mt-3">
                <label for="slug">
                  <b>Github</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="github"
                  value={formData.github}
                  onChange={handleInput}
                />
              </div>
              <div className="col-md-6 mt-3"></div>
            </div>

            <button
              onClick={submitForm}
              className="btn btn-primary btn-sm addButtonSm mt-5"
            >
              <FontAwesomeIcon icon={faCirclePlus} className="addButtonIcon" />
              Add demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDemo;
