import { Link } from "react-router-dom"
import { motion, type Variants } from "framer-motion"
import { FaHome, FaFilm, FaExclamationTriangle } from "react-icons/fa"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
}

const digitContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
}

// ✅ FIX: explicitly type custom parameter as number
const digitVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (custom?: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: (custom ?? 0) * 0.1,
    },
  }),
}

const blobVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 0.2,
    transition: { duration: 1, ease: "easeInOut" },
  },
}

const buttonVariants: Record<string, any> = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
    transition: { duration: 0.3, repeat: 1, repeatType: "reverse" },
  },
}

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 md:px-6 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl"
        variants={blobVariants}
        initial="hidden"
        animate="visible"
        style={{ top: "-20%", left: "-10%" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
        variants={blobVariants}
        initial="hidden"
        animate="visible"
        style={{ bottom: "-15%", right: "-10%" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl opacity-20"
        variants={blobVariants}
        initial="hidden"
        animate="visible"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10 max-w-lg mx-auto space-y-6"
      >
        {/* Error Icon */}
        <motion.div variants={itemVariants}>
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <FaExclamationTriangle className="text-emerald-400 text-6xl md:text-7xl animate-pulse" />
            <FaFilm className="text-gray-500 text-4xl md:text-5xl" />
          </motion.div>
        </motion.div>

        {/* 404 Header with Staggered Digits */}
        <motion.div
          variants={digitContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight"
        >
          <motion.span
            variants={digitVariants}
            custom={0}
            className="bg-gradient-to-r from-emerald-400 via-white to-emerald-600 bg-clip-text text-transparent inline-block"
          >
            4
          </motion.span>
          <motion.span
            variants={digitVariants}
            custom={1}
            className="text-gray-500 inline-block"
          >
            0
          </motion.span>
          <motion.span
            variants={digitVariants}
            custom={2}
            className="bg-gradient-to-r from-emerald-400 via-white to-emerald-600 bg-clip-text text-transparent inline-block"
          >
            4
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-4"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-md mx-auto"
        >
          It seems you've wandered into uncharted territory in our cinematic universe. Don't worry—grab your popcorn and head back home!
        </motion.p>

        {/* Go Home Button */}
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={buttonVariants.hover}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1"
          >
            <FaHome size={18} />
            <Link to="/">Go Home</Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Particles/Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-20"
            initial={{ x: "0%", y: "0%" }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
