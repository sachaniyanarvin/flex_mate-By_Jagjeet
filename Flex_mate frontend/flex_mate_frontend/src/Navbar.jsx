import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.css'


const App = () => {
  return (
    <div>
      <nav className='nav'>
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="text" to="/explore">Explore</NavLink>
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="text" to="/hirefreelancers">Hire Freelancers</NavLink>
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="text" to="/workupdates">Work Updates</NavLink>
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="text" to="/yourworks">Your Works</NavLink>
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="text" to="/chatbox">Chatbox</NavLink>
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="text" to="/portfolio">Portfolio</NavLink>
        <NavLink className={(e) => { return e.isActive ? "blue" : "" }} id="text" to="/resume">Resume</NavLink>
      </nav>
    </div>
  )
}

export default App;
