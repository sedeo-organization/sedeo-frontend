import {Stack} from "expo-router";
import {Colors} from "@/styles/Colors";
import React, {useState} from "react";
import AddSettlementGroupContext from "@/store/add-settlement-group-context";

export default function RootLayout() {
    const [contextFriends, setContextFriends] = useState<AcceptedFriend[]>([]);
    const [title, setTitle] = useState<string>("");

    return (
        <AddSettlementGroupContext.Provider value={ {title, setTitle, contextFriends, setContextFriends,} }>
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.defaultBackground,
                },
                headerShadowVisible: false,
                title: "",
            }}>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
        </AddSettlementGroupContext.Provider>
    );
}
