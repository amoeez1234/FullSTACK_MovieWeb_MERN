import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">{movie.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{movie.duration}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-2">
          {movie.description}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;