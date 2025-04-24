import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BookOpen, Brain, Zap, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Learning Supercharged with AI
              </h1>
              <p className="text-xl mb-8">
                Create intelligent flashcards that adapt to your learning style and help you remember information more effectively.
              </p>
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg inline-flex items-center"
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup" 
                    className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/login" 
                    className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-6 rounded-lg"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
                <div className="bg-blue-50 p-6 rounded-md">
                  <div className="font-bold mb-2 text-blue-800">Sample Flashcard</div>
                  <div className="text-gray-800 mb-4">What is spaced repetition?</div>
                  <div className="border-t border-gray-200 pt-3 text-gray-600">
                    A learning technique that incorporates increasing intervals of time between review of previously learned material.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Supercharge Your Learning
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">AI-Powered</h3>
              <p className="text-gray-600 text-center">
                Our smart algorithms adapt to your learning style and help identify areas where you need more practice.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Fast Creation</h3>
              <p className="text-gray-600 text-center">
                Instantly generate effective flashcards from your notes, textbooks, or any study material.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Better Retention</h3>
              <p className="text-gray-600 text-center">
                Our spaced repetition system ensures you review cards at the optimal time for maximum retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your learning?</h2>
          <p className="text-xl mb-8">
            Join thousands of students who've improved their grades with AI Flashcards.
          </p>
          {user ? (
            <Link 
              to="/dashboard" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg inline-flex items-center"
            >
              Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg"
            >
              Get Started for Free
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">AI Flashcards</h3>
              <p className="text-sm mt-1">© 2025 AI Flashcards. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">About</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}