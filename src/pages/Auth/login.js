import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/img/logo.png";
import { Context } from "../../context/UserContext";

const Login = () => {
  const { login } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginHandle = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "login", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.status === "success") {
          Swal.fire("Login success", "", "success");

          const token = response.data.token;
          localStorage.setItem("authToken", token);

          login(response.data.user);

          navigate("/");
        } else {
          Swal.fire("Login failed", response.data.message, "error");
          localStorage.removeItem("authToken");
        }
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
        Swal.fire("Login failed", "Data incorrect", "error");
        localStorage.removeItem("authToken");
      });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <>
      <div className="loginBackground">
        <div className="container">
          <div
            className="row justify-content-center align-items-center jumbotron"
            style={{ height: "65vh" }}
          >
            <div className="col-md-5">
              <div className="card loginBox">
                <div className="card-header border-bottom text-center">
                  <img src={logo} class="loginLogo" alt="db logo" />
                  <h2>Database Designer</h2>
                  <span>developer in React and Node</span>
                </div>
                <div className="card-body">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInput}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-control my-3"
                    value={formData.password}
                    onChange={handleInput}
                  />

                  <button
                    type="sumit"
                    onClick={loginHandle}
                    className="btn btn-primary mt-2 w-100"
                  >
                    Login
                  </button>
                  <div class="loginDemo">
                    <b>Demo data</b>:
                    <br />
                    Email: mario@rossi.it
                    <br />
                    Password: 12345678
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
