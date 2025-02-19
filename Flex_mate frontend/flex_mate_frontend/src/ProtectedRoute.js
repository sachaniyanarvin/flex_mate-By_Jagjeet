import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase"; // Ensure correct import

const ProtectedRoute = ({ children }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    if (loading) {
        return  1;
    }

    return children;
};

export default ProtectedRoute;
