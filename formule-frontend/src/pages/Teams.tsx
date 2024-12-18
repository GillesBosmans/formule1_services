import { useState, useEffect } from 'react';
import { getTeams } from '../services/teamService.ts';
import {Team, User} from '../models';
import LoadingSpinner from '../components/LoadingSpinner';
import {Building2, SquarePen} from 'lucide-react';
import toast from 'react-hot-toast';
import TeamFormModal from '../components/Forms/TeamFormModal.tsx';

interface TeamsProps {
    user: User | null;
}

export default function Teams({ user }: TeamsProps) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

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

    const handleFormSubmit = async () => {
        setShowForm(false);
        await fetchTeams();
    };

    const handleUpdate = (teamId) => {
        const teamToEdit = teams.find((d) => d.id === teamId);
        setSelectedTeam(teamToEdit ?? null);
        setShowForm(true);
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

            <TeamFormModal
                showForm={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleFormSubmit}
                team={selectedTeam}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                    <div key={team.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold mb-2">{team.teamName}</h3>
                                {user && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setShowForm(!showForm)
                                                handleUpdate(team.id)
                                            }
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <SquarePen size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
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