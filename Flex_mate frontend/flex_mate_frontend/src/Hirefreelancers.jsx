import React, { useEffect, useState } from "react";
import "./Hirefreelancers.css"; // Import the CSS file

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    fetch("http://localhost:3000/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackData(data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  return (
    <div className="feedback-container">
      {feedbackData.map((feedback) => (
        <div key={feedback._id} className="feedback-card">
          <img
            src={feedback.pfp}
            alt={feedback.accountname}
            className="feedback-pfp"
          />
          <h3 className="feedback-accountname">{feedback.accountname}</h3>
          <p className="feedback-text">{feedback.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default Feedback;