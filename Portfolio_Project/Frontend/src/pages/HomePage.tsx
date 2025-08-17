import React from 'react';
import MovieGrid from '../components/MovieGrid';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover Amazing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                {' '}Movies
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Download high-quality movies instantly. Your entertainment hub awaits.
            </p>
          </div>
        </div>
        
        {/* Movies Grid */}
        <MovieGrid />
      </div>
    </div>
  );
};

export default HomePage;