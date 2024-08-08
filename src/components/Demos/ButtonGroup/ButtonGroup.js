import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faListCheck,
  faTableList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ButtonGroup = ({ demoId, selectedTab }) => {
  const location = useLocation();

  return (
    <>
      <div className="buttonGroup">
        <Link to={`/demo/${demoId}`}>
          <button
            type="button"
            className={`demoTab ${
              selectedTab === "demo" ? "demoTabSelected" : ""
            }`}
          >
            <FontAwesomeIcon icon={faTableList} className="buttonGroupIcon" />{" "}
            Demo detail
          </button>
        </Link>

        <Link to={`/demo/tasks/${demoId}`}>
          <button
            type="button"
            className={`demoTab ${
              selectedTab === "tasks" ? "demoTabSelected" : ""
            }`}
          >
            <FontAwesomeIcon icon={faListCheck} className="buttonGroupIcon" />{" "}
            Tasks
          </button>
        </Link>

        <Link to={`/demo/members/${demoId}`}>
          <button
            type="button"
            className={`demoTab  ${
              selectedTab === "members" ? "demoTabSelected" : ""
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="buttonGroupIcon" />{" "}
            Members
          </button>
        </Link>
      </div>
    </>
  );
};

export default ButtonGroup;
