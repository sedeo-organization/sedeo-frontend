import axios from 'axios';
import {BASE_API_URL} from "@/config/AppConfig";
import {UserProfileData} from "@/model/User";

const SETTLEMENT_GROUPS_API_URL = `${BASE_API_URL}/settlement-groups`

export const settlementGroupApi = {
    getSettlementGroups: async (status: string): Promise<FetchSettlementGroupsResponse | undefined> => {
        return axios
            .get(`${SETTLEMENT_GROUPS_API_URL}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {status: status}
                }
            )
            .then(response => {
                console.log(response.data)
                return response.data as FetchSettlementGroupsResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            });
    },
};