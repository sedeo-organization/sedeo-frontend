import {BASE_API_URL} from "@/config/AppConfig";
import {
    LoginRequest,
    LoginResponse,
    RegisterUserRequest,
    RequestPasswordReset,
    RequestPasswordResetRequest,
    UserProfileData
} from "@/model/User";
import apiClient from "@/utils/api/apiClient";

const PROFILE_API_URL = `${BASE_API_URL}/users/me`
const REGISTER_USER_API_URL = `${BASE_API_URL}/registration`
const LOGIN_API_URL = `${BASE_API_URL}/login`
const USERS_PASSWORD_API_URL = `${BASE_API_URL}/users/password`

export const userApi = {
    getProfile: async (): Promise<UserProfileData | undefined> => {
        return apiClient
            .get(`${PROFILE_API_URL}`)
            .then(response => {
                return response.data as UserProfileData;
            })
            .catch(err => {
                return err.response?.status;
            });
    },
    postUserRegistration: async (registerUserRequest: RegisterUserRequest) => {
        return apiClient
            .post(`${REGISTER_USER_API_URL}`, registerUserRequest)
            .then(response => {
            })
            .catch(err => {
                return err.response?.status;
            })
    },
    postUserLogin: async (loginRequest: LoginRequest) => {
        return apiClient
            .post(`${LOGIN_API_URL}`, loginRequest)
            .then(response => {
                return response.data as LoginResponse;
            })
            .catch(err => {
                return err.response?.status;
            })
    },
    postPasswordResetRequest: async (requestPasswordResetRequest: RequestPasswordResetRequest) => {
        return apiClient
            .post(`${USERS_PASSWORD_API_URL}`, requestPasswordResetRequest)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                return err.response?.status;
            })
    },
    patchPasswordResetRequest: async (requestPasswordReset: RequestPasswordReset) => {
        return apiClient
            .patch(`${USERS_PASSWORD_API_URL}`, requestPasswordReset)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                return err.response?.status;
            })
    },
};