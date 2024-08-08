import { Link } from "react-router-dom";
import React from "react";

const footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className="footer">
      <div className="col-auto">
        <span>
          <b>Copyright © {currentYear}</b> Davide Balice -{" "}
          <a
            href="https://www.davidebalice.dev"
            rel="noreferrer"
            target="_blank"
            alt="davide balice"
            className="text-primary"
          >
            www.davidebalice.dev
          </a>
        </span>
      </div>
    </footer>
  );
};

export default footer;
