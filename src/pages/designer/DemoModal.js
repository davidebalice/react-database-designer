import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DemoModal = ({ show, handleDemoClose }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay" onClick={handleDemoClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <p>{" "}</p>
          <div className="modal-button-container">
            <button onClick={handleDemoClose} className="modal-button">
              <FontAwesomeIcon icon={faClose} className="modal-icon" />
              Close
            </button>
          </div>
        </div>
        <div className="modal-body">wef e qg eqrg eqr </div>
      </div>
    </div>
  );
};

export default DemoModal;
