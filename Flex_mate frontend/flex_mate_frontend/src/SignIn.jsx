import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './SignIn.css';
import parachute from './assets/parachute.png';

const SignIn = () => {
    const navigate = useNavigate();  // Initialize useNavigate

    return (
        <div className="main-card">
            <div className="login-page">
                <img src={parachute} alt="" className="login-image" />
                <div className="form">
                    <div className="welcome">Welcome To FlexMate</div>
                    <div className="create">Sign In to your Account</div>
                    <form>
                        <div className="form-group-1">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your Email here" />
                        </div>

                        <div className="form-group-1">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your Password here" />
                        </div>

                        <button type="submit" className="submit-btn-1">
                            Sign In
                        </button>
                    </form>
                    <div className="already-1">Don't have an account?</div>
                    <div className="signup" onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'black' }}>
                        Sign Up
                    </div>
                    <div className="or-l-1"></div>
                    <div className="or-1">OR</div>
                    <div className="or-r-1"></div>
                    <div className="signin-options">
                        <div className="google">
                            <img src={'https://cdn-icons-png.flaticon.com/128/300/300221.png'} alt="" id='google' />
                            <div className="google-text">Sign In with Google</div>
                        </div>
                        <div className="github">
                            <img src={'https://cdn-icons-png.flaticon.com/128/2111/2111432.png'} alt="" id='github' />
                            <div className="github-text">Sign In with Github</div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
