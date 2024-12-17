import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getResults, createResult } from '../services/resultService.ts';
import LoadingSpinner from '../components/LoadingSpinner';
import { Flag } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Results({ user }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        fetchResults();
    }, []);
    const fetchResults = async () => {
        try {
            const data = await getResults();
            setResults(data);
        }
        catch (error) {
            toast.error('Failed to fetch results');
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
            const newResult = {
                trackId: Number(formData.get('trackId')),
                date: formData.get('date'),
                results: [
                    {
                        carNumber: Number(formData.get('carNumber1')),
                        position: Number(formData.get('position1')),
                        points: Number(formData.get('points1')),
                    },
                    {
                        carNumber: Number(formData.get('carNumber2')),
                        position: Number(formData.get('position2')),
                        points: Number(formData.get('points2')),
                    },
                    {
                        carNumber: Number(formData.get('carNumber3')),
                        position: Number(formData.get('position3')),
                        points: Number(formData.get('points3')),
                    },
                ],
            };
            await createResult(newResult);
            toast.success('Result created successfully');
            fetchResults();
            setShowForm(false);
        }
        catch (error) {
            toast.error('Failed to create result');
        }
    };
    if (loading)
        return _jsx(LoadingSpinner, {});
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6 mt-20", children: [_jsxs("h1", { className: "text-3xl font-bold flex items-center gap-2", children: [_jsx(Flag, { className: "text-red-600" }), "Race Results"] }), user && (_jsx("button", { onClick: () => setShowForm(!showForm), className: "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700", children: showForm ? 'Cancel' : 'Add Result' }))] }), showForm && (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Track ID" }), _jsx("input", { type: "number", name: "trackId", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Date" }), _jsx("input", { type: "date", name: "date", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), [1, 2, 3].map((position) => (_jsxs("div", { className: "col-span-2 grid grid-cols-3 gap-4 border-t pt-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Car Number" }), _jsx("input", { type: "number", name: `carNumber${position}`, required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Position" }), _jsx("input", { type: "number", name: `position${position}`, value: position, readOnly: true, className: "mt-1 block w-full rounded-md border-gray-300 bg-gray-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Points" }), _jsx("input", { type: "number", name: `points${position}`, required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] })] }, position)))] }), _jsx("div", { className: "mt-4", children: _jsx("button", { type: "submit", className: "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700", children: "Create Result" }) })] })), _jsx("div", { className: "space-y-6", children: results.map((result) => (_jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: "Race Results" }), _jsxs("p", { className: "text-gray-600 mb-4", children: ["Track ID: ", result.trackId, " | Date: ", new Date(result.date).toLocaleDateString()] }), _jsx("div", { className: "space-y-4", children: result.results.map((raceResult, index) => (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { className: "font-bold text-lg", children: raceResult.position }), _jsxs("span", { children: ["Car #", raceResult.carNumber] }), _jsxs("span", { className: "text-gray-600", children: [raceResult.points, " points"] })] }, index))) })] }) }, result.id))) })] }));
}
