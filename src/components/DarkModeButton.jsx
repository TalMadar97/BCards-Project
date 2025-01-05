import React, { useState, useEffect } from "react";
import cacheUtils from "../utils/cache";

function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(cacheUtils.getDarkMode());

  // Apply dark mode class on initial load
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    cacheUtils.setDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-btn"
      title="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <i className="fa-solid fa-moon"></i> // Dark mode icon
      ) : (
        <i className="fa-regular fa-sun"></i> // Light mode icon
      )}
    </button>
  );
}

export default DarkModeButton;
