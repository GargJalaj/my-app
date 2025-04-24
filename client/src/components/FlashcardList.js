import React, { useState, useEffect } from 'react';
import { flashcardService } from '../services/api';

// Flippable flashcard component with animation
const FlippableCard = ({ item, type }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`h-64 cursor-pointer perspective-1000 ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d">
        {/* Front side */}
        <div className={`absolute inset-0 flex flex-col justify-between p-6 rounded-xl shadow-md backface-hidden 
                        ${isFlipped ? 'rotate-y-180' : ''}
                        ${type === 'summary' 
                          ? 'bg-gradient-to-br from-blue-50 to-indigo-100' 
                          : 'bg-gradient-to-br from-emerald-50 to-teal-100'}`}>
          <div>
            {type === 'summary' ? (
              <h4 className="text-xl font-bold text-gray-800">{item.title}</h4>
            ) : (
              <div className="text-lg">
                <p className="font-medium text-gray-800">{item.question}</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>Click to flip</span>
          </div>
        </div>
        
        {/* Back side */}
        <div className={`absolute inset-0 flex flex-col justify-between p-6 rounded-xl shadow-md backface-hidden rotate-y-180
                        ${isFlipped ? 'rotate-y-0' : ''}
                        ${type === 'summary' 
                          ? 'bg-gradient-to-br from-violet-50 to-purple-100' 
                          : 'bg-gradient-to-br from-amber-50 to-orange-100'}`}>
          <div className="overflow-y-auto">
            {type === 'summary' ? (
              <div>
                <p className="text-gray-800">{item.summary}</p>
                <div className="mt-4 text-sm font-medium text-indigo-600">
                  Estimated time: {item.estimatedTime}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-800">{item.answer}</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to display a single Set of flashcards - for summaries only
const FlashcardSetDisplay = ({ set, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete the set for "${set.originalFileName || 'this file'}"?`)) {
      setIsDeleting(true);
      try {
        await flashcardService.deleteFlashcardSet(set._id);
        onDelete(set._id);
      } catch (error) {
        console.error("Failed to delete set:", error);
        alert(`Error deleting set: ${error.response?.data?.msg || error.message}`);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          <span className="text-indigo-600 mr-2">📚</span>
          {set.originalFileName || 'Unknown File'}
        </h3>
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
          title="Delete this set"
        >
          {isDeleting ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 italic mb-6 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Created: {new Date(set.createdAt).toLocaleString()}
      </p>

      <div className="mb-4">
        <h4 className="text-lg font-medium mb-4 text-gray-700 flex items-center">
          <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Summaries ({set.summaries?.length || 0})
        </h4>
        {set.summaries && set.summaries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {set.summaries.map((summary, index) => (
              <FlippableCard key={`sum-${set._id}-${index}`} item={summary} type="summary" />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p>No summaries in this set.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Component to display questions only
const QuestionSetDisplay = ({ set, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete the set for "${set.originalFileName || 'this file'}"?`)) {
      setIsDeleting(true);
      try {
        await flashcardService.deleteFlashcardSet(set._id);
        onDelete(set._id);
      } catch (error) {
        console.error("Failed to delete set:", error);
        alert(`Error deleting set: ${error.response?.data?.msg || error.message}`);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          <span className="text-emerald-600 mr-2">❓</span>
          {set.originalFileName || 'Unknown File'}
        </h3>
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
          title="Delete this set"
        >
          {isDeleting ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 italic mb-6 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Created: {new Date(set.createdAt).toLocaleString()}
      </p>

      <div className="mb-4">
        <h4 className="text-lg font-medium mb-4 text-gray-700 flex items-center">
          <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Questions ({set.questions?.length || 0})
        </h4>
        {set.questions && set.questions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {set.questions.map((question, index) => (
              <FlippableCard key={`q-${set._id}-${index}`} item={question} type="question" />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p>No questions in this set.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component - can now be used for either summaries or questions
function FlashcardList({ refreshTrigger, contentType = "summaries" }) {
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
      if (err.response?.status === 401) {
        setError('Session expired or invalid. Please log in again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to load sets on mount and when refreshTrigger changes
  useEffect(() => {
    console.log(`${contentType === "summaries" ? "Flashcards" : "Questions"}: Triggering fetch.`);
    loadSets();
  }, [refreshTrigger, contentType]); 

  // Function to handle deletion callback
  const handleSetDeleted = (deletedSetId) => {
    setSets(currentSets => currentSets.filter(set => set._id !== deletedSetId));
  };

  // Filter out sets with no content of desired type
  const filteredSets = sets.filter(set => {
    if (contentType === "summaries") {
      return set.summaries && set.summaries.length > 0;
    } else {
      return set.questions && set.questions.length > 0;
    }
  });

  return (
    <div className="mt-6">
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error: {error}</p>
            </div>
          </div>
        </div>
      )}
      
      {!isLoading && !error && filteredSets.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No {contentType} found</h3>
          <p className="mt-1 text-sm text-gray-500">Upload a PDF to generate some flashcards.</p>
        </div>
      )}
      
      {!isLoading && !error && filteredSets.map(set => (
        contentType === "summaries" ? (
          <FlashcardSetDisplay
            key={set._id}
            set={set}
            onDelete={handleSetDeleted}
          />
        ) : (
          <QuestionSetDisplay
            key={set._id}
            set={set}
            onDelete={handleSetDeleted}
          />
        )
      ))}
      
      {/* Global styles for 3D flipping effect */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
      `}</style>
    </div>
  );
}

export default FlashcardList;