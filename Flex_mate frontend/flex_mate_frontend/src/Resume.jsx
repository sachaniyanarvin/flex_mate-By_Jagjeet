import React, { useEffect, useState } from "react";
import "./Resume.css"; // Import the CSS file

const Resume = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/resume")
      .then((response) => response.json())
      .then((json) => setData(json[0])) // Assuming it's an array with one object
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="resume-container">
      {/* Profile Section */}
      <div className="profile">
        <img src={data.YourImageLink} alt={data.YourName} className="profile-img" />
        <h1 className="profile-name">{data.YourName}</h1>
        <h2 className="profile-position">{data.YourPosition}</h2>
        <p className="profile-description">{data.PersonalProfile}</p>
      </div>

      {/* Contact Info */}
      <div className="card">
        <h3>Contact</h3>
        <p><strong>Phone:</strong> {data.PhoneNumber}</p>
        <p><strong>Email:</strong> {data.Email}</p>
        <p><strong>Location:</strong> {data.Address}</p>
      </div>

      {/* Skills & Experience */}
      <div className="card">
        <h3>Skills & Experience</h3>
        <p>{data.SkillsAndExperience.replace(/\(\d+\)/g, "").split("( )").join("\n")}</p>
      </div>

      {/* Education */}
      <div className="card">
        <h3>Education</h3>
        <p><strong>Current:</strong> {data.Current}</p>
        <p><strong>Higher Secondary:</strong> {data.HigherSecondaryCertification}</p>
        <p><strong>Secondary:</strong> {data.SecondaryCertification}</p>
      </div>

      {/* Projects */}
      <div className="card">
        <h3>Projects</h3>
        <ul>
          {data.Projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resume;
