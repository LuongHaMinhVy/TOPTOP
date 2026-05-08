import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACK_END_URL 
    ? `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1` 
    : "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'X-App-Id': 'toptopuser',
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