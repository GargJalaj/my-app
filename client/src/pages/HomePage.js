import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BookOpen, Brain, Zap, ArrowRight, Sparkles, Star, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section - Modern gradient with glassmorphism */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                <span className="flex items-center text-sm font-medium">
                  <Sparkles className="h-4 w-4 mr-2" /> AI-powered learning
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">Supercharged</span> with AI
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-lg">
                Create intelligent flashcards that adapt to your learning style and help you remember information more effectively.
              </p>
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="group bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-full inline-flex items-center shadow-lg shadow-indigo-600/20 transition-all duration-300"
                >
                  Go to Dashboard 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup" 
                    className="group bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-full inline-flex items-center shadow-lg shadow-indigo-600/20 transition-all duration-300"
                  >
                    Get Started
                    <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/login" 
                    className="group bg-transparent border border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-full backdrop-blur-sm transition-all duration-300"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -z-10 -left-6 -top-6 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full blur-xl opacity-50"></div>
                <div className="absolute -z-10 -right-4 -bottom-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur-xl opacity-50"></div>
                
                {/* Card */}
                <div className="bg-white backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-5 max-w-md rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-bold text-indigo-800">Sample Flashcard</div>
                      <Star className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="text-gray-800 mb-6 text-lg font-medium">What is spaced repetition?</div>
                    <div className="border-t border-indigo-100 pt-4 text-gray-600">
                      A learning technique that incorporates increasing intervals of time between review of previously learned material.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Glass cards with gradients */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50 to-white"></div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full blur-3xl opacity-20 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-gradient-to-tr from-amber-200 to-pink-200 rounded-full blur-3xl opacity-20 translate-y-1/3"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
              <span className="text-sm font-medium">Why choose us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Supercharge Your Learning Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered flashcard system adapts to your learning habits and helps you achieve better results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl shadow-lg border border-indigo-100/50 hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/40 group-hover:scale-110 transition-all duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">AI-Powered Learning</h3>
              <p className="text-gray-600 text-center">
                Our smart algorithms adapt to your learning style and help identify areas where you need more practice.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-lg border border-purple-100/50 hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/40 group-hover:scale-110 transition-all duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">Fast Creation</h3>
              <p className="text-gray-600 text-center">
                Instantly generate effective flashcards from your notes, textbooks, or any study material.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-lg border border-amber-100/50 hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/40 group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">Better Retention</h3>
              <p className="text-gray-600 text-center">
                Our spaced repetition system ensures you review cards at the optimal time for maximum retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Stats Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-y border-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">98%</div>
              <p className="text-gray-600">of users report improved test scores</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">50%</div>
              <p className="text-gray-600">less study time needed</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600 mb-2">10x</div>
              <p className="text-gray-600">faster flashcard creation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to transform your learning?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of students who've improved their grades with AI Flashcards.
          </p>
          {user ? (
            <Link 
              to="/dashboard" 
              className="group bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-4 px-10 rounded-full inline-flex items-center shadow-xl shadow-indigo-700/20 transition-all duration-300"
            >
              Go to Dashboard 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link 
              to="/signup" 
              className="group bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-4 px-10 rounded-full inline-flex items-center shadow-xl shadow-indigo-700/20 transition-all duration-300"
            >
              Get Started For Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">AI Flashcards</div>
              <p className="text-sm text-gray-400">© 2025 AI Flashcards. All rights reserved.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4 text-center md:text-left">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}