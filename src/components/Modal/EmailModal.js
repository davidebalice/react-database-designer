import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Context } from "../../context/UserContext";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const EmailModal = ({ modalData, closeEmailModal }) => {
  const token = localStorage.getItem("authToken");
  const [message, setMessage] = useState("");
  const { userData, demo } = useContext(Context);
  const [data, setData] = useState({
    text: "",
    subject: "",
    email: modalData.email,
  });

  useEffect(() => {
    setMessage("");
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (demo) {
      Swal.fire({
        title: "Demo mode",
        text: "Crud operations are not allowed",
        icon: "error",
        cancelButtonText: "Close",
      });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/send/email/user`,
          { data },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          setMessage(response.data.message);
          setData({
            text: "",
            subject: "",
            email: modalData.email,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
      email: modalData.email,
    });
  };

  return (
    <>
      <Modal show={modalData.show} centered>
        <Modal.Header className="modalHeader">
          <Modal.Title></Modal.Title>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={closeEmailModal}
            className="modalClose"
          />
        </Modal.Header>
        <Modal.Body>
          <p>
            Send email to{" "}
            <b>
              {modalData.companyName && modalData.companyName}{" "}
              {modalData.name && modalData.name}{" "}
              {modalData.surname && modalData.surname}
            </b>{" "}
            at <b>{modalData && modalData.email}</b>
          </p>
          {!message && (
            <Form>
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                onChange={handleInput}
                value={data.subject}
                required
                className="form-control"
              />
              <br />
              <label>Message:</label>
              <textarea
                name="text"
                onChange={handleInput}
                className="form-control"
                required
                style={{ height: "100px" }}
              >
                {data.text}
              </textarea>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btn btn-sm sendButton"
            onClick={submitForm}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              onClick={closeEmailModal}
              className="modalSend"
            />{" "}
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmailModal;
