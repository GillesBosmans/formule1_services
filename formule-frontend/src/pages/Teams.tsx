import { useState, useEffect } from 'react';
import { getTeams, createTeam } from '../services/teamService.ts';
import { Team, User } from '../models';
import LoadingSpinner from '../components/LoadingSpinner';
import { Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface TeamsProps {
    user: User | null;
}

export default function Teams({ user }: TeamsProps) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const data = await getTeams();
            setTeams(data);
        } catch (error) {
            toast.error('Failed to fetch teams');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const newTeam = {
                teamAbbreviation: formData.get('teamAbbreviation') as string,
                teamName: formData.get('teamName') as string,
                baseLocation: formData.get('baseLocation') as string,
                teamPrincipal: formData.get('teamPrincipal') as string,
                yearEstablished: Number(formData.get('yearEstablished')),
                championshipsWon: Number(formData.get('championshipsWon')),
            };

            await createTeam(newTeam);
            toast.success('Team created successfully');
            fetchTeams();
            setShowForm(false);
        } catch (error) {
            toast.error('Failed to create team');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 mt-20">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Building2 className="text-red-600" />
                    F1 Teams
                </h1>
                {user && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        {showForm ? 'Cancel' : 'Add Team'}
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Team Abbreviation</label>
                            <input
                                type="text"
                                name="teamAbbreviation"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Team Name</label>
                            <input
                                type="text"
                                name="teamName"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Base Location</label>
                            <input
                                type="text"
                                name="baseLocation"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Team Principal</label>
                            <input
                                type="text"
                                name="teamPrincipal"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Year Established</label>
                            <input
                                type="number"
                                name="yearEstablished"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Championships Won</label>
                            <input
                                type="number"
                                name="championshipsWon"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Create Team
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                    <div key={team.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{team.teamName}</h3>
                            <p className="text-gray-600 mb-4">{team.teamAbbreviation}</p>
                            <div className="space-y-2">
                                <p><strong>Base:</strong> {team.baseLocation}</p>
                                <p><strong>Principal:</strong> {team.teamPrincipal}</p>
                                <p><strong>Established:</strong> {team.yearEstablished}</p>
                                <p><strong>Championships:</strong> {team.championshipsWon}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}