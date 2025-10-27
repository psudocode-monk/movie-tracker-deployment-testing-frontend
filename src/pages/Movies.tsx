import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSignOutAlt, FaPlus, FaFilm } from "react-icons/fa";

export default function Movies() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();

  // Fetch current user
  const fetchUser = async () => {
    try {
      const res = await axios.get("https://movie-tracker-deployment-testing-ba.vercel.app/api/get-user", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("https://movie-tracker-deployment-testing-ba.vercel.app/api/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3),transparent_50%)] animate-pulse" />
      </div>

      {/* Logout Button at top-right */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/50 rounded-lg hover:bg-white/10 hover:border-emerald-400 transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-emerald-400/25 z-10"
      >
        <FaSignOutAlt size={14} />
        Logout
      </button>

      {/* Greeting */}
      {user && (
        <div className="text-center relative z-10 mb-12 md:mb-16 px-4">
          <FaFilm className="mx-auto mb-4 text-emerald-400 text-6xl md:text-7xl animate-bounce" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent">
            Welcome,
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2">
            {user.name}!
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative z-10 px-4 w-full max-w-md md:max-w-lg">
        <button
          onClick={() => navigate("/create-movies")}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 active:scale-95 w-full md:w-auto"
        >
          <FaPlus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Create Movie
        </button>
        <button
          onClick={() => navigate("/get-movies")}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-emerald-400 text-white font-bold rounded-xl hover:bg-emerald-400 hover:text-black transition-all duration-300 shadow-lg hover:shadow-emerald-400/50 transform hover:scale-105 active:scale-95 w-full md:w-auto"
        >
          <FaFilm size={20} className="group-hover:spin transition-transform duration-300" />
          Show Movies
        </button>
      </div>

      {/* Subtle Footer Text */}
      <p className="absolute bottom-4 text-gray-400 text-xs md:text-sm text-center relative z-10 mt-8">
        Dive into your cinematic world ✨
      </p>
    </div>
  );
}