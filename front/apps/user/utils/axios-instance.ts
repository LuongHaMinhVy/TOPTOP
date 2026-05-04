import axios from "axios";

const baseUrl = process.env.BACK_END_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

api.interceptors.response.use(
    (response) => {
        if (response.data.status === 401 || response.data.status === 403) {
            window.location.href = "/login";
        }
        return response;
    },
    (error) => {
        if (error.response?.data?.status === 401 || error.response?.data?.status === 403) {
            window.location.href = "/login";
        }
        throw error;
    }
)

export default api;