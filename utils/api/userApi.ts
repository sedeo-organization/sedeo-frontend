import axios from 'axios';
import {BASE_API_URL} from "@/config/AppConfig";
import {RegisterUserRequest, UserProfileData} from "@/model/User";

const PROFILE_API_URL = `${BASE_API_URL}/users/me`
const FRIENDS_API_URL = `${BASE_API_URL}/users/friends`
const FRIEND_INVITATIONS_API_URL = `${BASE_API_URL}/users/friend-requests`
const POTENTIAL_FRIENDS_API_URL = `${BASE_API_URL}/users/potential-friends`
const CREATE_FRIEND_INVITATION_API_URL = `${BASE_API_URL}/users/friend-requests`
const REGISTER_USER_API_URL = `${BASE_API_URL}/registration`

export const userApi = {
    getProfile: async (): Promise<UserProfileData | undefined> => {
        return axios
            .get(`${PROFILE_API_URL}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
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
        return axios
            .get(`${FRIENDS_API_URL}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
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
        return axios
            .get(`${FRIEND_INVITATIONS_API_URL}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
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
        return axios
            .get(`${POTENTIAL_FRIENDS_API_URL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
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
        return axios
            .post(`${CREATE_FRIEND_INVITATION_API_URL}`, addFriendInvitationRequest,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    postUserRegistration: async (registerUserRequest: RegisterUserRequest) => {
        return axios
            .post(`${REGISTER_USER_API_URL}`, registerUserRequest,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    }
};