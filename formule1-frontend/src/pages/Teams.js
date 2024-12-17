import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getTeams, createTeam } from '../services/teamService.ts';
import LoadingSpinner from '../components/LoadingSpinner';
import { Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Teams({ user }) {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        fetchTeams();
    }, []);
    const fetchTeams = async () => {
        try {
            const data = await getTeams();
            setTeams(data);
        }
        catch (error) {
            toast.error('Failed to fetch teams');
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
            const newTeam = {
                teamAbbreviation: formData.get('teamAbbreviation'),
                teamName: formData.get('teamName'),
                baseLocation: formData.get('baseLocation'),
                teamPrincipal: formData.get('teamPrincipal'),
                yearEstablished: Number(formData.get('yearEstablished')),
                championshipsWon: Number(formData.get('championshipsWon')),
            };
            await createTeam(newTeam);
            toast.success('Team created successfully');
            fetchTeams();
            setShowForm(false);
        }
        catch (error) {
            toast.error('Failed to create team');
        }
    };
    if (loading)
        return _jsx(LoadingSpinner, {});
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6 mt-20", children: [_jsxs("h1", { className: "text-3xl font-bold flex items-center gap-2", children: [_jsx(Building2, { className: "text-red-600" }), "F1 Teams"] }), user && (_jsx("button", { onClick: () => setShowForm(!showForm), className: "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700", children: showForm ? 'Cancel' : 'Add Team' }))] }), showForm && (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Team Abbreviation" }), _jsx("input", { type: "text", name: "teamAbbreviation", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Team Name" }), _jsx("input", { type: "text", name: "teamName", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Base Location" }), _jsx("input", { type: "text", name: "baseLocation", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Team Principal" }), _jsx("input", { type: "text", name: "teamPrincipal", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Year Established" }), _jsx("input", { type: "number", name: "yearEstablished", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Championships Won" }), _jsx("input", { type: "number", name: "championshipsWon", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" })] })] }), _jsx("div", { className: "mt-4", children: _jsx("button", { type: "submit", className: "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700", children: "Create Team" }) })] })), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: teams.map((team) => (_jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: team.teamName }), _jsx("p", { className: "text-gray-600 mb-4", children: team.teamAbbreviation }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Base:" }), " ", team.baseLocation] }), _jsxs("p", { children: [_jsx("strong", { children: "Principal:" }), " ", team.teamPrincipal] }), _jsxs("p", { children: [_jsx("strong", { children: "Established:" }), " ", team.yearEstablished] }), _jsxs("p", { children: [_jsx("strong", { children: "Championships:" }), " ", team.championshipsWon] })] })] }) }, team.id))) })] }));
}
