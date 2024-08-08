import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import { Link, useParams, useNavigate } from "react-router-dom";
import Divider from "../../components/divider/index";
import NotPermission from "../Auth/notPermission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const EditUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const title = "Edit user";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];
  const { id } = useParams();
  const { userData, demoMode } = useContext(Context);
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
  });
  const [passwordData, setPasswordData] = useState({
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

  const handleInputPassword = (event) => {
    const { name, value } = event.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data.user);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error", error, "error");
      });
  }, []);

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
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/${id}`,
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
          setResponseData(response.data.message);

          Swal.fire({
            title: "User updated",
            text: "",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Back to users",
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.isConfirmed) {
              if (response.data.status === "success") {
                navigate(`/users`);
              }
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const submitPassword = (e) => {
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
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/password/${id}`,
          passwordData,
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
          setResponseData(response.data.message);
          if (response.data.message === "success") {
            Swal.fire({
              title: "Password updated",
              text: "",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Back to users",
              cancelButtonText: "Close",
            }).then((result) => {
              if (result.isConfirmed) {
                if (response.data.status === "success") {
                  navigate(`/users`);
                }
              }
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
      {userData && userData.role === "admin" ? (
        <>
          <div className="page">
            <div class="row">
              <Link to={`/users`}>
                <div class="backButton bg-primary col-sm-4 col-md-4 col-lg-3">
                  <FontAwesomeIcon
                    icon={faCircleChevronLeft}
                    className="backButtonIcon"
                  />
                  <div class="card-body d-flex px-1">Back</div>
                </div>
              </Link>
            </div>
            <Breadcrumb title={title} brad={brad} />
            {responseData}
            <div className="card">
              <div className="card-body">
                <form className="row justify-content-start formContainer">
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
                  </div>
                </form>

                <Divider
                  marginTop={60}
                  marginBottom={60}
                  borderSize={1}
                  borderType={"solid"}
                  borderColor={"#ddd"}
                />

                <form className="row justify-content-start formContainer">
                  <div className="col-md-6 mt-3">
                    <label for="name">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      value={passwordData.password}
                      onChange={handleInputPassword}
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
                      value={passwordData.passwordConfirm}
                      onChange={handleInputPassword}
                    />
                  </div>

                  <div className="col-md-6 mt-3">
                    <button
                      onClick={submitPassword}
                      className="btn btn-sm saveButton mt-3"
                    >
                      <FontAwesomeIcon
                        icon={faFloppyDisk}
                        className="saveButtonIcon"
                      />{" "}
                      Save
                    </button>
                  </div>
                </form>
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

export default EditUser;
