import { useState, useContext } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import NotPermission from "../Auth/notPermission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { userData, demoMode } = useContext(Context);
  const title = "Add user";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
    password: "",
    passwordConfirm: "",
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
        .post(process.env.REACT_APP_API_BASE_URL + "/api/add/user", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          setResponseData(response.data.message);

          if (response.data.message === "success") {
            navigate(`/users`);
          }
        })
        .catch((error) => {
          setResponseData(error);
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      {userData && userData.role === "admin" ? (
        <>
          <div className="page">
            <div class="row">
              <Link to={`/users`}>
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
                  <div className="col-md-6 mt-3">
                    <label for="name">
                      <b>Surname</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="surname"
                      required
                      value={formData.surname}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label for="name">
                      <b>Name</b>
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
                  <div className="col-md-6 mt-3">
                    <label for="priority">
                      <b>Email</b>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label for="role">
                      <b>Role</b>
                    </label>
                    <select
                      className="form-control"
                      name="role"
                      value={formData.role}
                      required
                      onChange={handleInput}
                    >
                      <option value=""> - Select role - </option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label for="name">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label for="name">
                      <b>Confirm password</b>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="passwordConfirm"
                      required
                      value={formData.passwordConfirm}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <button
                  onClick={submitForm}
                  className="btn saveButton btn-sm mt-5"
                >
                  <FontAwesomeIcon icon={faPlus} className="saveButtonIcon" />{" "}
                  Add User
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NotPermission />
        </>
      )}
    </>
  );
};

export default AddUser;
