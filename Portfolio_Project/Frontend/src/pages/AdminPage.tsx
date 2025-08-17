import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AdminLogin from '../components/AdminLogin';
import MovieForm from '../components/MovieForm';
import { Movie } from '../types/Movie';

const AdminPage: React.FC = () => {
  const { user, movies, deleteMovie } = useApp();
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (!user) {
    return <AdminLogin />;
  }

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setShowMovieForm(true);
  };

  const handleDelete = (movieId: string) => {
    deleteMovie(movieId);
    setDeleteConfirm(null);
  };

  const closeForm = () => {
    setShowMovieForm(false);
    setEditingMovie(undefined);
  };
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Assuming formData.genre is a string like "romance, action"
  const genreArray = formData.genre
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const movieToSend = {
    ...formData,
    genre: genreArray,
    year: Number(formData.year),
  };

  // Now send movieToSend instead of formData
  addMovie(movieToSend);  // or updateMovie if editing
};

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage your movie collection</p>
          </div>
          <button
           onClick={() => {
    setEditingMovie(undefined); // no movie to edit, means "Add"
    setShowMovieForm(true);
  }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>Add Movie</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-white mb-2">{movies.length}</div>
            <div className="text-gray-400">Total Movies</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-white mb-2">
              {(movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)}
            </div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="text-2xl font-bold text-white mb-2">
              {new Set(movies.flatMap(movie => movie.genre)).size}
            </div>
            <div className="text-gray-400">Total Genres</div>
          </div>
        </div>

        {/* Movies Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Movie</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Genres</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {movies.map((movie) => (
                  <tr key={movie._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="text-white font-medium">{movie.title}</div>
                          <div className="text-gray-400 text-sm">{movie.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white">{movie.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span><span>{movie.year || 'N/A'}</span>
</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                       {Array.isArray(movie.genre) && movie.genre.length > 0 ? (
  <>
    {movie.genre.slice(0, 2).map((genre) => (
      <span key={genre} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
        {genre}
      </span>
    ))}
    {movie.genre.length > 2 && (
      <span className="text-gray-400 text-xs">
        +{movie.genre.length - 2} more
      </span>
    )}
  </>
) : (
  <span className="text-gray-500 text-xs italic">No genres</span>
)}

                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(movie._id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Movie Form Modal */}
      {showMovieForm && (
        <MovieForm movie={editingMovie} onClose={closeForm} />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this movie? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;