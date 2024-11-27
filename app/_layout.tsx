import {SplashScreen, Stack} from "expo-router";
import {Colors} from "@/styles/Colors";
import React, {useEffect, useState} from "react";
import AddSettlementGroupContext from "@/store/add-settlement-group-context";
import AddSettlementContext from "@/store/add-settlement-context";
import {useFonts} from "expo-font";

export default function RootLayout() {
    const [contextFriends, setContextFriends] = useState<AcceptedFriend[]>([]);
    const [title, setTitle] = useState<string>("");
    const [contextSettlementExchanges, setContextSettlementExchanges] = useState<Exchange[]>([]);
    const [settlementTitle, setSettlementTitle] = useState<string>("");
    const [totalSettlementValue, setTotalSettlementValue] = useState<number>(0);

    const [loaded, error] = useFonts({
        "poppins-regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
        "poppins-bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
        "poppins-italic": require("../assets/fonts/poppins/Poppins-Italic.ttf"),
        "poppins-semi-bold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
        "poppins-medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
        "gfs-didot-regular": require("../assets/fonts/gidot/GFSDidot-Regular.ttf")
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

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
                    <Stack.Screen name="login" options={{headerShown: false}}/>
                </Stack>
            </AddSettlementContext.Provider>
        </AddSettlementGroupContext.Provider>
    );
}
