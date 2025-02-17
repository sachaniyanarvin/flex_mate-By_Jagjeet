import { useEffect, useState } from "react";
import './portfolio.css';
import jagjeet from './assets/jagjeet.png';
import customers from './assets/customers.png';

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
    <div className="pfp-section">
      <img src={jagjeet} className="jagjeet" alt="" />
      <div className="info-box-1">👋 Hey, i'm jagjeet</div>
      <div className="info-box-2">UI/UX Designer shaping user <br /> experiences.</div>
      <div className="jakarta">The go-to expert<br />for intuitive<br />designs.</div>
      <div className="below-jakarta">Whenever I design, I aim to create experiences that engage. <br /> There is no better way to connect with users!</div>
      <div className="design">Need a Design</div>
      <div className="chat">Say hi</div>
      <img src={customers} alt="" className="customers" />
      <h2 className="count-1">750+</h2>
      <h3 className="count-2">Happy Customers</h3>
    </div>
    // <div className="portfolio-container">
    //   <header className="hero-section">
    //     <h1>{data.Header}</h1>
    //     <p>{data.WorkDescription}</p>
    //     <img src={data.YourimageLink} alt="Profile" className="profile-image" />
    //   </header>

    //   <section className="skills-section">
    //     <h2>{data.SkillsHeader}</h2>
    //     <p>{data.SkillsHeaderDescription}</p>
    //     <div className="skills">
    //       {[data["1stskill"], data["2ndskill"], data["3rdskill"]].map((skill, index) => (
    //         <div key={index} className="skill-card">
    //           <h3>{skill[0]}</h3>
    //           <p>{skill[1]}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </section>

    //   <section className="project-section">
    //     <h2>See My Latest Project</h2>
    //     <a href={data.YourLatestProjectLink} target="_blank" rel="noopener noreferrer">
    //       <p>{data.YourLatestProjectLinkDescription}</p>
    //     </a>
    //   </section>
    // </div>
  );
}
