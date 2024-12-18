import { useState, useEffect } from 'react';
import { getDrivers, deleteDriver } from '../services/driverService.ts';
import { Driver, User } from '../models';
import LoadingSpinner from '../components/LoadingSpinner';
import {Users, Trash2, SquarePen} from 'lucide-react';
import toast from 'react-hot-toast';
import DriverFormModal from '../components/Forms/DriverFormModal.tsx';

interface DriversProps {
    user: User | null;
}

export default function Drivers({ user }: DriversProps) {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

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

    const handleFormSubmit = async (updatedDriver) => {
        setShowForm(false);
        await fetchDrivers();
    };

    const handleUpdate = (driverId) => {
        const driverToEdit = drivers.find((d) => d.id === driverId); // Example driver lookup
        setSelectedDriver(driverToEdit);
        setShowForm(true);
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

            <DriverFormModal
                showForm={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleFormSubmit}
                driver={selectedDriver}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map((driver) => (
                    <div key={driver.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold mb-2">{`${driver.firstName} ${driver.lastName}`}</h3>
                                {user && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleDelete(driver.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowForm(!showForm)
                                                handleUpdate(driver.id)
                                            }
                                        }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <SquarePen size={20} />
                                        </button>
                                    </div>
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