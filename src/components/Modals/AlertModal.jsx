import React from "react";
import Modal from "./Modal"; // Import the Modal component
import "./Modal.css";

const AlertModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>{title}</h2>
      <div className="modal-buttons">
        <button className="modal-button cancel" onClick={onClose}>
          Cancel
        </button>
        <button className="modal-button confirm" onClick={onConfirm}>
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;
