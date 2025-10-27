import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaFilm } from "react-icons/fa";

interface Movie {
  _id: string;
  title: string;
  director: string;
  budget: number;
  location: string;
  duration: string;
  yearOrTime: string;
  genre: string;
  rating: number;
  description?: string;
}

interface User {
  name: string;
}

export default function ShowMovies() {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({ text: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://movie-tracker-deployment-testing-ba.vercel.app/api/get-user", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get("https://movie-tracker-deployment-testing-ba.vercel.app/api/get-movies", {
        withCredentials: true,
      });
      setMovies(res.data);
      setFilteredMovies(res.data);
    } catch {
      setMovies([]);
      setFilteredMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await axios.delete(`https://movie-tracker-deployment-testing-ba.vercel.app/api/delete-movies/${id}`, {
        withCredentials: true,
      });
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
      setFilteredMovies((prev) => prev.filter((movie) => movie._id !== id));
      setMessage({ text: "Movie deleted successfully!", type: "success" });
    } catch {
      setMessage({ text: "Failed to delete movie. Try again.", type: "error" });
    } finally {
      setDeleting(null);
      setConfirmId(null);
      setTimeout(() => setMessage({ text: "", type: "" }), 2500);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;

    // Search filter (title or director)
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(lowerSearch) ||
          movie.director.toLowerCase().includes(lowerSearch)
      );
    }

    // Genre filter
    if (selectedGenre !== "All") {
      filtered = filtered.filter((movie) => movie.genre === selectedGenre);
    }

    setFilteredMovies(filtered);
  }, [searchTerm, selectedGenre, movies]);

  // Get unique genres for filter dropdown
  const genres = ["All", ...new Set(movies.map((movie) => movie.genre))].sort();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="text-center">
          <FaFilm className="mx-auto mb-4 text-emerald-400" size={48} />
          <p className="text-xl">Loading your movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center p-4 md:p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse" />
      </div>

      {user && (
        <h1 className="text-4xl md:text-5xl p-4 md:p-10 font-bold mb-6 md:mb-8 text-emerald-400 text-center relative z-10">
          <FaFilm className="inline mr-2" /> {user.name}, here are your movies!
        </h1>
      )}

      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg text-sm font-semibold shadow-xl transition-all duration-300 ${
            message.type === "success"
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
              : "bg-gradient-to-r from-red-500 to-red-600 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      {movies.length === 0 ? (
        <div className="text-center relative z-10">
          <FaFilm className="mx-auto mb-4 text-emerald-400 text-6xl" />
          <p className="text-gray-300 text-lg">
            No movies added yet. Start creating some!
          </p>
        </div>
      ) : (
        <div className="w-full max-w-7xl relative z-10">
          {/* Search and Filter Controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <FaSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by title or director..."
                className="w-full pl-10 pr-4 py-3 bg-black/60 backdrop-blur-md border border-white/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-3 bg-black/60 backdrop-blur-md border border-white/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
            >
              {genres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                  className="bg-gray-900 text-white"
                >
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <p className="text-gray-300 text-sm mb-6 text-center">
            Showing{" "}
            <span className="font-semibold text-emerald-400">
              {filteredMovies.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-emerald-400">
              {movies.length}
            </span>{" "}
            movies
          </p>

          {/* Mobile View: Stacked Cards */}
          <div className="block sm:hidden w-full space-y-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie._id}
                className="bg-black/60 backdrop-blur-md rounded-2xl border border-white/20 p-6 space-y-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-emerald-400/50"
              >
                <div className="flex items-center gap-3">
                  <FaFilm className="text-emerald-400" size={24} />
                  <h3 className="text-xl font-bold text-emerald-400 flex-1">
                    {movie.title}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">
                      Director:
                    </span>
                    <span className="text-white">{movie.director}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Genre:</span>
                    <span className="text-emerald-400">{movie.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Rating:</span>
                    <span className="text-yellow-400">{movie.rating}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">Budget:</span>
                    <span className="text-white">
                      ${movie.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">
                      Location:
                    </span>
                    <span className="text-white">{movie.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">
                      Duration:
                    </span>
                    <span className="text-white">{movie.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-300">
                      Year/Time:
                    </span>
                    <span className="text-white">{movie.yearOrTime}</span>
                  </div>
                  {movie.description && (
                    <div className="col-span-2">
                      <span className="font-semibold text-gray-300">
                        Description:
                      </span>
                      <p className="text-white mt-1">{movie.description}</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => navigate(`/update-movie/${movie._id}`)}
                    className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 hover:text-emerald-300 transition-all duration-200"
                    title="Edit Movie"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() =>
                      confirmId === movie._id
                        ? handleDelete(movie._id)
                        : setConfirmId(movie._id)
                    }
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      deleting === movie._id
                        ? "bg-red-500/20 text-gray-500 cursor-not-allowed"
                        : confirmId === movie._id
                        ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/40 hover:text-yellow-300"
                        : "bg-red-500/20 text-red-500 hover:bg-red-500/40 hover:text-red-400"
                    }`}
                    disabled={deleting === movie._id}
                    title={
                      confirmId === movie._id
                        ? "Click again to confirm delete"
                        : "Delete Movie"
                    }
                  >
                    {deleting === movie._id ? "..." : <FaTrash size={18} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Full Table */}
          <div className="hidden sm:block overflow-x-auto w-full">
            <table className="min-w-full border border-white/20 border-collapse text-white text-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Title
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Director
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Budget
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Location
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Duration
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Year/Time
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Genre
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Rating
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold">
                    Description
                  </th>
                  <th className="px-6 py-4 border border-white/20 font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr
                    key={movie._id}
                    className="hover:bg-white/10 transition-all duration-200 border-b border-white/10"
                  >
                    <td className="px-6 py-4 border border-white/20 font-medium">
                      {movie.title}
                    </td>
                    <td className="px-6 py-4 border border-white/20">
                      {movie.director}
                    </td>
                    <td className="px-6 py-4 border border-white/20">
                      ${movie.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 border border-white/20">
                      {movie.location}
                    </td>
                    <td className="px-6 py-4 border border-white/20">
                      {movie.duration}
                    </td>
                    <td className="px-6 py-4 border border-white/20">
                      {movie.yearOrTime}
                    </td>
                    <td className="px-6 py-4 border border-white/20 text-emerald-400 font-medium">
                      {movie.genre}
                    </td>
                    <td className="px-6 py-4 border border-white/20 text-yellow-400 font-medium">
                      {movie.rating}/10
                    </td>
                    <td className="px-6 py-4 border border-white/20 max-w-xs truncate">
                      {movie.description || "-"}
                    </td>
                    <td className="px-6 py-4 border border-white/20 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => navigate(`/update-movie/${movie._id}`)}
                          className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 hover:text-emerald-300 transition-all duration-200"
                          title="Edit Movie"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() =>
                            confirmId === movie._id
                              ? handleDelete(movie._id)
                              : setConfirmId(movie._id)
                          }
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            deleting === movie._id
                              ? "bg-red-500/20 text-gray-500 cursor-not-allowed"
                              : confirmId === movie._id
                              ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/40 hover:text-yellow-300"
                              : "bg-red-500/20 text-red-500 hover:bg-red-500/40 hover:text-red-400"
                          }`}
                          disabled={deleting === movie._id}
                          title={
                            confirmId === movie._id
                              ? "Click again to confirm delete"
                              : "Delete Movie"
                          }
                        >
                          {deleting === movie._id ? (
                            "..."
                          ) : (
                            <FaTrash size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="py-4 font-bold text-yellow-400 text-center">
              Double click <span className="text-amber-100">delete icon</span>{" "}
              to delete a movie.
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-8 py-3 border border-emerald-500 text-emerald-400 font-semibold rounded-xl hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 relative z-10"
      >
        Back to Home
      </button>
    </div>
  );
}
