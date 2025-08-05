// components/ConfessionGroupManagement.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createConfessionGroup,
  deleteConfessionGroup,
  getConfessionGroups,
  updateConfessionGroup,
} from "../../apis/adminApis";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ConfessionGroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    bgImage: null, // Changed to null to handle file object
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await getConfessionGroups();
      setGroups(data.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, bgImage: file });
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("description", formData.description);
      if (formData.bgImage) {
        submissionData.append("bgImage", formData.bgImage);
      }

      console.log(formData);

      await createConfessionGroup(submissionData);
      toast.success("Group created!");
      setIsModalOpen(false);
      setFormData({ name: "", description: "", bgImage: null });
      setPreviewImage(null);

      fetchGroups();
    } catch (error) {
      toast.error("Group creation failed!");
      console.error("Error creating group:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("description", formData.description);
      if (formData.bgImage instanceof File) {
        submissionData.append("bgImage", formData.bgImage);
      }

      await updateConfessionGroup(id, submissionData);
      setIsModalOpen(false);
      setFormData();
      setPreviewImage(null);
      setFormData({ name: "", description: "", bgImage: null });
      setSelectedGroup(nulla);
      fetchGroups();
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await deleteConfessionGroup(id);
        fetchGroups();
      } catch (error) {
        console.error("Error deleting group:", error);
      }
    }
  };

  return (
    <div className="container mx-auto bg-slate-50 min-h-screen px-10 py-8">
      {loading && <LoadingSpinner />}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Confession Groups</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-4 py-2 shadow-lg shadow-gray-200 ring-2 font-bold cursor-pointer rounded-full"
        >
          Create Group
        </motion.button>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {groups
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((group) => (
              <motion.div
                key={group._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className=" w-full h-30 flex justify-center items-center">
                  <div className=" w-14 h-14">
                    <img
                      src={group.groupIcon}
                      alt={group.name}
                      className="  w-full h-full  object-cover"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {group.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{group.description}</p>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setFormData({
                          name: group.name,
                          description: group.description,
                          bgImage: group.bgImage, // Keep original URL initially
                        });
                        setPreviewImage(group.bgImage);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 font-bold cursor-pointer hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="text-red-600 font-bold cursor-pointer hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50  bg-[rgba(0,0,0,.7)] h-full   flex items-center justify-center p-4 "
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl h-4/5 overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-4">
                {selectedGroup ? "Edit Group" : "Create New Group"}
              </h2>
              <form
                onSubmit={
                  selectedGroup
                    ? (e) => handleUpdate(e, selectedGroup._id)
                    : handleCreate
                }
              >
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Background Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                  />
                  {/* {previewImage && (
                                        <div className=" flex justify-center mt-5 items-center ">
                                            <div className="rounded-xl w-1/2  text-center overflow-hidden bg-red-500 shadow-lg transition-all duration-700 h-44 flex flex-col justify-between">
                                                <div className="  font-semibold bg-red-200   w-full h-full  flex flex-col items-center gap-3 justify-between">
                                                    <div className="  flex-1  bg-red- ">
                                                        <img className=" object-cover w-full h-full" src={previewImage} alt="" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div>
                                                            <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                                                                {formData.name}
                                                            </h3>
                                                        </div>
                                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                                            {formData.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )} */}
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedGroup(null);
                      setFormData({ name: "", description: "", bgImage: null });
                      setPreviewImage(null);
                    }}
                    className="px-4 cursor-pointer shadow-lg rounded font-bold ring-2 py-2 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 ring-2 ring-blue-500 text-black cursor-pointer rounded"
                  >
                    {selectedGroup ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfessionGroupManagement;
