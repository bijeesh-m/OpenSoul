import React, { useState } from "react";
import { motion } from "framer-motion";

// Confession Post Form Component
const ConfessionPostForm = () => {
  const [confession, setConfession] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [group, setGroup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Sample joined groups (replace with real data)
  const joinedGroups = [
    "Campus Secrets",
    "Dorm Life Diaries",
    "Exam Stress Confessions",
  ];

  // Validation logic
  const MIN_CONFESSION_LENGTH = 10;
  const validateConfession = (text) => {
    if (text.length < MIN_CONFESSION_LENGTH) {
      return `Confession must be at least ${MIN_CONFESSION_LENGTH} characters.`;
    }
    return "";
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
    bounce: {
      y: [-5, 5, -5, 0],
      transition: { duration: 0.6, repeat: 1, ease: "easeInOut" },
    },
  };

  // Handle confession input change with validation
  const handleConfessionChange = (e) => {
    const text = e.target.value;
    setConfession(text);
    setError(validateConfession(text));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateConfession(confession);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log({ confession, isAnonymous, group, studentId: "SAMPLE_ID" });
      setConfession("");
      setIsAnonymous(false);
      setGroup("");
      setIsSubmitting(false);
      setError("");
      alert("Confession posted successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-yellow-50 to-green-100 flex items-center justify-center py-12">
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg border-t-4 border-green-600"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Share Your Confession
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Selection */}
          <motion.div variants={fieldVariants} initial="hidden" animate="visible">
            <label className="block text-green-700 font-medium mb-2">
              Post to Group
            </label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>
                Select a group
              </option>
              {joinedGroups.map((groupName, index) => (
                <option key={index} value={groupName}>
                  {groupName}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Confession Textarea */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <label className="block text-green-700 font-medium mb-2">
              Your Confession
            </label>
            <textarea
              value={confession}
              onChange={handleConfessionChange}
              className={`w-full p-3 border ${
                error ? "border-red-400" : "border-green-300"
              } rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500`}
              rows="5"
              placeholder="What's on your mind?"
              maxLength={500}
              required
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-500">
                {confession.length}/500 characters
              </p>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </motion.div>

          {/* Anonymous Toggle */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="text-green-700 font-medium">
                Post Anonymously
              </label>
            </div>
          </motion.div>

          {/* Confession Preview */}
          {confession && !error && (
            <motion.div
              className="bg-green-50 p-4 rounded-lg border border-green-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-green-800 font-medium mb-2">Preview:</h3>
              <p className="text-gray-700 text-sm">
                {isAnonymous ? "Anonymous" : "You"}: {confession}
              </p>
              <p className="text-gray-500 text-xs mt-1">Group: {group || "None"}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !confession || !group || error}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              isSubmitting || error
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors`}
            variants={buttonVariants}
            whileHover={!isSubmitting && !error ? "hover" : ""}
            whileTap={!isSubmitting && !error ? "tap" : ""}
            animate={!isSubmitting && confession && !error ? "bounce" : ""}
          >
            {isSubmitting ? "Posting..." : "Post Confession"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ConfessionPostForm;