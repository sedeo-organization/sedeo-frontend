import axios from 'axios';
import {BASE_API_URL} from "@/config/AppConfig";

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
    createSettlementGroup: async (createSettlementGroupRequest: CreateSettlementGroupRequest) => {
        return axios
            .post(`${SETTLEMENT_GROUPS_API_URL}`, createSettlementGroupRequest,
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
    getSettlements: async (groupId: string): Promise<FetchSettlementsResponse | undefined> => {
        return axios
            .get(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/settlements`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(response => {
                console.log(response.data)
                return response.data as FetchSettlementsResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            });
    },
};