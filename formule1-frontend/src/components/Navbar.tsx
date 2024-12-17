import { Trophy, Users, MapPin, Flag, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { User } from '../types';

interface NavbarProps {
    user: User | null | undefined;
    onLogout: () => void;
    onLoginSuccess: (response: any) => void;
    onLoginError: () => void;
}

export default function Navbar({ user, onLogout, onLoginSuccess, onLoginError }: NavbarProps) {
    return (
        <nav className="bg-red-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-12">
                        <Link to="/" className="font-bold text-2xl">F1 Manager</Link>
                        <div className="hidden md:flex space-x-8">
                            <Link to="/teams" className="flex items-center space-x-2 hover:text-gray-200 text-lg">
                                <Trophy size={24} />
                                <span>Teams</span>
                            </Link>
                            <Link to="/drivers" className="flex items-center space-x-2 hover:text-gray-200 text-lg">
                                <Users size={24} />
                                <span>Drivers</span>
                            </Link>
                            <Link to="/tracks" className="flex items-center space-x-2 hover:text-gray-200 text-lg">
                                <MapPin size={24} />
                                <span>Tracks</span>
                            </Link>
                            <Link to="/results" className="flex items-center space-x-2 hover:text-gray-200 text-lg">
                                <Flag size={24} />
                                <span>Results</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white" />
                                <span className="text-lg">{user.name}</span>
                                <button
                                    onClick={onLogout}
                                    className="flex items-center space-x-2 hover:text-gray-200 bg-red-700 px-4 py-2 rounded-md"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <GoogleLogin
                                    onSuccess={onLoginSuccess}
                                    onError={onLoginError}
                                    useOneTap
                                    theme="filled_black"
                                    shape="pill"
                                    size="large"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}