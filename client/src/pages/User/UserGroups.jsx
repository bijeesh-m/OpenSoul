import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ConfessionGroupCard from "../../components/confession/ConfessionGroupCard";
import UserGroup from "../../components/user/UserGroups";
import UserGroupCard from "../../components/user/UserGroupCard";
const UserGroups = () => {
  const { user } = useSelector((state) => state.auth);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Card animation for each group card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // No groups message animation
  const messageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto  px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl   mt-8  font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Groups
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 -mx-4 px-5 gap-3 py-4"
        variants={cardVariants}
      >
        {user?.confessionGroups?.map((group) => (
          <UserGroupCard key={group._id} group={group} />
        ))}
      </motion.div>
      {user?.confessionGroups.length === 0 && (
        <motion.div
          variants={messageVariants}
          className="w-full text-center text-red-300 font-black text-lg"
        >
          You haven't any groups yet!
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserGroups;
