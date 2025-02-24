import React from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css"; // Add styles for the modal
import likeIcon from "./assets/like.png";

const Modal = ({ project, onClose, onLike, likes }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        {project.videoLink ? (
          <video src={project.videoLink} controls className="modal-video"></video>
        ) : (
          <img src={project.projectLink} alt="Project" className="modal-image" />
        )}

        <p className="owner-p">Owner: {project.projectOwner}</p>
        
        {/* Like Button */}
        <button className="like-btn" onClick={() => onLike(project._id)}>
          <img src={likeIcon} alt="Like" />
          {likes?.count || 0}
        </button>

        {/* Visit Portfolio Button */}
        <button className="portfolio-btn" onClick={() => navigate("/portfolio")}>
          Visit Portfolio
        </button>
      </div>
    </div>
  );
};

export default Modal;
