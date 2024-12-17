import {useEffect, useState } from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import {Toaster} from 'react-hot-toast';
import Teams from './pages/Teams';
import Drivers from './pages/Drivers';
import Tracks from './pages/Tracks';
import Results from './pages/Results';
import { User } from './types';

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: User = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    const handleLoginSuccess = (credentialResponse: any) => {
        const token = credentialResponse.credential;
        const decoded: User = jwtDecode(token);
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

    return (
        <GoogleOAuthProvider clientId="204021911010-tkmdmuaf9c6125evkqp8vh3v5nuemc9q.apps.googleusercontent.com">
            <BrowserRouter>
                    <Navbar
                        user={user}
                        onLogout={handleLogout}
                        onLoginSuccess={handleLoginSuccess}
                        onLoginError={handleLoginError}
                    />
                    <main>
                        <Routes>
                            <Route path="/teams" element={<Teams user={user} />} />
                            <Route path="/drivers" element={<Drivers user={user} />} />
                            <Route path="/tracks" element={<Tracks user={user} />} />
                            <Route path="/results" element={<Results user={user} />} />
                            <Route path="/" element={<Teams user={user} />} />
                        </Routes>
                    </main>
                    <Toaster position="top-right" />
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App
