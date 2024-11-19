interface SettlementGroup {
    groupId: string;
    title: string;
}

interface FetchSettlementGroupsResponse {
    settlementGroups: SettlementGroup[];
}