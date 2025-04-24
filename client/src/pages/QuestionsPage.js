import React, { useState } from 'react';
import FlashcardList from '../components/FlashcardList';
import { useAuth } from '../hooks/useAuth';

function QuestionsPage() {
    const { user } = useAuth();
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Practice Questions</h1>
                <button 
                    onClick={handleRefresh}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Refresh
                </button>
            </div>
            
            {/* Pass "questions" as the contentType prop */}
            <FlashcardList 
                refreshTrigger={refreshKey} 
                contentType="questions"
            />
        </div>
    );
}

export default QuestionsPage;