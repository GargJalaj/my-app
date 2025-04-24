import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import FlashcardList from '../components/FlashcardList';
import { useAuth } from '../hooks/useAuth'; // To display user info

function DashboardPage() {
    const { user } = useAuth(); // Get user info from context
    // State to trigger a refresh of the FlashcardList after a successful upload
    const [refreshKey, setRefreshKey] = useState(0);

    // Callback function passed to UploadForm
    const handleUploadSuccess = (newSetData) => {
        console.log("Dashboard: Upload successful, triggering list refresh.");
        // Increment the key. This change will be detected by FlashcardList's useEffect dependency array.
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div>
            {/* Optional: Display a welcome message */}
            {/* {user && <h2>Welcome back, {user.name}!</h2>} */}

            {/* File Upload Section */}
            <UploadForm onUploadSuccess={handleUploadSuccess} />

            <hr style={{ margin: '30px 0', borderColor: '#eee' }} />

            {/* Flashcard List Section */}
            {/* Pass the refreshKey as a prop */}
            <FlashcardList refreshTrigger={refreshKey} />
        </div>
    );
}

export default DashboardPage;