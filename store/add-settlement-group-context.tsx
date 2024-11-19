import React from 'react';

export interface AddSettlementGroupContextData {
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    contextFriends: AcceptedFriend[];
    setContextFriends: React.Dispatch<React.SetStateAction<AcceptedFriend[]>>;
}

export const initialGroupContext: AddSettlementGroupContextData = {
    title: "",
    setTitle: () => "",
    contextFriends: [],
    setContextFriends: () => [],
};

const AddSettlementGroupContext = React.createContext<AddSettlementGroupContextData>(initialGroupContext);

export default AddSettlementGroupContext;