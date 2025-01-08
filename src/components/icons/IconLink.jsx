import React from "react";
import PropTypes from "prop-types";

function IconLink({ iconClass, href, label, size, color, style, target }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "transparent",
        cursor: "pointer",
        ...style,
      }}
      aria-label={label}
    >
      <i className={`${iconClass}`} style={{ fontSize: size, color: color }} />
    </a>
  );
}

IconLink.propTypes = {
  iconClass: PropTypes.string.isRequired, // Font Awesome class for the icon
  href: PropTypes.string.isRequired, // URL the link points to
  label: PropTypes.string, // Accessible label for the link
  size: PropTypes.string, // Icon size (e.g., '20px')
  color: PropTypes.string, // Icon color
  style: PropTypes.object, // Additional styles for the link
  target: PropTypes.string, // Target attribute for the link (e.g., '_blank')
};

IconLink.defaultProps = {
  target: "_self", // Default target is the same tab
  label: "Icon Link", // Default accessible label
};

export default IconLink;
