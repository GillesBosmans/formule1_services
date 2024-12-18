import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Trophy, Users, MapPin, Flag, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
export default function Navbar({ user, onLogout, onLoginSuccess, onLoginError }) {
    return (_jsx("nav", { className: "bg-red-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4", children: _jsxs("div", { className: "flex justify-between items-center h-20", children: [_jsxs("div", { className: "flex items-center space-x-12", children: [_jsx(Link, { to: "/", className: "font-bold text-2xl", children: "F1 Manager" }), _jsxs("div", { className: "hidden md:flex space-x-8", children: [_jsxs(Link, { to: "/teams", className: "flex items-center space-x-2 hover:text-gray-200 text-lg", children: [_jsx(Trophy, { size: 24 }), _jsx("span", { children: "Teams" })] }), _jsxs(Link, { to: "/drivers", className: "flex items-center space-x-2 hover:text-gray-200 text-lg", children: [_jsx(Users, { size: 24 }), _jsx("span", { children: "Drivers" })] }), _jsxs(Link, { to: "/tracks", className: "flex items-center space-x-2 hover:text-gray-200 text-lg", children: [_jsx(MapPin, { size: 24 }), _jsx("span", { children: "Tracks" })] }), _jsxs(Link, { to: "/results", className: "flex items-center space-x-2 hover:text-gray-200 text-lg", children: [_jsx(Flag, { size: 24 }), _jsx("span", { children: "Results" })] })] })] }), _jsx("div", { className: "flex items-center space-x-4", children: user ? (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("img", { src: user.picture, alt: user.name, className: "w-10 h-10 rounded-full border-2 border-white" }), _jsx("span", { className: "text-lg", children: user.name }), _jsxs("button", { onClick: onLogout, className: "flex items-center space-x-2 hover:text-gray-200 bg-red-700 px-4 py-2 rounded-md", children: [_jsx(LogOut, { size: 20 }), _jsx("span", { children: "Logout" })] })] })) : (_jsx("div", { className: "flex items-center", children: _jsx(GoogleLogin, { onSuccess: onLoginSuccess, onError: onLoginError, useOneTap: true, theme: "filled_black", shape: "pill", size: "large" }) })) })] }) }) }));
}