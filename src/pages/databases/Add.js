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

const Add = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { userData, demoMode } = useContext(Context);
  const title = "Add database";
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
        .post(process.env.REACT_APP_API_BASE_URL + "database/add", formData, {
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
            navigate("/databases");
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
        <div className="card pageContainerFull">
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
             
              <Spacer height={20} />

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

            <button
              onClick={submitForm}
              className="btn btn-primary btn-sm addButtonSm mt-5"
            >
              <FontAwesomeIcon icon={faCirclePlus} className="addButtonIcon" />
              Add database
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
