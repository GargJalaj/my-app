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
            <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Dashboard
            </h1>
            
            {user && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg shadow-sm">
                    <p className="text-blue-700 font-medium">Welcome back, {user.name}!</p>
                </div>
            )}
            
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload New Flashcards</h2>
                <UploadForm onUploadSuccess={handleUploadSuccess} />
            </div>
            
            <div className="mt-8 bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Tips</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-3">
                    <li>Upload your study materials as PDF, TXT, or DOCX files</li>
                    <li>Our AI will automatically generate flashcards from your content</li>
                    <li>Access your flashcards from the menu to start studying</li>
                    <li>Practice regularly for better retention</li>
                </ul>
            </div>

            
        </div>
    );
}

export default DashboardPage;