import axios from "axios";
import {BASE_API_URL} from "@/config/AppConfig";
import {getJwt} from "@/utils/auth/jwtStorage";
import {router} from "expo-router";

const apiClient = axios.create({
    baseURL: `${BASE_API_URL}`,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        try {
            console.log("Trying to retrieve token")
            const token = await getJwt();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                router.navigate("/login")
            }
        } catch (error) {
            console.error("Error fetching JWT for request:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized: Invalid or expired JWT");
            router.navigate("/login")
        }
        return Promise.reject(error);
    }
);

export default apiClient;