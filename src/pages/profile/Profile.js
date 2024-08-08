import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/breadcrumb/index";
import Spacer from "../../components/spacer";
import Divider from "../../components/divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { userData, setUserData, demoMode } = useContext(Context);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("authToken");
  const title = "Profile";
  const brad = [
    {
      name: "home",
    },
    {
      name: title,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
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

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFormData(response.data.user);
        setUserData(response.data.user);
        console.log(response.data.user);
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
          `${process.env.REACT_APP_API_BASE_URL}/api/profile/update`,
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
          setUserData(response.data.user);
          Swal.fire({
            title: "Data updated",
            text: "",
            icon: "success",
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.isConfirmed) {
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
          `${process.env.REACT_APP_API_BASE_URL}/api/profile/password`,
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
          if (response.data.message === "success") {
            Swal.fire({
              title: "Password updated",
              text: "",
              icon: "success",
              cancelButtonText: "Close",
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const submitPhoto = (e) => {
    e.preventDefault();
    if (demoMode) {
      Swal.fire({
        title: "Demo mode",
        text: "Crud operations are not allowed",
        icon: "error",
        cancelButtonText: "Close",
      });
    } else {
      const formPhoto2 = new FormData();
      formPhoto2.append("photo", file);

      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/profile/photo`,
          formPhoto2,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setFormData({ photo: response.data.photo });
          setUserData({ photo: response.data.photo });
          if (response.data.message === "success") {
            Swal.fire({
              title: "Photo updated",
              text: "",
              icon: "success",
              cancelButtonText: "Close",
            }).then((result) => {
              if (result.isConfirmed) {
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
      <div className="page">
        <Breadcrumb title={title} brad={brad} />
        <div className="card">
          <div className="card-body formContainer">
            <div className="row ">
              <h4>Personal data</h4>
              <br />
              <br />
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
            </div>
            <button onClick={submitForm} className="btn saveButton btn-sm mt-3">
              <FontAwesomeIcon icon={faFloppyDisk} className="saveButtonIcon" />{" "}
              Save
            </button>

            <Divider marginTop={40} marginBottom={40} />

            <h4>Update password</h4>
            <br />
            <div className="row ">
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
            </div>

            <button
              onClick={submitPassword}
              className="btn saveButton btn-sm mt-3"
            >
              <FontAwesomeIcon icon={faFloppyDisk} className="saveButtonIcon" />{" "}
              Save
            </button>

            <Divider marginTop={50} marginBottom={30} />

            <div className="row ">
              <div className="mt-3">
                <h4>Profile photo</h4>
                <br /> <br />
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/api/user/img/${
                    formData && formData.photo
                  }`}
                  class="userImg"
                  alt=""
                />
              </div>
              <div className="col-md-6 mt-3">
                <label for="photo">
                  <b>Select file</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  required
                  onChange={handleFile}
                />
              </div>
            </div>

            <button
              onClick={submitPhoto}
              className="btn saveButton btn-sm mt-3"
            >
              <FontAwesomeIcon icon={faFloppyDisk} className="saveButtonIcon" />{" "}
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
