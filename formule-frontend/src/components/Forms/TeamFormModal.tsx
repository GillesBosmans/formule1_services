import { useState, useEffect } from 'react';
import { createTeam, updateTeam } from '../../services/teamService.ts';
import toast from 'react-hot-toast';

function TeamFormModal({ showForm, onClose, onSubmit, team }) {
    const [formData, setFormData] = useState({
        teamAbbreviation: '',
        teamName: '',
        baseLocation: '',
        teamPrincipal: '',
        yearEstablished: '',
        championshipsWon: '',
    });

    useEffect(() => {
        if (team) {
            setFormData(team);
        }
    }, [team]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            teamAbbreviation: '',
            teamName: '',
            baseLocation: '',
            teamPrincipal: '',
            yearEstablished: '',
            championshipsWon: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (team?.id) {
                const updatedTeam = await updateTeam(team.id, formData);
                onSubmit(updatedTeam) ? toast.success('Team updated successfully') && resetForm() : toast.error('Failed to update team');
            } else {
                const newTeam = await createTeam(formData);
                onSubmit(newTeam) ? toast.success('Team created successfully') && resetForm() : toast.error('Failed to create team');

            }
            onClose();
        } catch (error) {
            console.error('Error saving team:', error);
        }
    };

    if (!showForm) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">{team ? 'Update Team' : 'Create Team'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['teamAbbreviation', 'teamName', 'baseLocation', 'teamPrincipal', 'yearEstablished', 'championshipsWon'].map((field, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                                <input
                                    type={field.includes('yearEstablished') || field.includes('championshipsWon') ? 'number' : 'text'}
                                    name={field}
                                    value={formData[field] || ''}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            {team ? 'Update Team' : 'Create Team'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TeamFormModal;
