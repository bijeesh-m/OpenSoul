import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const userInstance = axios.create({ baseURL: `${api_url}/user`, withCredentials: true });
export const adminInstance = axios.create({ baseURL: `${api_url}/admin`, withCredentials: true });
export const authInstance = axios.create({ baseURL: `${api_url}/auth`, withCredentials: true });
