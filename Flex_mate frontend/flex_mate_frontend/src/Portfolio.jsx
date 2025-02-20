import { useEffect, useState } from "react";
import './portfolio.css';
import customers from './assets/customers.png';
import skillsphoto from './assets/groupphoto2.png';

export default function Portfolio() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/portfolio")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data.length) return <p>Loading...</p>;

  return (
    <div className="portfolio-container">
      {data.map((user) => (
        <div className="pfp-section" key={user._id}>
          <img src={user.YourimageLink} className="jagjeet" alt="Profile" />
          <div className="info-box-1">{user["1stNote"]}</div>
          <div className="info-box-2">{user["2ndNote"]}</div>
          <div className="jakarta">{user.Header}</div>
          <div className="below-jakarta">{user.WorkDescription}</div>
          <div className="design">Need a Design</div>
          <div className="chat">Say hi</div>
          <img src={customers} alt="Customers" className="customers" />
          <h2 className="count-1">750+</h2>
          <h3 className="count-2">Happy Customers</h3>
        </div>
      ))}
      <div className="portfolio-container-2">
        <img src={skillsphoto} alt="" className="neel-sir-and-me" />
        <div className="skillstext">INCREASE YOUR SKILLS & IMPACT</div>
      </div>
    </div>
  );
}



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