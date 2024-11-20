import axios from "axios";

// Function to get token from localStorage
const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : null;
};

// Function to handle refreshing the token
const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) return null;

        const response = await axios.post("http://localhost:8000/api/users/token/refresh/", {
            refresh,
        });
        const newToken = response.data.access;
        localStorage.setItem("token", newToken);
        return `Bearer ${newToken}`;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

// Axios instance
const api = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://your-deployed-app.herokuapp.com/api"
            : "http://localhost:8000/api",
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
    async (config) => {
        let token = getToken();

        // Refresh the token if needed (optional)
        if (!token) {
            token = await refreshToken();
        }

        if (token) {
            config.headers["Authorization"] = token;
        }

        config.headers["Content-Type"] = "application/json"; // Set default content type
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized. Redirecting to login...");
            // Optional: Redirect to login or refresh token
        }
        return Promise.reject(error);
    }
);

export default api;
