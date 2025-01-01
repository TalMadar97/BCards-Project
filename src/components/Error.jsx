import React from "react";

function Error({ message = "Something went wrong. Please try again later." }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message}</p>
    </div>
  );
}

export default Error;
