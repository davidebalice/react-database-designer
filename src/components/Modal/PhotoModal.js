import { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Context } from "../../context/UserContext";

const PhotoModal = ({ show, imgUrl, title, closePhotoModal }) => {
  const { userData, demo } = useContext(Context);
  return (
    <>
      <Modal show={show} className="photoModal" size="lg" centered>
        <Modal.Header className="photoModalHeader">
          <Modal.Title style={{fontSize:'14px'}}>{title}</Modal.Title>
          <Button variant="secondary" onClick={closePhotoModal}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body className="photoModalHeader">
          <img src={imgUrl} alt="" className="photoModalImg" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhotoModal;