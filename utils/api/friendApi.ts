import apiClient from "@/utils/api/apiClient";
import {ChangeFriendInvitationStatusRequest} from "@/model/User";
import {BASE_API_URL} from "@/config/AppConfig";

const FRIENDS_API_URL = `${BASE_API_URL}/friends`
const FRIENDSHIP_INVITATIONS_API_URL = `${BASE_API_URL}/friendship-invitations`
const POTENTIAL_FRIENDS_API_URL = `${BASE_API_URL}/potential-friends`
const CREATE_FRIENDSHIP_INVITATION_API_URL = `${BASE_API_URL}/friendship-invitations`
const CHANGE_FRIENDSHIP_INVITATION_STATUS_API_URL = `${BASE_API_URL}/friendship-invitations`

export const friendApi = {

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
    getFriendshipInvitations: async (): Promise<FriendshipInvitationsResponse> => {
        return apiClient
            .get(`${FRIENDSHIP_INVITATIONS_API_URL}`)
            .then(response => {
                console.log(response.data)
                return response.data as FriendshipInvitationsResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    getPotentialFriends: async (searchPhrase: string) => {
        return apiClient
            .get(`${POTENTIAL_FRIENDS_API_URL}`, {
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
    sendFriendshipInvitation: async (addFriendshipInvitationRequest: AddFriendshipInvitationRequest) => {
        return apiClient
            .post(`${CREATE_FRIENDSHIP_INVITATION_API_URL}`, addFriendshipInvitationRequest)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    patchChangeFriendshipInvitationStatus: async (changeFriendInvitationStatusRequest: ChangeFriendInvitationStatusRequest, friendshipInvitationId: string) => {
        return apiClient
            .patch(`${CHANGE_FRIENDSHIP_INVITATION_STATUS_API_URL}/${friendshipInvitationId}`, changeFriendInvitationStatusRequest)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    }
}