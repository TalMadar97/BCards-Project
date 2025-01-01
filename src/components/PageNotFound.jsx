
import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="page-not-found">
      <div className="icon-container">
        <i className="fa-solid fa-triangle-exclamation fa-4x"></i>{" "}
      </div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <button onClick={handleGoHome} className="btn btn-primary">
        Go Home
      </button>
    </div>
  );
}

export default PageNotFound;
