import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import { Toaster } from 'react-hot-toast';
import Teams from './pages/Teams';
import Drivers from './pages/Drivers';
import Tracks from './pages/Tracks';
import Results from './pages/Results';
function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);
    const handleLoginSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token);
        setUser(decoded);
        localStorage.setItem('token', token);
    };
    const handleLoginError = () => {
        console.log('Login Failed');
    };
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };
    return (_jsx(GoogleOAuthProvider, { clientId: "204021911010-tkmdmuaf9c6125evkqp8vh3v5nuemc9q.apps.googleusercontent.com", children: _jsxs(BrowserRouter, { children: [_jsx(Navbar, { user: user, onLogout: handleLogout, onLoginSuccess: handleLoginSuccess, onLoginError: handleLoginError }), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/teams", element: _jsx(Teams, { user: user }) }), _jsx(Route, { path: "/drivers", element: _jsx(Drivers, { user: user }) }), _jsx(Route, { path: "/tracks", element: _jsx(Tracks, { user: user }) }), _jsx(Route, { path: "/results", element: _jsx(Results, { user: user }) }), _jsx(Route, { path: "/", element: _jsx(Teams, { user: user }) })] }) }), _jsx(Toaster, { position: "top-right" })] }) }));
}
export default App;
