import { useEffect, useState } from "react";
import axios from "axios";
import { addStudent, deleteStudent, editStudent, getStudents } from "../../apis/adminApis";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoSave } from "react-icons/io5";
import toast from "react-hot-toast";

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ studentId: "", name: "", role: "User" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data.users);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await editStudent(editingId, formData);
                toast.success("User updated");
            } else {
                await addStudent(formData);
                toast.success("Added a new student!");
            }

            fetchStudents();
            setFormData({ studentId: "", name: "", role: "User" });
            setEditingId(null);
        } catch (error) {
            console.error("Error saving student", error);
        }
    };

    const handleEdit = (student) => {
        setFormData({ studentId: student.studentId, name: student.name, role: student.role });
        setEditingId(student.studentId);
    };

    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);
            toast.success("User deleted.");
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Students</h1>

            <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        placeholder="Student ID"
                        required
                        className="border outline-none  p-2 w-full"
                    />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Student Name"
                        required
                        className="border outline-none p-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="ring-2  hover:scale-105 transition duration-300 cursor-pointer whitespace-nowrap flex justify-center items-center gap-3 text-black px-4 py-2 mt-4 rounded"
                >
                    {editingId ? <IoSave /> : <IoPersonAddSharp />} Student
                </button>
            </form>

            <table className="w-full  md:table-fixed rounded-xl table-auto overflow-hidden bg-white shadow ">
                <thead className="">
                    <tr className="bg-black text-white">
                        <th className="p-2 text-start">Student ID</th>
                        <th className="p-2 text-start">Name</th>
                        <th className="p-2 text-start">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((student) => (
                            <tr key={student._id} className="border-t ">
                                <td className="p-2">{student.studentId}</td>
                                <td className="p-2 line-clamp-">{student.name}</td>
                                <td className="p-2  flex  gap-3 ">
                                    <button
                                        onClick={() => handleEdit(student)}
                                        className=" text-sm ring-2  hover:scale-105 transition duration-300  cursor-pointer font-semibold  flex gap-2 items-center bg-white shadow-lg  px-2 py-1 rounded "
                                    >
                                        <FiEdit className="   w-[15px] h-[15px] sm:w-[25px] sm:h-[25px] " />{" "}
                                        <span className=" text-yellow-500">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student._id)}
                                        className="text-red-600 hover:scale-105 transition duration-300  text-sm ring-2  cursor-pointer font-semibold  flex gap-2 items-center bg-white shadow-lg  px-3 py-1 rounded"
                                    >
                                        <FaTrashAlt className="   w-[15px] h-[15px] sm:w-[25px] sm:h-[25px] " /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentManagement;
