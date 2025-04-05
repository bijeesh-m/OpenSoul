import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { deleteConfession, getGroupById, likeConfession, postComment, postConfession } from "../../apis/userApis";
import { timeAgo } from "../../utils/timeAgo";
import toast from "react-hot-toast";

const GroupConfessionPage = () => {
    const [group, setGroup] = useState({});
    const [newConfession, setNewConfession] = useState("");
    const [newConfessionTitle, setNewConfessionTitle] = useState("");
    const [newConfessionFile, setNewConfessionFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [confessions, setConfessions] = useState([]);
    const [showConfessionForm, setShowConfessionForm] = useState(false);
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dltDrpId, setDltDrpId] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [like, setLike] = useState(false);
    const fileRef = useRef(null);

    const { groupId } = useParams();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchGroup = async () => {
            const data = await getGroupById(groupId);
            setGroup(data.confessionGroup);
            setConfessions(data.confessionGroup?.confessions || []);
        };

        fetchGroup();
    }, [groupId]);

    // Validation
    const MIN_CONFESSION_LENGTH = 10;
    const MIN_TITLE_LENGTH = 3;
    const validateConfession = (text) =>
        text.length < MIN_CONFESSION_LENGTH ? `Confession must be at least ${MIN_CONFESSION_LENGTH} characters.` : "";
    const validateConfessionTitle = (text) =>
        text.length < MIN_TITLE_LENGTH ? `Title must be at least ${MIN_TITLE_LENGTH} characters.` : "";

    // Animation variants
    const pageVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const fieldVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const buttonVariants = {
        hover: { scale: 1.01, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
        bounce: { y: [-5, 5, -5, 0], transition: { duration: 0.6, repeat: 1 } },
    };

    const confessionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewConfessionFile(file);

        // Generate preview URL
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleClearFile = () => {
        if (fileRef.current) {
            fileRef.current.value = "";
        }
        setPreviewImage(null);
        setNewConfessionFile(null);
    };

    // Handle confession submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const titleError = validateConfessionTitle(newConfessionTitle);
        const bodyError = validateConfession(newConfession);

        if (titleError || bodyError) {
            setError(titleError || bodyError);
            return;
        }

        setIsSubmitting(true);

        console.log(newConfession, newConfessionTitle, newConfessionFile);

        const formData = new FormData();
        formData.append("title", newConfessionTitle);
        formData.append("body", newConfession);

        if (newConfessionFile) {
            formData.append("image", newConfessionFile);
        }

        try {
            const data = await postConfession(groupId, formData); // Assumes API accepts FormData
            toast.success("Posted successfully!");
            setConfessions([data, ...confessions]);
            setNewConfessionTitle("");
            setNewConfession("");
            setNewConfessionFile(null);
            setShowConfessionForm(false);
            setError("");
        } catch (err) {
            setError("Failed to post confession. Please try again.");
            if (err.status === 401) {
                toast.error("session timeout!");
                window.location.replace("/login");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Toggle comments visibility
    const toggleComments = (confessionId) => {
        setActiveCommentId(activeCommentId === confessionId ? null : confessionId);
    };

    // Handle comment submission
    const handleComment = async (confessionId, commentText) => {
        if (!commentText.trim()) return;

        const updatedConfession = await postComment(confessionId, commentText);
        setConfessions((prev) => prev.map((conf) => (conf._id === confessionId ? updatedConfession : conf)));
    };

    // Handle like confession
    const handleLike = async (confessionId) => {
        const data = await likeConfession(confessionId);
        setConfessions((prev) => prev.map((confession) => (confession._id === confessionId ? data : confession)));
        // setConfessions(data);
        setLike(!like);
    };

    const handleDeleteConf = async (confId) => {
        try {
            await deleteConfession(confId);
            toast.success("Post deleted!");
            setDltDrpId(null);
            setShowDropdown(false);
            setConfessions((prev) => prev.filter((post) => post._id !== confId));
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete post!");
        }
    };

    console.log(confessions);

    return (
        <div className="min-h-screen  relative w-full bg-gradient-to-t  py-12">
            <motion.div
                className="container space-y-1 bg-white mx-auto sm:px-4"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Group Header */}
                <div className="shadow-xl z-20  flex justify-between items-center sticky top-[70px]    bg-white  p-3">
                    <div>
                        <h1 className="text-xl sm:text-3xl font-bold font-mono">{group?.name}</h1>
                        <p className="text-xs sm:text-sm italic">{group?.members?.length} members</p>
                    </div>
                    <motion.div variants={pageVariants} initial="hidden" animate="visible">
                        <button
                            onClick={() => setShowConfessionForm(true)}
                            className="bg-[#271F44] py-1 md:py-2 flex gap-1 justify-center items-center rounded-full text-xs md:text-lg text-white font-semibold px-3 md:px-5 cursor-pointer"
                        >
                            <IoMdAdd size={20} /> Create Post
                        </button>
                    </motion.div>
                </div>

                {/* New Confession Form */}
                {showConfessionForm && (
                    <div
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowConfessionForm(false);
                            }
                        }}
                        className="fixed inset-0 bg-[rgba(48,48,46,0.75)] flex items-center justify-center z-50 backdrop-blur-sm"
                    >
                        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-2xl w-full max-w-lg h-5/6 overflow-y-auto mx-auto relative transform transition-all duration-300 scale-100 hover:scale-102">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">
                                Share Your Confession
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Image/File Field */}
                                <motion.div variants={fieldVariants} initial="hidden" animate="visible">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Add an Image
                                        </label>

                                        <div className=" relative">
                                            <input
                                                ref={fileRef}
                                                type="file"
                                                onChange={handleFileChange}
                                                className="w-full pr-14  p-2 border-2 border-gray-300 rounded-lg file:mr-4 file:py-2  file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all duration-200"
                                                accept="image/*,.pdf,.txt"
                                            />
                                            {newConfessionFile && (
                                                <button onClick={handleClearFile} className=" absolute right-5 top-5">
                                                    <IoCloseOutline size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {previewImage && (
                                        <div className="mt-4 w-full flex justify-center">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="max-w-full h-40 rounded-lg shadow-lg object-cover"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                                {/* Title Field */}
                                <motion.div variants={fieldVariants} initial="hidden" animate="visible">
                                    <input
                                        type="text"
                                        value={newConfessionTitle}
                                        onChange={(e) => {
                                            setNewConfessionTitle(e.target.value);
                                            setError(validateConfessionTitle(e.target.value));
                                        }}
                                        className={`w-full p-3 border-2 ${
                                            error && validateConfessionTitle(newConfessionTitle)
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400`}
                                        placeholder="Title"
                                        maxLength={100}
                                        required
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-gray-500">
                                            {newConfessionTitle.length}/100 characters
                                        </p>
                                        {error && validateConfessionTitle(newConfessionTitle) && (
                                            <p className="text-xs text-red-500">{error}</p>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Body Field */}
                                <motion.div variants={fieldVariants} initial="hidden" animate="visible">
                                    <textarea
                                        value={newConfession}
                                        onChange={(e) => {
                                            setNewConfession(e.target.value);
                                            setError(validateConfession(e.target.value));
                                        }}
                                        className={`w-full p-3 border-2 ${
                                            error && validateConfession(newConfession)
                                                ? "border-red-400"
                                                : "border-gray-300"
                                        } rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 bg-gray-50 text-gray-800 placeholder-gray-400`}
                                        rows="4"
                                        placeholder="What's on your mind?"
                                        maxLength={500}
                                        required
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-gray-500">{newConfession.length}/500 characters</p>
                                        {error && validateConfession(newConfession) && (
                                            <p className="text-xs text-red-500">{error}</p>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        !newConfession ||
                                        !newConfessionTitle ||
                                        validateConfession(newConfession) ||
                                        validateConfessionTitle(newConfessionTitle)
                                    }
                                    className={`w-full  py-3 rounded-lg font-semibold text-white ${
                                        isSubmitting ||
                                        !newConfession ||
                                        !newConfessionTitle ||
                                        validateConfession(newConfession) ||
                                        validateConfessionTitle(newConfessionTitle)
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
                                    } shadow-md`}
                                    variants={buttonVariants}
                                    whileHover={
                                        !isSubmitting &&
                                        newConfession &&
                                        newConfessionTitle &&
                                        !validateConfession(newConfession) &&
                                        !validateConfessionTitle(newConfessionTitle)
                                            ? "hover"
                                            : ""
                                    }
                                    whileTap={
                                        !isSubmitting &&
                                        newConfession &&
                                        newConfessionTitle &&
                                        !validateConfession(newConfession) &&
                                        !validateConfessionTitle(newConfessionTitle)
                                            ? "tap"
                                            : ""
                                    }
                                    animate={
                                        !isSubmitting &&
                                        newConfession &&
                                        newConfessionTitle &&
                                        !validateConfession(newConfession) &&
                                        !validateConfessionTitle(newConfessionTitle)
                                            ? "bounce"
                                            : ""
                                    }
                                >
                                    {isSubmitting ? "Posting..." : "Share Your Confession"}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Existing Confessions */}
                <div className="sm:px-4 md:px-10 lg:px-[100px]">
                    {confessions
                        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((conf) => (
                            <motion.div
                                key={conf._id}
                                className="text-gray-800 flex gap-2 p-6"
                                variants={confessionVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="w-12 flex justify-center">
                                    <div className="bg-amber-200 w-10 h-10 rounded-full flex items-center justify-center">
                                        <span className="text-gray-600 text-xl">👤</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex my-1 items-center gap-5">
                                        <p className="text-lg font-mono text-black">{conf?.user?.username}</p>
                                        <p className="text-sm text-gray-500 italic">{timeAgo(conf.createdAt)}</p>
                                    </div>
                                    {/* Display Title */}
                                    {conf.title && <p className="mb-2 font-bold text-xl">{conf.title}</p>}
                                    {/* Display Body */}
                                    <p className="mb-2">{conf.body}</p>
                                    {/* Display File/Image if present */}
                                    {conf.image && (
                                        <div className="mb-2">
                                            <img
                                                src={conf.image}
                                                alt="Confession attachment"
                                                className="max-w-full h-auto rounded-lg shadow-md"
                                            />
                                        </div>
                                    )}
                                    <div className="flex gap-5 mt-2">
                                        <div className=" flex gap-1">
                                            <FaHeart
                                                onClick={() => handleLike(conf._id)}
                                                color={conf.likes?.includes(user._id.toString()) ? "red" : "#D4D4D4"}
                                                size={25}
                                                className="cursor-pointer hover:color-[#FF5555]"
                                            />
                                            <p className=" text-gray-500 font-bold">{conf.likes?.length}</p>
                                        </div>
                                        <div className=" flex gap-1">
                                            <FaComment
                                                color={activeCommentId === conf._id ? "#4B5EAA" : "#D4D4D4"}
                                                size={25}
                                                className="cursor-pointer hover:color-[#4B5EAA]"
                                                onClick={() => toggleComments(conf._id)}
                                            />
                                            <p className=" text-gray-500 font-bold">{conf.comments?.length}</p>
                                        </div>
                                        {conf.user._id === user._id && (
                                            <div className="relative">
                                                {/* Three Dots Icon */}
                                                <BsThreeDots
                                                    className="cursor-pointer z-[-100px]]"
                                                    size={25}
                                                    onClick={() => {
                                                        setShowDropdown(!showDropdown);
                                                        setDltDrpId(conf._id);
                                                    }}
                                                />

                                                {/* Dropdown Menu */}
                                                {showDropdown && conf._id === dltDrpId && (
                                                    <div className="absolute z-[-100px] left-0 top-0 mt-2 w-32  shadow-sm overflow-hidden rounded-md ">
                                                        <div className=" absolute right-0 cursor-pointer">
                                                            <IoIosClose
                                                                onClick={() => {
                                                                    setShowDropdown(false);
                                                                    setDltDrpId(conf._id);
                                                                }}
                                                                size={30}
                                                            />
                                                        </div>
                                                        <button
                                                            className="w-full px-4 pt-6 py-5  text-sm font-semibold cursor-pointer text-red-600 hover:bg-gray-100"
                                                            onClick={() => handleDeleteConf(conf._id)}
                                                        >
                                                            Delete Post
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}{" "}
                                    </div>

                                    {/* Comment Section (Dropdown) */}
                                    <AnimatePresence>
                                        {activeCommentId === conf._id && (
                                            <motion.div
                                                className=" border-gray-200 p-4 overflow-hidden"
                                                initial={{ opacity: 0, height: 0, y: 20 }}
                                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                                exit={{ opacity: 0, height: 0, y: -20 }}
                                                transition={{ duration: 0.3, ease: "linear" }}
                                            >
                                                <h4 className="text-sm  font-semibold text-gray-800 mb-3 flex items-center justify-end">
                                                    <button
                                                        onClick={() => setActiveCommentId(null)}
                                                        className="text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-medium"
                                                    >
                                                        Close
                                                    </button>
                                                </h4>

                                                <div className="max-h-48 overflow-y-auto space-y-3 mb-4 pr-2">
                                                    {conf.comments?.length > 0 ? (
                                                        conf.comments
                                                            .sort(
                                                                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                                                            )
                                                            .map((comment) => (
                                                                <div
                                                                    key={comment._id}
                                                                    className="text-sm text-gray-700 p-3 transition-colors duration-200"
                                                                >
                                                                    <div className="flex gap-2">
                                                                        <div className="min-w-7 max-w-7 h-7  rounded-full bg-blue-500"></div>
                                                                        <div className="flex flex-col gap-1">
                                                                            <p className="font-semibold text-gray-900">
                                                                                {comment.user?.username}{" "}
                                                                                <span className=" text-gray-400 italic ml-4">
                                                                                    {timeAgo(comment.createdAt)}
                                                                                </span>
                                                                            </p>
                                                                            <p>{comment.text}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                    ) : (
                                                        <p className="text-sm text-gray-500 italic">No comments yet</p>
                                                    )}
                                                </div>

                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        const commentText = e.target[0].value;
                                                        handleComment(conf._id, commentText);
                                                        e.target[0].value = "";
                                                    }}
                                                    className="flex gap-2 items-center"
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="Add a comment..."
                                                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B5EAA] focus:border-transparent text-sm transition-all duration-200"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-[#4B5EAA] text-white p-2 rounded-md hover:bg-[#3b4a87] focus:ring-2 focus:ring-[#4B5EAA] focus:outline-none transition-all duration-200"
                                                    >
                                                        <MdSend size={16} />
                                                    </button>
                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </motion.div>
        </div>
    );
};

export default GroupConfessionPage;
