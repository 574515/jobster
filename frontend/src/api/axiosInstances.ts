import axios from "axios";

export const collectApiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
})

export const usersInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_USERS_URL,
    withCredentials: true,
});