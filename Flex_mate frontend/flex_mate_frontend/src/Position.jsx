import React from 'react';
import './Position.css';
import bag from './assets/bag.png';
import freelancer from './assets/freelancer.png';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="p-container">
      <h1 className="title-1">Welcome to FlexMate!!</h1>
      <div className="cards-container">
        <div className="card" onClick={() => navigate("/explore")}>
          <img src={bag} alt="" className="bag-and-freelancer" />
          <h2>Hirer</h2>
          <p>Hirer simplifies recruitment by connecting companies with top talent efficiently.</p>
        </div>
        <div className="card">
          <img src={freelancer} alt="" className="bag-and-freelancer" />
          <h2>Freelancer</h2>
          <p>Freelancer connects professionals with clients for seamless work opportunities.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
