import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './portfolio.css';
import customers from './assets/customers.png';

export default function Portfolio() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the project ID from the URL

  useEffect(() => {
    fetch(`http://localhost:3000/portfolio/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Fetched data:", result);
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="portfolio-container">
      <div className="pfp-section" key={data._id}>
        <img src={data.YourimageLink} className="jagjeet" alt="Profile" />
        <div className="info-box-1">{data["1stNote"]}</div>
        <div className="info-box-2">{data["2ndNote"]}</div>
        <div className="jakarta">{data.Header}</div>
        <div className="below-jakarta">{data.WorkDescription}</div>
        <div className="design">Need a Design</div>
        <div className="chat">Say hi</div>
        <img src={customers} alt="Customers" className="customers" />
        <h2 className="count-1">750+</h2>
        <h3 className="count-2">Happy Customers</h3>
      </div>

      <div className="portfolio-container-2" key={data._id + "skills"}>
        <img src={data.skillsPhoto} alt="" className="neel-sir-and-me" />
        <div className="skillstext">{data.SkillsHeader}</div>
        <div className="uponskillstext">{data.SkillsHeaderDescription}</div>
        <div className="learn">Learn more</div>
        <div className="thick-line"></div>
        <div className="thin-line"></div>
        <div className="numbers">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`number-${num}`}>{num}</div>
          ))}
        </div>
        <div className="skills-txt">
          {[data["1stskill"], data["2ndskill"], data["3rdskill"]].map((skill, index) => (
            <div key={index} className="first-text">{skill[0]}</div>
          ))}
        </div>
        <div className="skills-text-2">
          {[data["1stskill"], data["2ndskill"], data["3rdskill"]].map((skill, index) => (
            <div key={index} className="second-text">{skill[1]}</div>
          ))}
        </div>
      </div>

      <div className="portfolio-container-3" key={data._id + "video"}>
        <div className="upper-video">SEE MY LATEST PROJECT</div>
        <div className="upper-video-2">{data.YourLatestProjectLinkDescription}</div>
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

      <div className="portfolio-container-4" key={data._id + "about"}>
        <img src="https://res.cloudinary.com/dk8asmefs/image/upload/v1740198516/hhxcwwhvagqvo0elljlw.jpg" className="burgman" alt="" />
        <div className="last-text">GETTING TO KNOW ME</div>
        <div className="last-text-2">{data.AboutYou}</div>
        <div className="learn" style={{ marginLeft:"100px" }}>learn more</div>
      </div>
    </div>
  );
}