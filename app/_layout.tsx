import {Stack} from "expo-router";
import {Colors} from "@/styles/Colors";

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: Colors.defaultBackground,
            },
            headerShadowVisible: false,
            title: "",
        }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        </Stack>
    );
}
