import axios from 'axios';
import {BASE_API_URL} from "@/config/AppConfig";
import {UserProfileData} from "@/model/User";

const PROFILE_API_URL = `${BASE_API_URL}/users/me`

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
};