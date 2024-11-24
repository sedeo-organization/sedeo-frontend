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