import { useState, useEffect } from 'react';
import { getTracks, createTrack } from '../services/trackService.ts';
import { Track, User } from '../models';
import LoadingSpinner from '../components/LoadingSpinner';
import { MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface TracksProps {
    user: User | null;
}

export default function Tracks({ user }: TracksProps) {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchTracks();
    }, []);

    const fetchTracks = async () => {
        try {
            const data = await getTracks();
            setTracks(data);
        } catch (error) {
            toast.error('Failed to fetch tracks');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const newTrack = {
                trackName: formData.get('trackName') as string,
                location: formData.get('location') as string,
                country: formData.get('country') as string,
                trackLengthKm: Number(formData.get('trackLengthKm')),
                numberOfTurns: Number(formData.get('numberOfTurns')),
            };

            await createTrack(newTrack);
            toast.success('Track created successfully');
            fetchTracks();
            setShowForm(false);
        } catch (error) {
            toast.error('Failed to create track');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 mt-20">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <MapPin className="text-red-600" />
                    F1 Tracks
                </h1>
                {user && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        {showForm ? 'Cancel' : 'Add Track'}
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Track Name</label>
                            <input
                                type="text"
                                name="trackName"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <input
                                type="text"
                                name="country"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Track Length (km)</label>
                            <input
                                type="number"
                                step="0.001"
                                name="trackLengthKm"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Number of Turns</label>
                            <input
                                type="number"
                                name="numberOfTurns"
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
                            Create Track
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tracks.map((track) => (
                    <div key={track.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{track.trackName}</h3>
                            <p className="text-gray-600 mb-4">{`${track.location}, ${track.country}`}</p>
                            <div className="space-y-2">
                                <p><strong>Length:</strong> {track.trackLengthKm} km</p>
                                <p><strong>Turns:</strong> {track.numberOfTurns}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}