import React from "react";
import "./PageNotFound.css";
import pageNotFoundImg from "../../assets/page-not-found.svg";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-not-found-container">
      <div className="back-to-home-link" onClick={() => navigate("/")}>
        <Home />
        Home
      </div>
      <div className="image-container">
        <img src={pageNotFoundImg} alt="404 Page Not Found" />
      </div>
    </div>
  );
}

export default PageNotFound;
