import { useEffect, useState } from "react";
import './portfolio.css'

export default function Portfolio() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/portfolio")
      .then((response) => response.json())
      .then((result) => setData(result[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="portfolio-container">
      <header className="hero-section">
        <h1>{data.Header}</h1>
        <p>{data.WorkDescription}</p>
        <img src={data.YourimageLink} alt="Profile" className="profile-image" />
      </header>

      <section className="skills-section">
        <h2>{data.SkillsHeader}</h2>
        <p>{data.SkillsHeaderDescription}</p>
        <div className="skills">
          {[data["1stskill"], data["2ndskill"], data["3rdskill"]].map((skill, index) => (
            <div key={index} className="skill-card">
              <h3>{skill[0]}</h3>
              <p>{skill[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-section">
        <h2>See My Latest Project</h2>
        <a href={data.YourLatestProjectLink} target="_blank" rel="noopener noreferrer">
          <p>{data.YourLatestProjectLinkDescription}</p>
        </a>
      </section>
    </div>
  );
}
