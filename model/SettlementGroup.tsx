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

interface Participant {
    userId: string;
    firstName: string;
    lastName: string;
}

interface FetchGroupParticipantsResponse {
    participants: Participant[];
}

interface FetchPendingGroupSummariesResponse {
    summarisedExchanges: SummarisedExchange[];
}

interface SummarisedExchange {
    "debtorUserId": string;
    "debtorFirstName": string;
    "debtorLastName": string;
    "creditorUserId": string;
    "creditorFirstName": string;
    "creditorLastName": string;
    "summarisedExchangesValue": number;
}

interface BatchSettleExchangesRequest {
    "creditorUserId": string;
    "debtorUserId": string;
}