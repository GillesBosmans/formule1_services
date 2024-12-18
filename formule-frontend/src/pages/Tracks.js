import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getTracks, createTrack } from '../services/trackService.ts';
import LoadingSpinner from '../components/LoadingSpinner';
import { MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Tracks({ user }) {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        fetchTracks();
    }, []);
    const fetchTracks = async () => {
        try {
            const data = await getTracks();
            setTracks(data);
        }
        catch (error) {
            toast.error('Failed to fetch tracks');
        }
        finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        try {
            const newTrack = {
                trackName: formData.get('trackName'),
                location: formData.get('location'),
                country: formData.get('country'),
                trackLengthKm: Number(formData.get('trackLengthKm')),
                numberOfTurns: Number(formData.get('numberOfTurns')),
            };
            await createTrack(newTrack);
            toast.success('Track created successfully');
            fetchTracks();
            setShowForm(false);
        }
        catch (error) {
            toast.error('Failed to create track');
        }
    };
    if (loading)
        return _jsx(LoadingSpinner, {});
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6 mt-20", children: [_jsxs("h1", { className: "text-3xl font-bold flex items-center gap-2", children: [_jsx(MapPin, { className: "text-red-600" }), "F1 Tracks"] }), user && (_jsx("button", { onClick: () => setShowForm(!showForm), className: "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700", children: showForm ? 'Cancel' : 'Add Track' }))] }), showForm && (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Track Name" }), _jsx("input", { type: "text", name: "trackName", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Location" }), _jsx("input", { type: "text", name: "location", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Country" }), _jsx("input", { type: "text", name: "country", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Track Length (km)" }), _jsx("input", { type: "number", step: "0.001", name: "trackLengthKm", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Number of Turns" }), _jsx("input", { type: "number", name: "numberOfTurns", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] })] }), _jsx("div", { className: "mt-4", children: _jsx("button", { type: "submit", className: "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700", children: "Create Track" }) })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: tracks.map((track) => (_jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: track.trackName }), _jsx("p", { className: "text-gray-600 mb-4", children: `${track.location}, ${track.country}` }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Length:" }), " ", track.trackLengthKm, " km"] }), _jsxs("p", { children: [_jsx("strong", { children: "Turns:" }), " ", track.numberOfTurns] })] })] }) }, track.id))) })] }));
}
