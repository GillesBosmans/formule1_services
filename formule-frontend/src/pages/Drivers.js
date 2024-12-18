import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getDrivers, createDriver, deleteDriver } from '../services/driverService.ts';
import LoadingSpinner from '../components/LoadingSpinner';
import { Users, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Drivers({ user }) {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        fetchDrivers();
    }, []);
    const fetchDrivers = async () => {
        try {
            const data = await getDrivers();
            setDrivers(data);
        }
        catch (error) {
            toast.error('Failed to fetch drivers');
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
            const newDriver = {
                teamId: formData.get('teamId'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                nationality: formData.get('nationality'),
                carNumber: Number(formData.get('carNumber')),
                championshipsWon: Number(formData.get('championshipsWon')),
            };
            await createDriver(newDriver);
            toast.success('Driver created successfully');
            await fetchDrivers();
            setShowForm(false);
        }
        catch (error) {
            toast.error('Failed to create driver');
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this driver?'))
            return;
        try {
            await deleteDriver(id);
            toast.success('Driver deleted successfully');
            await fetchDrivers();
        }
        catch (error) {
            toast.error('Failed to delete driver');
        }
    };
    if (loading)
        return _jsx(LoadingSpinner, {});
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6 mt-20", children: [_jsxs("h1", { className: "text-3xl font-bold flex items-center gap-2", children: [_jsx(Users, { className: "text-red-600" }), "F1 Drivers"] }), user && (_jsx("button", { onClick: () => setShowForm(!showForm), className: "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700", children: showForm ? 'Cancel' : 'Add Driver' }))] }), showForm && (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Team ID" }), _jsx("input", { type: "text", name: "teamId", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "First Name" }), _jsx("input", { type: "text", name: "firstName", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Last Name" }), _jsx("input", { type: "text", name: "lastName", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Nationality" }), _jsx("input", { type: "text", name: "nationality", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Car Number" }), _jsx("input", { type: "number", name: "carNumber", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Championships Won" }), _jsx("input", { type: "number", name: "championshipsWon", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] })] }), _jsx("div", { className: "mt-4", children: _jsx("button", { type: "submit", className: "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700", children: "Create Driver" }) })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: drivers.map((driver) => (_jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: `${driver.firstName} ${driver.lastName}` }), user && (_jsx("button", { onClick: () => handleDelete(driver.id), className: "text-red-600 hover:text-red-700", children: _jsx(Trash2, { size: 20 }) }))] }), _jsxs("p", { className: "text-gray-600 mb-4", children: ["#", driver.carNumber] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Team:" }), " ", driver.teamId] }), _jsxs("p", { children: [_jsx("strong", { children: "Nationality:" }), " ", driver.nationality] }), _jsxs("p", { children: [_jsx("strong", { children: "Championships:" }), " ", driver.championshipsWon] })] })] }) }, driver.id))) })] }));
}
