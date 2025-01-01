import React from "react";
import PropTypes from "prop-types";

function IconButton({ iconClass, onClick, label, size, color, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "transparent",
        cursor: "pointer",
        ...style,
      }}
      aria-label={label}
    >
      <i
        className={`fa-solid ${iconClass}`}
        style={{ fontSize: size, color: color }}
      />
    </button>
  );
}

IconButton.propTypes = {
  iconClass: PropTypes.string.isRequired, // Font Awesome class for the icon
  onClick: PropTypes.func, // Function to handle click event
  label: PropTypes.string, // Accessible label for the button
  size: PropTypes.string, // Icon size (e.g., '20px')
  color: PropTypes.string, // Icon color
  style: PropTypes.object, // Additional styles for the button
};

export default IconButton;
