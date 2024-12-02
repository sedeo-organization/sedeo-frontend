import {BASE_API_URL} from "@/config/AppConfig";
import {
    ChangeFriendInvitationStatusRequest,
    LoginRequest,
    LoginResponse,
    RegisterUserRequest, RequestPasswordReset, RequestPasswordResetRequest,
    UserProfileData
} from "@/model/User";
import apiClient from "@/utils/api/apiClient";

const PROFILE_API_URL = `${BASE_API_URL}/users/me`
const FRIENDS_API_URL = `${BASE_API_URL}/users/friends`
const FRIEND_INVITATIONS_API_URL = `${BASE_API_URL}/users/friend-requests`
const POTENTIAL_FRIENDS_API_URL = `${BASE_API_URL}/users/potential-friends`
const CREATE_FRIEND_INVITATION_API_URL = `${BASE_API_URL}/users/friend-requests`
const REGISTER_USER_API_URL = `${BASE_API_URL}/registration`
const LOGIN_API_URL = `${BASE_API_URL}/login`
const CHANGE_FRIEND_INVITATION_STATUS_API_URL = `${BASE_API_URL}/users/friend-requests`
const USERS_PASSWORD_API_URL = `${BASE_API_URL}/users/password`

export const userApi = {
    getProfile: async (): Promise<UserProfileData | undefined> => {
        return apiClient
            .get(`${PROFILE_API_URL}`)
            .then(response => {
                console.log(response.data)
                return response.data as UserProfileData;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            });
    },
    getFriends: async () => {
        return apiClient
            .get(`${FRIENDS_API_URL}`)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    getFriendInvitations: async (): Promise<FriendInvitationsResponse> => {
        return apiClient
            .get(`${FRIEND_INVITATIONS_API_URL}`)
            .then(response => {
                console.log(response.data)
                return response.data as FriendInvitationsResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    getPotentialFriends: async (searchPhrase: string) => {
        return apiClient
            .get(`${POTENTIAL_FRIENDS_API_URL}`,{
                params: {search_phrase: searchPhrase}
            })
            .then(response => {
                console.log(response.data)
                return response.data as PotentialFriendsResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    sendFriendInvitation: async (addFriendInvitationRequest: AddFriendInvitationRequest) => {
        return apiClient
            .post(`${CREATE_FRIEND_INVITATION_API_URL}`, addFriendInvitationRequest)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    patchChangeFriendInvitationStatus:async (changeFriendInvitationStatusRequest: ChangeFriendInvitationStatusRequest) => {
        return apiClient
            .patch(`${CHANGE_FRIEND_INVITATION_STATUS_API_URL}`, changeFriendInvitationStatusRequest)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    postUserRegistration: async (registerUserRequest: RegisterUserRequest) => {
        return apiClient
            .post(`${REGISTER_USER_API_URL}`, registerUserRequest)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    postUserLogin: async (loginRequest: LoginRequest) => {
        return apiClient
            .post(`${LOGIN_API_URL}`, loginRequest)
            .then(response => {
                console.log(response.data)
                return response.data as LoginResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    postPasswordResetRequest: async (requestPasswordResetRequest: RequestPasswordResetRequest) => {
        return apiClient
            .post(`${USERS_PASSWORD_API_URL}`, requestPasswordResetRequest)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    patchPasswordResetRequest: async (requestPasswordReset: RequestPasswordReset) => {
        return apiClient
            .patch(`${USERS_PASSWORD_API_URL}`, requestPasswordReset)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
};