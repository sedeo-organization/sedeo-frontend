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
    getParticipants: async (groupId: string): Promise<FetchGroupParticipantsResponse | undefined> => {
        return axios
            .get(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/participants`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(response => {
                console.log(response.data)
                return response.data as FetchGroupParticipantsResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            });
    },
    postSettlement: async (createSettlementRequest: CreateSettlementRequest, groupId: string) => {
        return axios
            .post(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/settlements`, createSettlementRequest,
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
    getExchanges: async (groupId: string, settlementId: string): Promise<FetchExchangesResponse | undefined> => {
        return axios
            .get(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/settlements/${settlementId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(response => {
                console.log(response.data)
                return response.data as FetchExchangesResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            });
    },
};