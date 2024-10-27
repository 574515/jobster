import axios from "axios";

export const authInstance = axios.create({
	baseURL: import.meta.env.VITE_AUTH_URL,
	withCredentials: true,
});

export const jobInstance = axios.create({
	baseURL: import.meta.env.VITE_JOB_URL,
	withCredentials: true,
});