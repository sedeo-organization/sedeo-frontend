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
    debtorId?: string;
    debtorFirstName?: string;
    debtorLastName?: string;
    creditorId?: string;
    creditorFirstName?: string;
    creditorLastName?: string;
    status?: string;
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

interface FetchExchangesResponse {
    title: string;
    totalValue: string;
    settlementExchanges: Exchange[];
}

interface SettleExchangeRequest {
    status: string;
}