import {Stack} from "expo-router";
import {Colors} from "@/styles/Colors";
import React, {useState} from "react";
import AddSettlementGroupContext from "@/store/add-settlement-group-context";
import AddSettlementContext from "@/store/add-settlement-context";

export default function RootLayout() {
    const [contextFriends, setContextFriends] = useState<AcceptedFriend[]>([]);
    const [title, setTitle] = useState<string>("");
    const [contextSettlementExchanges, setContextSettlementExchanges] = useState<Exchange[]>([]);
    const [settlementTitle, setSettlementTitle] = useState<string>("");
    const [totalSettlementValue, setTotalSettlementValue] = useState<number>(0);

    return (
        <AddSettlementGroupContext.Provider value={{title, setTitle, contextFriends, setContextFriends,}}>
            <AddSettlementContext.Provider value={{
                settlementTitle,
                setSettlementTitle,
                totalSettlementValue,
                setTotalSettlementValue,
                contextSettlementExchanges,
                setContextSettlementExchanges
            }}>
                <Stack screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.defaultBackground,
                    },
                    headerShadowVisible: false,
                    title: "",
                }}>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                </Stack>
            </AddSettlementContext.Provider>
        </AddSettlementGroupContext.Provider>
    );
}
