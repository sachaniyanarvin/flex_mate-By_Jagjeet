import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './Explore.css';
import like from './assets/like.png';
import heart from './assets/heart.png';
import following from './assets/following.png';
import eye from "./assets/eye.png";
import Modal from "./Modal"; // Import the modal component

const App = () => {
  const [projects, setProjects] = useState([]);
  const [likes, setLikes] = useState({});
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // State for modal
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/portfolio");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        const initialLikes = {};
        data.forEach((project) => {
          initialLikes[project._id] = { count: project.likes || 0, liked: false };
        });
        setLikes(initialLikes);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching projects data:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleLike = async (projectId) => {
    const projectLikes = likes[projectId];
    const newLiked = !projectLikes.liked;
    const newCount = projectLikes.count + (newLiked ? 1 : -1);

    // Optimistically update state
    setLikes((prevLikes) => ({
      ...prevLikes,
      [projectId]: { count: newCount, liked: newLiked },
    }));

    try {
      const response = await fetch(`http://localhost:3000/portfolio/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: newCount }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error updating like count:", err);
      // Revert to previous state on error
      setLikes((prevLikes) => ({
        ...prevLikes,
        [projectId]: { count: projectLikes.count, liked: projectLikes.liked },
      }));
      setError(err.message);
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const navigateToPortfolio = (projectId) => {
    navigate(`/portfolio/${projectId}`); // Navigate to the specific portfolio
  };

  // Compute sorted projects (most liked first) and take only the first 20
  const sortedProjects = [...projects]
    .sort((a, b) => (likes[b._id]?.count || 0) - (likes[a._id]?.count || 0))
    .slice(0, 20);

  return (
    <div className="main">
      <div className="line"></div>
      <div className="below">
        <img src={heart} alt="" className="heart" />
        <NavLink className={(e) => (e.isActive ? "blue" : "")} id="t" to="/explore">For you</NavLink>
        <div className="line2"></div>
        <img src={following} alt="" className="following" />
        <NavLink className={(e) => (e.isActive ? "blue" : "")} id="t" to="/explore">Following</NavLink>
      </div>
      <div className="line1"></div>
      <div className="container">
        {error ? <p className="error-message">⚠️ {error}</p> : null}
        <div className="projects-list">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <div key={project._id} className="project-card">
                <img
                  src={project.projectLink}
                  alt="Project"
                  className="project-img"
                  onClick={() => navigateToPortfolio(project._id)} // Navigate to portfolio on click
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={like}
                  alt="like button"
                  className="like"
                  onClick={() => handleLike(project._id)}
                  style={{ cursor: "pointer", opacity: likes[project._id]?.liked ? 0.7 : 1 }}
                />
                <img src={eye} alt="" className="eye" />
                <p className="owner">{project.projectOwner}</p>
                <p className="likes">{likes[project._id]?.count || 0}</p>
                <p className="likes1">{likes[project._id]?.count || 0}</p>
              </div>
            ))
          ) : (
            !error && <p>Loading...</p>
          )}
        </div>
      </div>
      {selectedProject && (
        <Modal
          project={selectedProject}
          onClose={closeModal}
          onLike={handleLike}
          likes={likes[selectedProject._id]}
        />
      )}
    </div>
  );
};

export default App;