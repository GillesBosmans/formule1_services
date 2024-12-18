import { useState, useEffect } from 'react';
import {createDriver, updateDriver} from '../../services/driverService.ts';
import toast from 'react-hot-toast';

function DriverFormModal({ showForm, onClose, onSubmit, driver }) {
    const [formData, setFormData] = useState({
        teamId: '',
        firstName: '',
        lastName: '',
        nationality: '',
        carNumber: '',
        championshipsWon: '',
    });

    useEffect(() => {
        if (driver) {
            setFormData(driver);
        }
    }, [driver]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            teamId: '',
            firstName: '',
            lastName: '',
            nationality: '',
            carNumber: '',
            championshipsWon: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (driver?.id) {
                const updatedDriver = await updateDriver(driver.id, formData);
                onSubmit(updatedDriver) ? toast.success('Driver updated successfully') && resetForm() : toast.error('Failed to update driver');
            } else {
                const newDriver = await createDriver(formData);
                onSubmit(newDriver) ? toast.success('Driver created successfully') && resetForm() : toast.error('Failed to create driver');
            }
            onClose();
        } catch (error) {
            console.error('Error saving driver:', error);
        }
    };

    if (!showForm) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">{driver ? 'Update Driver' : 'Create Driver'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['teamId', 'firstName', 'lastName', 'nationality', 'carNumber', 'championshipsWon'].map((field, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                                <input
                                    type={field.includes('Number') || field.includes('Won') ? 'number' : 'text'}
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
                            onClick={()=> {
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
                            {driver ? 'Update Driver' : 'Create Driver'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DriverFormModal;
