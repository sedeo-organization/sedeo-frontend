export interface UserProfileData {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    accountBalance: number
}

export interface RegisterUserRequest {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    jwt: string;
}

export interface ChangeFriendInvitationStatusRequest {
    invitingUserId: string;
    status: string;
}

export interface RequestPasswordResetRequest {
    email: string;
}

export interface RequestPasswordReset {
    password: string;
    token: string;
}