interface AcceptedFriend {
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface FriendInvitation {
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

interface AcceptedFriendsResponse {
    friends: AcceptedFriend[];
}

interface FriendInvitationsResponse {
    invitingUsers: FriendInvitation[];
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

interface AddFriendInvitationRequest {
    recipientUserId: string
}