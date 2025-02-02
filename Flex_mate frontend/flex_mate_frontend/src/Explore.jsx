import React, { useEffect, useState } from "react";
import './Explore.css';

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
    <div className="container">
      {error ? <p className="error-message">⚠️ {error}</p> : null}
      <div className="projects-list">
        {projects.length > 0 ? (
          projects.map((project, index) => {
            // Assuming the index of the project corresponds to the index of the likes
            const projectLikes = likes[index] ? likes[index].likes : 0;
            return (
              <div key={project._id} className="project-card">
                <img src={project.projectLink} alt="Project" className="project-img" />
                <p>Owner: {project.projectOwner}</p>
                <p>Likes: {projectLikes}</p>
              </div>
            );
          })
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
