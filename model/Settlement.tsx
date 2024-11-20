interface Settlement {
    settlementId: string;
    title: string;
    totalValue: string;
}

interface FetchSettlementsResponse {
    settlements: Settlement[];
}