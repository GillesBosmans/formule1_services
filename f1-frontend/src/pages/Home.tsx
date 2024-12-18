import { User } from '../types';

interface HomesProps {
    user: User | null;
}

export default function Homes({ user }: HomesProps) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            {/* Title */}
            <div className="flex justify-center items-center mb-6 mt-20">
                <h1 className="text-4xl font-bold text-gray-800">
                    F1 Management
                </h1>
            </div>

            {/* Image */}
            <div className="flex justify-center items-center mb-6">
                <img 
                    src="/HaasVegas_Banner_Mobile.webp" 
                    alt="F1 Image"
                    className="w-80 h-80 object-cover rounded-lg shadow-xl"
                />
            </div>

            {/* Placeholder user info or content */}
            {user ? (
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Welcome, {user.name}!</h2>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Please log in to manage your F1 teams</h2>
                </div>
            )}
        </div>
    );
}
