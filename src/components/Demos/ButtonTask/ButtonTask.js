import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faListCheck,
  faImage,
  faFile,
  faUser,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const ButtonTask = ({ setTab, tab }) => {
  return (
    <>
      <div className="buttonGroup borderBottom">
        <button
          type="button"
          className={`demoTab ${
            tab === "activities" ? "demoTabSelected" : ""
          }`}
          onClick={() => setTab("activities")}
        >
          <FontAwesomeIcon icon={faListCheck} className="buttonGroupIcon" />{" "}
          Activities
        </button>

        <button
          type="button"
          className={`demoTab ${
            tab === "comments" ? "demoTabSelected" : ""
          }`}
          onClick={() => setTab("comments")}
        >
          <FontAwesomeIcon icon={faComment} className="buttonGroupIcon" />{" "}
          Comments
        </button>

        <button
          type="button"
          className={`demoTab ${tab === "file" ? "demoTabSelected" : ""}`}
          onClick={() => setTab("file")}
        >
          <FontAwesomeIcon icon={faFile} className="buttonGroupIcon" /> File
        </button>

        <button
          type="button"
          className={`demoTab ${
            tab === "screenshots" ? "demoTabSelected" : ""
          }`}
          onClick={() => setTab("screenshots")}
        >
          <FontAwesomeIcon icon={faImage} className="buttonGroupIcon" />{" "}
          Screenshots
        </button>

        <button
          type="button"
          className={`demoTab ${
            tab === "members" ? "demoTabSelected" : ""
          }`}
          onClick={() => setTab("members")}
        >
          <FontAwesomeIcon icon={faUser} className="buttonGroupIcon" /> Members
        </button>
      </div>
    </>
  );
};

export default ButtonTask;
