import React, { useEffect, useState } from "react";
import './Explore.css';
import like from './assets/like.png'
import heart from './assets/heart.png'
import following from './assets/following.png'
import { NavLink } from "react-router-dom";
import eye from "./assets/eye.png"

const App = () => {
  const [projects, setProjects] = useState([]);
  const [likes, setLikes] = useState([]);
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
      } catch (err) {
        setError(err.message);
        console.error("Error fetching projects data:", err);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await fetch("http://localhost:3000/likes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLikes(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching likes data:", err);
      }
    };

    fetchProjects();
    fetchLikes();
  }, []);

  return (
    <div className="main">
      <div className="line"></div>
      <div className="below">
        <img src={heart} alt="" className="heart" />
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="t" to="/explore">For you</NavLink>
        <div className="line2"></div>
        <img src={following} alt="" className="following" />
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="t" to="/explore">Following</NavLink>
      </div>
      <div className="line1"></div>
      <div className="container">
        {error ? <p className="error-message">⚠️ {error}</p> : null}
        <div className="projects-list">       {projects.length > 0 ? (
          projects.map((project, index) => {
            const projectLikes = likes[index] ? likes[index].likes : 0;
            return (
              <div key={project._id} className="project-card">
                <img src={project.projectLink} alt="Project" className="project-img" />
                <img src={like} alt="" className="like" />
                <img src={eye} alt="" className="eye"/>
                <p className="owner"> {project.projectOwner}</p>
                <p className="likes">{projectLikes}</p>
                <p className="likes1">{projectLikes}</p>
              </div>
            );
          })
        ) : (
          !error && <p>Loading...</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default App;
