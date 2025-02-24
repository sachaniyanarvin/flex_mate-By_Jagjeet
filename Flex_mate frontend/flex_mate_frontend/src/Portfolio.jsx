import { useEffect, useState } from "react";
import './portfolio.css';
import customers from './assets/customers.png';

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
      {data.map((user) => (
        <div className="portfolio-container-2" key={user._id + "skills"}>
          <img src={user.skillsPhoto} alt="" className="neel-sir-and-me" />
          <div className="skillstext">{user.SkillsHeader}</div>
          <div className="uponskillstext">{user.SkillsHeaderDescription}</div>
          <div className="learn">Learn more</div>
          <div className="thick-line"></div>
          <div className="thin-line"></div>
          <div className="numbers">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`number-${num}`}>{num}</div>
            ))}
          </div>
          <div className="skills-txt">
            {[user["1stskill"], user["2ndskill"], user["3rdskill"]].map((skill, index) => (
              <div key={index} className="first-text">{skill[0]}</div>
            ))}
          </div>
          <div className="skills-text-2">
            {[user["1stskill"], user["2ndskill"], user["3rdskill"]].map((skill, index) => (
              <div key={index} className="second-text">{skill[1]}</div>
            ))}
          </div>
        </div>
      ))}
      {data.map((user) => (
        <div className="portfolio-container-3" key={user._id + "video"}>
          <div className="upper-video">SEE MY LATEST PROJECT</div>
          <div className="upper-video-2">{user.YourLatestProjectLinkDescription}</div>
          <div className="video-wrapper">
            <video
              src="https://res.cloudinary.com/dk8asmefs/video/upload/v1740137116/vcdef8nnjiee1zyxosni.mp4"
              controls
              style={{ width: '1000px', marginLeft: '190px', marginTop: "30px", borderRadius: "10px" }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="learn" style={{ backgroundColor: "black", marginLeft: "650px" }}>View More</div>
        </div>
      ))}
      {data.map((user) => (
        <div className="portfolio-container-4" key={user._id + "about"}>
          <img src="https://res.cloudinary.com/dk8asmefs/image/upload/v1740198516/hhxcwwhvagqvo0elljlw.jpg" className="burgman" alt="" />
          <div className="last-text">GETTING TO KNOW ME</div>
          <div className="last-text-2">{user.AboutYou}</div>
          <div className="learn" style={{marginLeft:"100px"}}>learn more</div>
        </div>
      ))}
    </div>
  );
}