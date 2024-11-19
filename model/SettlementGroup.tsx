interface SettlementGroup {
    groupId: string;
    title: string;
}

interface FetchSettlementGroupsResponse {
    settlementGroups: SettlementGroup[];
}

interface CreateSettlementGroupRequest {
    groupId: string;
    title: string,
    participantIds: string[]
}