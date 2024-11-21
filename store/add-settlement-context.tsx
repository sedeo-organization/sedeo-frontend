import React from 'react';

export interface AddSettlementContextData {
    settlementTitle: string
    setSettlementTitle: React.Dispatch<React.SetStateAction<string>>,
    totalSettlementValue: number,
    setTotalSettlementValue: React.Dispatch<React.SetStateAction<number>>,
    contextSettlementExchanges: Exchange[];
    setContextSettlementExchanges: React.Dispatch<React.SetStateAction<Exchange[]>>;
}

export const initialSettlementContext: AddSettlementContextData = {
    settlementTitle: "",
    setSettlementTitle: () => "",
    totalSettlementValue: 0,
    setTotalSettlementValue: () => [],
    contextSettlementExchanges: [],
    setContextSettlementExchanges: () => [],
};

const AddSettlementContext = React.createContext<AddSettlementContextData>(initialSettlementContext);

export default AddSettlementContext;