import React, { useEffect, useState } from "react";
import "./Resume.css"; // Import the CSS file
import phone from './assets/phone.png';

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
    <div>
      <div className="resume-navbar"></div>
      <img src="https://rainbow-kulfi-db2a6d.netlify.app/assets/1.jpg" alt="" className="resume-pfp" />
      <div className="f-name">JAGJEET</div>
      <div className="l-name">DANGAR</div>
      <div className="personal-profile"><i>Personal Profile</i></div>
      <div className="blue-line"></div>
      <div className="personal-profile-text">Creative and enthusiastic Frontend Developer with a solid
        background in crafting visually appealing and user-friendly
        web applications. Proficient in React.js and adept at
        leveraging modern frontend technologies to build scalable,
        responsive, and interactive interfaces. Experienced in turning
        design prototypes into pixel-perfect implementations,
        ensuring seamless functionality and exceptional user
        experiences. Passionate about clean code, performance
        optimization, and solving challenging problems to deliver
        innovative solutions. Committed to collaborating effectively
        and meeting project goals within deadlines.</div>
        <div className="blue-line-2"></div>
        <div className="contact-details"><i>Contact Details</i></div>
        <div className="blue-line-3"></div>
        <img src={{phone}} alt="" className="phone" />
    </div>
  );
};

export default Resume;
