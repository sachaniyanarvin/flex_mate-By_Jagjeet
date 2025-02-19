import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider 
} from "firebase/auth"; 
import { auth } from "./firebase"; // Firebase Auth instance
import "./SignIn.css";
import parachute from "./assets/parachute.png";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [error, setError] = useState("");

    // Google & GitHub Providers
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // Email/Password Sign-In
    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(""); 
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/explore"); 
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setError("Email or password is incorrect.");
            } else if (error.code === "auth/user-not-found") {
                setError("No account found with this email.");
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password, please try again.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    // Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/explore");
        } catch (error) {
            setError("Google Sign-In failed. Try again.");
        }
    };

    // GitHub Sign-In
    const handleGithubSignIn = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
            navigate("/explore");
        } catch (error) {
            setError("GitHub Sign-In failed. Try again.");
        }
    };

    return (
        <div className="main-card">
            <div className="login-page">
                <img src={parachute} alt="" className="login-image" />
                <div className="form">
                    <div className="welcome">Welcome To FlexMate</div>
                    <div className="create">Sign In to your Account</div>
                    <form onSubmit={handleSignIn}>
                        <div className="form-group-1">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your Email here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group-1">
                            <label>Password</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle input type
                                    placeholder="Enter your Password here"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="show-password-btn-1"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {error && <p className="error-message">{error}</p>} {/* Error message */}

                        <button type="submit" className="submit-btn-1">
                            Sign In
                        </button>
                    </form>
                    
                    <div className="already-1">Don't have an account?</div>
                    <div className="signup" onClick={() => navigate("/")} style={{ cursor: "pointer", color: "black" }}>
                        Sign Up
                    </div>

                    <div className="or-l-1"></div>
                    <div className="or-1">OR</div>
                    <div className="or-r-1"></div>

                    {/* Google & GitHub Sign-In */}
                    <div className="signin-options">
                        <div className="google" onClick={handleGoogleSignIn} style={{ cursor: "pointer" }}>
                            <img src={'https://cdn-icons-png.flaticon.com/128/300/300221.png'} alt="" id='google' />
                            <div className="google-text">Sign In with Google</div>
                        </div>
                        <div className="github" onClick={handleGithubSignIn} style={{ cursor: "pointer" }}>
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
