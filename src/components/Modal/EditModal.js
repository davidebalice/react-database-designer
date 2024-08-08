import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Context } from "../../context/UserContext";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const EditModal = ({
  editData,
  closeEditModal,
  updateUrl,
  onUpdateActivities,
  type,
}) => {
  const token = localStorage.getItem("authToken");
  const [text, setText] = useState("");
  const { userData, demo } = useContext(Context);

  const handleUpdateActivities = (newActivities) => {
    onUpdateActivities(newActivities);
  };

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
          `${process.env.REACT_APP_API_BASE_URL}${updateUrl}`,
          { id: editData.id, name: text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          if (type === "activities") {
            console.log(response.data.activities);
            handleUpdateActivities(response.data.activities);
          } else if (type === "comments") {
            console.log(response.data.comments);
            handleUpdateActivities(response.data.comments);
          } else if (type === "files") {
            console.log(response.data.files);
            handleUpdateActivities(response.data.files);
          }

          closeEditModal();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Modal show={editData.show} centered>
        <Modal.Header className="modalHeader">
          <Modal.Title></Modal.Title>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={closeEditModal}
            className="modalClose"
          />
        </Modal.Header>
        <Modal.Body>
          <Form>
            <textarea
              name="text"
              className="form-control"
              style={{ height: "200px" }}
              onChange={handleTextChange}
            >
              {editData.text}
            </textarea>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={submitForm} className="btn btn-sm saveButton mt-3">
            <FontAwesomeIcon icon={faFloppyDisk} className="saveButtonIcon" />{" "}
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
