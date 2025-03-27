interface AcceptedFriend {
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface FriendshipInvitation {
    invitationId: string;
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface AcceptedFriendshipResponse {
    friends: AcceptedFriend[];
}

interface FriendshipInvitationsResponse {
    invitations: FriendshipInvitation[];
}

interface PotentialFriend {
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface PotentialFriendsResponse {
    potentialFriends: PotentialFriend[]
}

interface AddFriendshipInvitationRequest {
    invitedUserId: string
}

interface InvitationWithUserFriend {

}