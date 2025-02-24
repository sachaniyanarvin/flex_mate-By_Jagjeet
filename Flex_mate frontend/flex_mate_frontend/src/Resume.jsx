import React, { useEffect, useState } from "react";
import "./Resume.css";

const Resume = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/resume")
      .then((response) => response.json())
      .then((json) => setData(json[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <div className="resume-navbar"></div>
      <img src={data.YourImageLink} alt="Profile" className="resume-pfp" />
      <div className="f-name">{data.YourName.split(" ")[0]}</div>
      <div className="l-name">{data.YourName.split(" ")[1]}</div>
      <div className="personal-profile"><i>Personal Profile</i></div>
      <div className="blue-line"></div>
      <div className="personal-profile-text">{data.PersonalProfile}</div>
      
      <div className="contact-details"><i>Contact Details</i></div>
      <div className="blue-line-3"></div>
      <div className="personal-profile-text">{data.PhoneNumber}</div>
      <div className="personal-profile-text">{data.Email}</div>
      <div className="personal-profile-text">{data.Address}</div>
      
      <div className="contact-details">Skills and Experience</div>
      <div className="blue-line-3"></div>
      <div className="personal-profile-text">
        {data.SkillsAndExperience.split("(").map((skill, index) => (
          skill.trim() && <div key={index}>{skill.replace(")", "").trim()}</div>
        ))}
      </div>
      
      <div className="straight-line"></div>
      <div className="Educational-History"><i>Educational History</i></div>
      <div className="blue-line-4"></div>
      <div className="Educational-History-text-1">{data.Current}</div>
      <div className="Educational-History-text-1">{data.HigherSecondaryCertification}</div>
      <div className="Educational-History-text-1">{data.SecondaryCertification}</div>
      
      <div className="known-frameworks">Projects</div>
      <div className="blue-line-4"></div>
      {data.Projects.map((project, index) => (
        <div className="Edcuational-History-text-1-sub" key={index}>{project}</div>
      ))}
    </div>
  );
};

export default Resume;
