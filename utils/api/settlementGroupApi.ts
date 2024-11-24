import {BASE_API_URL} from "@/config/AppConfig";
import apiClient from "@/utils/api/apiClient";

const SETTLEMENT_GROUPS_API_URL = `${BASE_API_URL}/settlement-groups`

export const settlementGroupApi = {
    getSettlementGroups: async (status: string): Promise<FetchSettlementGroupsResponse | undefined> => {
        return apiClient
            .get(`${SETTLEMENT_GROUPS_API_URL}`, {
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
        return apiClient
            .post(`${SETTLEMENT_GROUPS_API_URL}`, createSettlementGroupRequest)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    getSettlements: async (groupId: string): Promise<FetchSettlementsResponse | undefined> => {
        return apiClient
            .get(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/settlements`)
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
        return apiClient
            .get(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/participants`)
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
        return apiClient
            .post(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/settlements`, createSettlementRequest)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
    getExchanges: async (groupId: string, settlementId: string): Promise<FetchExchangesResponse | undefined> => {
        return apiClient
            .get(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/settlements/${settlementId}`,)
            .then(response => {
                console.log(response.data)
                return response.data as FetchExchangesResponse;
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            });
    },
    settleExchange: async (settleExchangeRequest: SettleExchangeRequest, groupId: string, settlementId: string, exchangeId: string) => {
        return apiClient
            .patch(`${SETTLEMENT_GROUPS_API_URL}/${groupId}/settlements/${settlementId}/exchanges/${exchangeId}`, settleExchangeRequest)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err.response)
                return err.response?.status;
            })
    },
};