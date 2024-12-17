import React, { useState, useEffect } from 'react';
import { getDrivers, createDriver, deleteDriver } from '../services/driverService.ts';
import { Driver, User } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { Users, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface DriversProps {
    user: User | null;
}

export default function Drivers({ user }: DriversProps) {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const data = await getDrivers();
            setDrivers(data);
        } catch (error) {
            toast.error('Failed to fetch drivers');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const newDriver = {
                teamId: formData.get('teamId') as string,
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                nationality: formData.get('nationality') as string,
                carNumber: Number(formData.get('carNumber')),
                championshipsWon: Number(formData.get('championshipsWon')),
            };

            await createDriver(newDriver);
            toast.success('Driver created successfully');
            await fetchDrivers();
            setShowForm(false);
        } catch (error) {
            toast.error('Failed to create driver');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this driver?')) return;

        try {
            await deleteDriver(id);
            toast.success('Driver deleted successfully');
            await fetchDrivers();
        } catch (error) {
            toast.error('Failed to delete driver');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 mt-20">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Users className="text-red-600" />
                    F1 Drivers
                </h1>
                {user && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        {showForm ? 'Cancel' : 'Add Driver'}
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Team ID</label>
                            <input
                                type="text"
                                name="teamId"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nationality</label>
                            <input
                                type="text"
                                name="nationality"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Car Number</label>
                            <input
                                type="number"
                                name="carNumber"
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
                            Create Driver
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map((driver) => (
                    <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold mb-2">{`${driver.firstName} ${driver.lastName}`}</h3>
                                {user && (
                                    <button
                                        onClick={() => handleDelete(driver.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-600 mb-4">#{driver.carNumber}</p>
                            <div className="space-y-2">
                                <p><strong>Team:</strong> {driver.teamId}</p>
                                <p><strong>Nationality:</strong> {driver.nationality}</p>
                                <p><strong>Championships:</strong> {driver.championshipsWon}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}