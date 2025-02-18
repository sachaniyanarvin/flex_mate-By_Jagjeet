import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Login.css';
import parachute from './assets/parachute.png';

const Login = () => {
    const navigate = useNavigate();  // Initialize useNavigate

    return (
        <div className="main-card">
            <div className="login-page">
                <img src={parachute} alt="" className="login-image" />
                <div className="form">
                    <div className="welcome">Welcome To FlexMate</div>
                    <div className="create">Create Your Free Account</div>
                    <form>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Enter your Full Name here" />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your Email here" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Enter your Password here" />
                        </div>

                        <button type="submit" className="submit-btn">
                            Create Account
                        </button>
                    </form>
                    <div className="already">Already have an account?</div>
                    <div className="signin" onClick={() => navigate('/signin')} style={{ cursor: 'pointer', color: 'black' }}>
                        Sign In
                    </div>
                    <div className="or-l"></div>
                    <div className="or">OR</div>
                    <div className="or-r"></div>
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

export default Login;
