import React, { useState, useEffect } from 'react';
import { flashcardService } from '../services/api';

// Simple component to display a single flashcard (summary or question)
const Flashcard = ({ item, type }) => (
    <div style={styles.flashcard}>
        {type === 'summary' && (
            <>
                <strong style={styles.title}>{item.title}</strong>
                <span style={styles.time}> ({item.estimatedTime})</span>
                <p style={styles.content}>{item.summary}</p>
            </>
        )}
        {type === 'question' && (
             <>
                <p style={styles.content}><strong>Q:</strong> {item.question}</p>
                <p style={styles.content}><strong>A:</strong> {item.answer}</p>
            </>
        )}
    </div>
);

// Component to display a single Set of flashcards
const FlashcardSetDisplay = ({ set, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = async () => {
        if (window.confirm(`Are you sure you want to delete the set for "${set.originalFileName || 'this file'}"?`)) {
             setIsDeleting(true);
             try {
                 await flashcardService.deleteFlashcardSet(set._id);
                 onDelete(set._id); // Notify parent component to remove from list
             } catch (error) {
                  console.error("Failed to delete set:", error);
                  alert(`Error deleting set: ${error.response?.data?.msg || error.message}`);
                  setIsDeleting(false);
             }
             // No need to setIsDeleting(false) on success as component will be removed
        }
    };

    return (
         <div style={styles.flashcardSet}>
            <div style={styles.setHeader}>
                 <h3>Set from: {set.originalFileName || 'Unknown File'}</h3>
                 <button
                     onClick={handleDeleteClick}
                     disabled={isDeleting}
                     style={styles.deleteButton}
                     title="Delete this set"
                  >
                     {isDeleting ? 'Deleting...' : '🗑️'}
                 </button>
            </div>

            <p style={styles.date}><i>Created: {new Date(set.createdAt).toLocaleString()}</i></p>

            <div style={styles.section}>
                <h4>Summaries ({set.summaries?.length || 0})</h4>
                {set.summaries && set.summaries.length > 0 ? (
                    set.summaries.map((summary, index) => (
                        <Flashcard key={`sum-${set._id}-${index}`} item={summary} type="summary" />
                    ))
                ) : <p>No summaries in this set.</p>}
            </div>

            <div style={styles.section}>
                <h4>Questions ({set.questions?.length || 0})</h4>
                {set.questions && set.questions.length > 0 ? (
                     set.questions.map((question, index) => (
                        <Flashcard key={`q-${set._id}-${index}`} item={question} type="question" />
                    ))
                 ) : <p>No questions in this set.</p>}
             </div>
        </div>
    );
};


// Main component to fetch and display all sets
function FlashcardList({ refreshTrigger }) {
    const [sets, setSets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to fetch sets
    const loadSets = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await flashcardService.getMyFlashcardSets();
            if (response.success) {
                 setSets(response.data);
            } else {
                 throw new Error(response.msg || 'Failed to fetch data');
            }
        } catch (err) {
             console.error("Failed to fetch flashcard sets:", err);
             const errMsg = err.response?.data?.msg || err.message || 'Failed to load flashcard sets.';
             setError(errMsg);
             // If unauthorized, AuthContext might handle redirect, or handle here
             if (err.response?.status === 401) {
                setError('Session expired or invalid. Please log in again.');
                // Consider triggering logout from context here
             }
        } finally {
            setIsLoading(false);
        }
    };


    // useEffect to load sets on mount and when refreshTrigger changes
    useEffect(() => {
        console.log("FlashcardList: Triggering fetch.");
        loadSets();
    }, [refreshTrigger]); // Dependency array includes refreshTrigger

     // Function to handle deletion callback from FlashcardSetDisplay
     const handleSetDeleted = (deletedSetId) => {
         setSets(currentSets => currentSets.filter(set => set._id !== deletedSetId));
     };

    return (
        <div style={styles.listContainer}>
            <h3>Your Generated Flashcard Sets</h3>
            {isLoading && <p>Loading flashcards...</p>}
            {error && <p style={styles.errorMessage}>Error: {error}</p>}
            {!isLoading && !error && sets.length === 0 && (
                <p>No flashcard sets found. Upload a PDF above to generate some!</p>
            )}
            {!isLoading && !error && sets.map(set => (
                 <FlashcardSetDisplay
                     key={set._id}
                     set={set}
                     onDelete={handleSetDeleted} // Pass deletion handler
                 />
            ))}
        </div>
    );
}

// Basic inline styles
const styles = {
    listContainer: {
        marginTop: '20px',
    },
    flashcardSet: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '20px 0',
        padding: '15px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
     setHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginBottom: '10px',
    },
    deleteButton: {
        background: 'none',
        border: '1px solid #ff4d4d',
        color: '#ff4d4d',
        cursor: 'pointer',
        padding: '5px 8px',
        borderRadius: '4px',
        fontSize: '0.9em',
        transition: 'background-color 0.2s ease, color 0.2s ease',
    },
    // Simulate hover/disabled via JS (better with CSS classes)
    // deleteButton[':hover'] = { backgroundColor: '#ff4d4d', color: '#fff' };
    // deleteButton[':disabled'] = { opacity: 0.6, cursor: 'not-allowed' };
    date: {
        fontSize: '0.85em',
        color: '#666',
        marginBottom: '15px',
    },
    section: {
        marginBottom: '15px',
    },
    flashcard: {
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
        margin: '10px 0',
        padding: '10px 15px',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: '0.9em',
        color: '#555',
        marginLeft: '5px',
    },
    content: {
        marginTop: '5px',
        color: '#444',
        lineHeight: '1.5',
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
    }
};

export default FlashcardList;