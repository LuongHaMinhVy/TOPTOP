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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and it's not a retry and it's not the refresh request itself
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/auth/refresh") {
            
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                .then(() => {
                    return api(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Attempt to refresh the token
                await api.post("/auth/refresh");
                
                isRefreshing = false;
                processQueue(null);
                
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null);
                
                // If refresh fails, log out the user
                if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("auth:expired"));
                }
                return Promise.reject(refreshError);
            }
        }

        // If it's 401 and already retried or it's the refresh request itself
        if (error.response?.status === 401 && (originalRequest._retry || originalRequest.url === "/auth/refresh")) {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("auth:expired"));
            }
        }

        return Promise.reject(error);
    }
);

export default api;