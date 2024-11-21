interface Settlement {
    settlementId: string;
    title: string;
    totalValue: string;
}

interface FetchSettlementsResponse {
    settlements: Settlement[];
}

interface Exchange {
    exchangeId: string;
    debtorUserId?: string;
    debtorFirstName?: string;
    debtorLastName?: string;
    creditorUserId?: string;
    creditorFirstName?: string;
    creditorLastName?: string;
    exchangeValue: string
}

interface SettlementExchange {
    exchangeId: string;
    debtorUserId: string;
    creditorUserId: string;
    exchangeValue: number
}

interface CreateSettlementRequest {
    settlementId: string;
    title: string;
    totalValue: number;
    settlementExchanges: SettlementExchange[];
}