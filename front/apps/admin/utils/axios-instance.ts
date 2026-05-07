import axios from "axios";

const baseUrl = process.env.BACK_END_URL || "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'X-App-Id': 'toptopadmin',
    }
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new CustomEvent("auth:expired"));
        }
        return Promise.reject(error);
    }
);

export default api;