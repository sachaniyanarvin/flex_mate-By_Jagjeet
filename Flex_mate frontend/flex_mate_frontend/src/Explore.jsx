import React, { useEffect, useState } from "react";
import './Explore.css';
import like from './assets/like.png';
import heart from './assets/heart.png';
import following from './assets/following.png';
import { NavLink } from "react-router-dom";
import eye from "./assets/eye.png";

const App = () => {
  const [projects, setProjects] = useState([]);
  // Using an object where each key is a project id with its like count and liked status
  const [likes, setLikes] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        // Initialize likes state based on projects
        const initialLikes = {};
        data.forEach((project) => {
          // Assuming each project has a 'likes' field and an initial liked status (false)
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

  // Handle like click: toggle the liked state and update the count
  const handleLike = async (projectId) => {
    setLikes((prevLikes) => {
      const projectLikes = prevLikes[projectId];
      const newLiked = !projectLikes.liked;
      const newCount = projectLikes.count + (newLiked ? 1 : -1);
      return {
        ...prevLikes,
        [projectId]: { count: newCount, liked: newLiked },
      };
    });

    // Prepare the updated like count based on current state
    const updatedCount = likes[projectId]?.liked
      ? likes[projectId].count - 1  // if already liked, we are unliking
      : likes[projectId].count + 1; // if not liked, we are liking

    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updatedCount }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Optionally, you can update your state with the response data if needed
      // const updatedProject = await response.json();
    } catch (err) {
      console.error("Error updating like count:", err);
      // Optionally, revert the UI state if the backend update fails
      setLikes((prevLikes) => {
        const projectLikes = prevLikes[projectId];
        // revert the toggling changes
        return {
          ...prevLikes,
          [projectId]: { count: projectLikes.count + (projectLikes.liked ? -1 : 1), liked: !projectLikes.liked },
        };
      });
      setError(err.message);
    }
  };

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
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="project-card">
                <img src={project.projectLink} alt="Project" className="project-img" />
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
    </div>
  );
};

export default App;
