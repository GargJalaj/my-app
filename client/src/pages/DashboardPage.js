import React from 'react';
import UploadForm from '../components/UploadForm';
import { useAuth } from '../hooks/useAuth';

function DashboardPage() {
    const { user } = useAuth();
    
    const handleUploadSuccess = (newSetData) => {
        console.log("Dashboard: Upload successful!");
        // You might want to show a success message here
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            {user && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-700">Welcome back, {user.name}!</p>
                </div>
            )}
            
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Upload New Flashcards</h2>
                <UploadForm onUploadSuccess={handleUploadSuccess} />
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li className="mb-2">Upload your study materials as PDF, TXT, or DOCX files</li>
                    <li className="mb-2">Our AI will automatically generate flashcards from your content</li>
                    <li className="mb-2">Access your flashcards from the menu to start studying</li>
                    <li className="mb-2">Practice regularly for better retention</li>
                </ul>
            </div>
        </div>
    );
}

export default DashboardPage;