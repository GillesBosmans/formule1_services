import {useEffect, useState} from 'react';
import './App.css';
import {User} from './models/index.ts';
import { jwtDecode } from "jwt-decode";
import {GoogleOAuthProvider} from '@react-oauth/google';
import {BrowserRouter, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import {Toaster} from 'react-hot-toast';
import { Route } from 'react-router-dom';
import Teams from './pages/Teams.tsx';
import Drivers from './pages/Drivers.tsx';
import Tracks from './pages/Tracks.tsx';
import Results from './pages/Results.tsx';
import Home from './pages/Home.tsx';

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
                        <Route path="/" element={<Home user={user} />} />
                    </Routes>
                </main>
                <Toaster position="top-right" />
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
