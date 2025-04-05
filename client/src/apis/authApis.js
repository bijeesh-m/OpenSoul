import toast from "react-hot-toast";
import { authInstance } from "../config/axiosConfig";

export const login = async (data) => {
    try {
        const response = await authInstance.post("/login", data);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message)
        console.error("Login API error:", error);
        throw error;
    }
};

export const adminlogin = async (data) => {
    try {
        const response = await authInstance.post("/adminlogin", data);
        
        return response.data;
    } catch (error) {
        console.error("Admin Login API error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await authInstance.delete("/logout");
        
        return response.data;
    } catch (error) {
        console.error(" logout API error:", error);
        throw error;
    }
};
