import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { deleteConfession, getConfessionGroups, getStudents, groupConfessions } from "../../apis/adminApis";
import { checkAuthStatus } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiSettings } from "react-icons/ci";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedGroupConfessions, setSelectedGroupConfessions] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [newStudent, setNewStudent] = useState({ studentId: "", name: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    };

    // Fetch data (replace with your API base URL)
    const API_BASE_URL = "http://localhost:4000/admin"; // Adjust as needed

    useEffect(() => {
        fetchGroups();
        fetchStudents();
    }, []);

    const fetchGroups = async () => {
        const res = await getConfessionGroups();
        console.log(res);
        setGroups(res.data);
    };

    const fetchStudents = async () => {
        const res = await getStudents();
        console.log(res);
        setStudents(res.users);
    };

    const fetchGroupConfessions = async (groupId) => {
        const data = await groupConfessions(groupId);
        console.log(data);
        setSelectedGroupConfessions(data);
    };

    // Handlers
    const handleDeleteConfession = async (groupId, confessionId) => {
        // Assuming confessions are nested in group data
        await deleteConfession(groupId, confessionId);
        fetchGroupConfessions(groupId);
    };

    const createStudent = async (e) => {
        e.preventDefault();
        await axios.post(`${API_BASE_URL}/student`, newStudent);
        setNewStudent({ studentId: "", name: "" });
        setIsModalOpen(false);
        fetchStudents();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-700 to-black  py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome {user?.username}</h1>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Confession Groups */}
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className=" flex items-center mb-4 gap-2 justify-between">
                            <h2 className="text-2xl font-semibold text-green-800 ">Confession Groups</h2>
                            <button
                                onClick={() => navigate("/admin/groups")}
                                className="bg-gray-200 flex  items-center gap-1  px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                <CiSettings /> Manage
                            </button>
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {groups?.map((group) => (
                                <div
                                    key={group._id}
                                    className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                                >
                                    <p
                                        className="text-green-700 cursor-pointer hover:underline"
                                        onClick={() => {
                                            fetchGroupConfessions(group._id);
                                            setSelectedGroup(group);
                                        }}
                                    >
                                        {group.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Selected Group Confessions */}
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-2xl font-semibold text-green-800 mb-4">
                            {selectedGroupConfessions ? `${selectedGroup.name} Confessions` : "Select a Group"}
                        </h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {(selectedGroupConfessions &&
                                selectedGroupConfessions.length > 0 &&
                                selectedGroupConfessions?.map((conf) => (
                                    <div
                                        key={conf._id}
                                        className="p-4 bg-green-50 rounded-lg flex justify-between items-start"
                                    >
                                        <div>
                                            <p className="text-gray-800">{conf.title}</p>
                                            <p className="text-sm text-gray-500">By: {conf.user.name}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteConfession(selectedGroup._id, conf._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))) || <p className="text-gray-500">Select a group to view confessions.</p>}
                            {selectedGroupConfessions && selectedGroupConfessions.length === 0 && (
                                <p className="text-red-300">No confessions.</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Students Management */}
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6 lg:col-span-3"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-green-800">Students</h2>
                            <button
                                onClick={() => navigate("/admin/students")}
                                className="bg-gray-200 flex  items-center gap-1  px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                <CiSettings /> Manage
                            </button>
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {students.map((student) => (
                                <div
                                    key={student._id}
                                    className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                                >
                                    <div>
                                        <p className="text-green-700">{student.name}</p>
                                        <p className="text-sm text-gray-500">{student.studentId}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Add Student Modal */}
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="bg-white rounded-xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-semibold text-green-800 mb-4">Add New Student</h3>
                            <form onSubmit={createStudent} className="space-y-4">
                                <div>
                                    <label className="block text-green-700 font-medium mb-1">Student ID</label>
                                    <input
                                        type="text"
                                        value={newStudent.studentId}
                                        onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                                        className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-green-700 font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={newStudent.name}
                                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                        className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
