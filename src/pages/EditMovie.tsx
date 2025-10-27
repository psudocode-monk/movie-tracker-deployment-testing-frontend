import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion, type Variants } from "framer-motion";
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
  FaEdit,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";

// ✅ FIXED: typed as Variants explicitly and safely
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ✅ FIX: `buttonVariants` must not be Variants type; use Record<string, any>
const buttonVariants: Record<string, any> = {
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.98 },
};

export default function EditMovie() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://movie-tracker-app-sepia.vercel.app/api/get-movie/${id}`,
          { withCredentials: true }
        );
        setMovie(res.data);
      } catch (err: any) {
        console.error("Cannot fetch movie:", err);
        if (err.response?.status === 404)
          setError("Movie not found or deleted.");
        else setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie) return;

    try {
      setUpdating(true);
      await axios.put(
        `https://movie-tracker-app-sepia.vercel.app/api/update-movie/${movie._id}`,
        movie,
        { withCredentials: true }
      );
      navigate("/get-movies");
    } catch (err: any) {
      console.error("Update failed:", err);
      setError("Failed to update movie. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setMovie((prev: any) => ({ ...prev, [field]: value }));
  };

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FaEdit className="mx-auto text-emerald-400" size={48} />
          </motion.div>
          <p className="text-xl font-medium">Loading movie data...</p>
        </div>
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
      >
        <div className="text-center max-w-md mx-auto space-y-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaEdit className="mx-auto text-red-400" size={64} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-red-400 text-lg font-semibold"
          >
            {error}
          </motion.p>
          <motion.button
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            onClick={() => navigate("/get-movies")}
            className="px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
          >
            <FaArrowLeft className="inline mr-2" size={16} />
            Back to Movies
          </motion.button>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)] animate-pulse" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl p-4 md:p-10 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-400/30 p-6 md:p-10 space-y-6"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-block"
            >
              <FaEdit className="text-emerald-400 text-6xl animate-bounce" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-clip-text text-transparent"
            >
              Edit Movie
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-sm md:text-base"
            >
              Update your cinematic masterpiece
            </motion.p>
          </motion.div>

          <motion.form
            onSubmit={handleUpdate}
            variants={containerVariants}
            className="space-y-4"
          >
            {[
              {
                key: "title",
                label: "Movie Title",
                icon: FaFilm,
                type: "text",
              },
              {
                key: "director",
                label: "Director",
                icon: FaUserTie,
                type: "text",
              },
              {
                key: "budget",
                label: "Budget",
                icon: FaDollarSign,
                type: "number",
              },
              {
                key: "location",
                label: "Location",
                icon: FaMapMarkerAlt,
                type: "text",
              },
              {
                key: "duration",
                label: "Duration (e.g., 2h 30m)",
                icon: FaClock,
                type: "text",
              },
              {
                key: "yearOrTime",
                label: "Year / Time (e.g., 2023)",
                icon: FaCalendar,
                type: "text",
              },
              {
                key: "genre",
                label: "Genre (e.g., Action)",
                icon: FaTag,
                type: "text",
              },
              {
                key: "rating",
                label: "Rating (0-10)",
                icon: FaStar,
                type: "number",
                min: 0,
                max: 10,
              },
            ].map(({ key, label, icon: Icon, type, min, max }) => (
              <motion.div
                key={key}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Icon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type={type}
                  placeholder={label}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200"
                  value={movie?.[key] ?? ""}
                  onChange={(e) =>
                    handleChange(
                      key,
                      type === "number"
                        ? Number(e.target.value)
                        : e.target.value
                    )
                  }
                  min={min}
                  max={max}
                  required={key !== "description"}
                />
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <FaAlignLeft
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <textarea
                placeholder="Description (optional)"
                className="w-full pl-10 pr-4 py-3 pt-8 bg-black/50 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-200 resize-none"
                rows={4}
                value={movie?.description ?? ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-400/20 p-3 rounded-lg backdrop-blur-md"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.tap}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={updating}
            >
              {updating ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <FaSpinner className="text-black" size={18} />
                  </motion.div>
                  Updating Movie...
                </div>
              ) : (
                "Update Movie"
              )}
            </motion.button>
          </motion.form>

          <motion.button
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            onClick={() => navigate("/get-movies")}
            className="w-full py-2 bg-white/10 backdrop-blur-md border border-emerald-400/50 text-emerald-400 rounded-xl hover:bg-emerald-400/20 hover:border-emerald-400 transition-all duration-300"
          >
            <FaArrowLeft className="inline mr-2" size={16} />
            Cancel & Back to Movies
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
