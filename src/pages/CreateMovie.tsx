import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaFilm, 
  FaUserTie, 
  FaDollarSign, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCalendar, 
  FaTag, 
  FaStar, 
  FaAlignLeft, 
  FaPlus 
} from "react-icons/fa";

export default function CreateMovie() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [yearOrTime, setYearOrTime] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "https://movie-tracker-deployment-testing-ba.vercel.app//api/create-movies",
        {
          title,
          director,
          budget,
          location,
          duration,
          yearOrTime,
          genre,
          rating,
          description,
        },
        { withCredentials: true }
      );
      navigate("/get-movies");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-lg p-6 md:p-10 relative z-10">
        {/* Form Card */}
        <div className="bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 md:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <FaPlus className="mx-auto text-emerald-400 text-6xl animate-bounce" />
            <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent">
              Create New Movie
            </h1>
            <p className="text-gray-300 text-sm md:text-base">Fill in the details to add your masterpiece</p>
          </div>

          {/* Form */}
          <form onSubmit={handleCreate} className="space-y-4">
            {/* Title Input */}
            <div className="relative">
              <FaFilm className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Movie Title"
                className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Director Input */}
            <div className="relative">
              <FaUserTie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Director"
                className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </div>

            {/* Budget Input */}
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                placeholder="Budget"
                className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                required
              />
            </div>

            {/* Location Input */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            {/* Duration Input */}
            <div className="relative">
              <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Duration (e.g., 2h 30m)"
                className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            {/* Year/Time Input */}
            <div className="relative">
              <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Year / Time (e.g., 2023 or 1990s)"
                className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={yearOrTime}
                onChange={(e) => setYearOrTime(e.target.value)}
                required
              />
            </div>

            {/* Genre Input */}
            <div className="relative">
              <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Genre (e.g., Action, Drama)"
                className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>

            {/* Rating Input */}
            <div className="relative">
              <FaStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                placeholder="Rating (0-10)"
                className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min={0}
                max={10}
              />
            </div>

            {/* Description Textarea */}
            <div className="relative">
              <FaAlignLeft className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea
                placeholder="Description (optional)"
                className="w-full pl-10 pr-4 py-3 pt-8 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-400/20 p-3 rounded-lg backdrop-blur-md">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Movie...
                </div>
              ) : (
                "Create Movie"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}