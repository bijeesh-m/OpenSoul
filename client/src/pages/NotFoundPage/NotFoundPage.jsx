import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Use this if you're using React Router, otherwise replace with an <a> tag

// Placeholder image for the astronaut (replace with your own)
import astronaut from "/src/assets/cute-astronaut.png";

const NotFoundPage = () => {
  // Animation variants for the astronaut
  const astronautVariants = {
    float: {
      y: [0, -20, 0], // Moves up and down
      rotate: [0, 5, -5, 0], // Slight tilt
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
        rotate: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        },
      },
    },
  };

  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation for the button
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center overflow-hidden">
      <div className="text-center text-white px-4">
        {/* Animated Astronaut */}
        <motion.div
          className="mb-8"
          variants={astronautVariants}
          animate="float"
        >
          <img
            src={astronaut}
            alt="Lost Astronaut"
            className="w-45 h-45 md:w-64 md:h-64 mx-auto"
            loading="lazy"
          />
        </motion.div>

        {/* Animated 404 Text */}
        <motion.h1
          className="text-6xl md:text-3xl font-bold mb-4 tracking-wider"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          404
        </motion.h1>

        {/* Animated Message */}
        <motion.p
          className="text-lg md:text-xl mb-6 font-light"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Oops! Looks like you're lost in space.
        </motion.p>

        {/* Animated Button */}
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            to="/"
            className="inline-block bg-white text-indigo-900 px-6 py-3 rounded-full font-semibold  hover:bg-opacity-90 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Background Stars (Static Decorative Elements) */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-70"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS for Twinkling Stars */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.9; }
            50% { opacity: 0.1; }
          }
        `}
      </style>
    </div>
  );
};

export default NotFoundPage;