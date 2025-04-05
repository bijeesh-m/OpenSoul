import toast from "react-hot-toast";
import { userInstance } from "../config/axiosConfig";

export const getConfessionGroups = async () => {
    try {
        const response = await userInstance.get("/other-groups");
        return response.data;
    } catch (error) {
        console.error("get confession groups API error:", error);
        throw error;
    }
};
export const getAllConfessionGroups = async () => {
    try {
        const response = await userInstance.get("/confession-groups");
        return response.data?.confessionGroups;
    } catch (error) {
        console.error("get confession groups API error:", error);
        throw error;
    }
};

export const joinGroup = async (groupId) => {
    try {
        const response = await userInstance.post(`/join-group/${groupId}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.error("join group API error:", error);
        throw error;
    }
};

export const getGroupById = async (groupId) => {
    try {
        const response = await userInstance.get(`/confession-groups/${groupId}`);
        return response.data;
    } catch (error) {
        console.error("get group API error:", error);
        throw error;
    }
};

export const postConfession = async (groupId, data) => {
    try {
        const response = await userInstance.post(`/confession/${groupId}`, data);
        return response.data;
    } catch (error) {
        console.error("post confession API error:", error);
        throw error;
    }
};

// post comment

export const postComment = async (confessionId, text) => {
    try {
        const response = await userInstance.post(`/confession/${confessionId}/comment`, { text });
        return response.data;
    } catch (error) {
        console.error("post comment API error:", error);
        throw error;
    }
};
// Like post

export const likeConfession = async (confessionId) => {
    try {
        const response = await userInstance.post(`/confession/${confessionId}/like`);
        return response.data;
    } catch (error) {
        console.error("post comment API error:", error);
        throw error;
    }
};

// delete confession

export const deleteConfession = async (confessionId) => {
    try {
        const response = await userInstance.delete(`/confession/${confessionId}`);
        return response.data;
    } catch (error) {
        console.error("delete confession API error:", error);
        throw error;
    }
};
