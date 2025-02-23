import Navbar from './Navbar.jsx';
import Explore from './Explore.jsx';
import Hirefreelancers from './Hirefreelancers.jsx';
import Yourworks from './Yourworks.jsx';
import Workupdates from './Workupdates.jsx';
import Chatbox from './Vatchit.jsx';
import Portfolio from './Portfolio.jsx';
import Resume from './Resume.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './Login.jsx';
import SignIn from './SignIn.jsx';
import ProtectedRoute from './ProtectedRoute.js'; // Import ProtectedRoute
import Position from './Position.jsx';

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/SignIn", element: <SignIn /> },

    // 🔒 Protected Routes
    {
        path: "/explore",
        element: (
            <ProtectedRoute>
                <Navbar />
                <Explore />
            </ProtectedRoute>
        ),
    },
    {
        path: "/position",
        element: (
            <ProtectedRoute>
                <Position />
            </ProtectedRoute>
        ),
    },
    {
        path: "/hirefreelancers",
        element: (
            <ProtectedRoute>
                <Navbar />
                <Hirefreelancers />
            </ProtectedRoute>
        ),
    },
    {
        path: "/workupdates",
        element: (
            <ProtectedRoute>
                <Navbar />
                <Workupdates />
            </ProtectedRoute>
        ),
    },
    {
        path: "/yourworks",
        element: (
            <ProtectedRoute>
                <Navbar />
                <Yourworks />
            </ProtectedRoute>
        ),
    },
    {
        path: "/chatbox",
        element: (
            <ProtectedRoute>
                <Navbar />
                <Chatbox />
            </ProtectedRoute>
        ),
    },
    {
        path: "/portfolio",
        element: (
            <ProtectedRoute>
                <Navbar />
                <Portfolio />
            </ProtectedRoute>
        ),
    },
    {
        path: "/resume",
        element: (
            <ProtectedRoute>
                <Navbar />
                <Resume />
            </ProtectedRoute>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
