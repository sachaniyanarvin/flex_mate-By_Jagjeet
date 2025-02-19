import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider } from "./firebase";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signInWithPopup
} from "firebase/auth";
import "./Login.css";
import parachute from "./assets/parachute.png";

const Login = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ showPassword, setShowPassword ] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store full name in Firebase Auth
            await updateProfile(user, { displayName: fullName });

            // Send email verification
            await sendEmailVerification(user);

            setMessage("Verification email sent! Please check your inbox.");
        } catch (error) {
            setError(error.message);
        }
    };

    // Google Sign-in
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            navigate("/explore"); // Redirect after login
        } catch (error) {
            setError(error.message);
        }
    };

    // GitHub Sign-in
    const handleGithubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            navigate("/explore"); // Redirect after login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="main-card">
            <div className="login-page">
                <img src={parachute} alt="" className="login-image" />
                <div className="form">
                    <div className="welcome">Welcome To FlexMate</div>
                    <div className="create">Create Your Free Account</div>

                    {/* Show error messages */}
                    {error && <p className="error">{error}</p>}
                    {message && <p className="success">{message}</p>}

                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your Full Name here"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your Email here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle input type
                                    placeholder="Enter your Password here"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="show-password-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"} {/* Toggle text */}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">
                            Create Account
                        </button>
                    </form>

                    <div className="already">Already have an account?</div>
                    <div className="signin" onClick={() => navigate("/signin")}>
                        Sign In
                    </div>
                    <div className="or-l"></div>
                    <div className="or">OR</div>
                    <div className="or-r"></div>
                    <div className="signin-options">
                        <div className="google" onClick={handleGoogleLogin}>
                            <img src={'https://cdn-icons-png.flaticon.com/128/300/300221.png'} alt="" id='google' />
                            <div className="google-text">Sign Up with Google</div>
                        </div>
                        <div className="github" onClick={handleGithubLogin}>
                            <img src={'https://cdn-icons-png.flaticon.com/128/2111/2111432.png'} alt="" id='github' />
                            <div className="github-text">Sign Up with GitHub</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
