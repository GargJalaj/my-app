import React, { useState } from 'react';
import FlashcardList from '../components/FlashcardList';
import { useAuth } from '../hooks/useAuth';

function Flashcards() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('summaries');

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header section with gradient */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Flashcards</h1>
              <p className="text-indigo-100">
                Interactive flashcards to help you remember what you've learned
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={handleRefresh}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs with subtle gradient */}
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl shadow-md mb-8">
          <nav className="flex">
            <button
              className={`relative px-6 py-4 text-sm font-medium rounded-tl-xl transition-all duration-200 ${
                activeTab === 'summaries'
                  ? 'text-indigo-700 bg-gradient-to-r from-indigo-50 to-indigo-100'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
              onClick={() => setActiveTab('summaries')}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Summaries
              </span>
              {activeTab === 'summaries' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              )}
            </button>
            <button
              className={`relative px-6 py-4 text-sm font-medium transition-all duration-200 ${
                activeTab === 'questions'
                  ? 'text-teal-700 bg-gradient-to-r from-teal-50 to-emerald-100'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
              }`}
              onClick={() => setActiveTab('questions')}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Practice Questions
              </span>
              {activeTab === 'questions' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500"></span>
              )}
            </button>
          </nav>
        </div>
        
        {/* Instructions card with gradient */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md mb-8 border border-blue-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">How to use flashcards</h3>
              <p className="mt-1 text-sm text-gray-600">
                Click on any card to flip it and reveal the content on the other side. Use these flashcards to test your knowledge and 
                strengthen your memory of key concepts.
              </p>
            </div>
          </div>
        </div>
        
        {/* Render the appropriate FlashcardList based on the active tab */}
        <FlashcardList 
          refreshTrigger={refreshKey} 
          contentType={activeTab}
        />
      </div>
    </div>
  );
}

export default Flashcards;