import { useState, useEffect } from 'react';
import { getResults, createResult } from '../services/resultService.ts';
import { Result, User } from '../models';
import LoadingSpinner from '../components/LoadingSpinner';
import { Flag } from 'lucide-react';
import toast from 'react-hot-toast';

interface ResultsProps {
    user: User | null;
}

export default function Results({ user }: ResultsProps) {
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const data = await getResults();
            setResults(data);
        } catch (error) {
            toast.error('Failed to fetch results');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const newResult = {
                trackId: Number(formData.get('trackId')),
                date: formData.get('date') as string,
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
        } catch (error) {
            toast.error('Failed to create result');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 mt-20">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Flag className="text-red-600" />
                    Race Results
                </h1>
                {user && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        {showForm ? 'Cancel' : 'Add Result'}
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Track ID</label>
                            <input
                                type="number"
                                name="trackId"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>

                        {/* Top 3 Results */}
                        {[1, 2, 3].map((position) => (
                            <div key={position} className="col-span-2 grid grid-cols-3 gap-4 border-t pt-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Car Number</label>
                                    <input
                                        type="number"
                                        name={`carNumber${position}`}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Position</label>
                                    <input
                                        type="number"
                                        name={`position${position}`}
                                        value={position}
                                        readOnly
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Points</label>
                                    <input
                                        type="number"
                                        name={`points${position}`}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Create Result
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-6">
                {results.map((result) => (
                    <div key={result.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Race Results {result.id}</h3>
                            <p className="text-gray-600 mb-4">
                                Track ID: {result.trackId} | Date: {new Date(result.date).toLocaleDateString()}
                            </p>
                            <div className="space-y-4">
                                {result.results.map((raceResult, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <span className="font-bold text-lg">{raceResult.position}</span>
                                        <span>Car #{raceResult.carNumber}</span>
                                        <span className="text-gray-600">{raceResult.points} points</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}