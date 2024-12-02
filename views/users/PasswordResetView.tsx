import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";
import {TextStyles} from "@/styles/CommonStyles";
import {Colors} from "@/styles/Colors";
import MajorButton from "@/components/MajorButton";
import {userApi} from "@/utils/api/userApi";
import {RequestPasswordReset} from "@/model/User";
import {router, useLocalSearchParams} from "expo-router";

export default function RequestPasswordResetView() {
    const { token } = useLocalSearchParams<{ token: string }>();
    const [password, setPassword] = useState("");

    async function handlePasswordResetRequest() {
        const requestPasswordReset: RequestPasswordReset = {
            token: token,
            password: password
        }
        await userApi.patchPasswordResetRequest(requestPasswordReset)
        router.navigate("/login")
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }} keyboardShouldPersistTaps={"handled"}>
            <View style={styles.textContainer}>
                <Text style={styles.header2}>Zresetuj hasło</Text>
                <Text style={styles.text14Medium} onPress={() => {}}>Wpisz nowe hasło aby odzyskać konto</Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                    placeholder={"Hasło"}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                    placeholder={"Powtórz hasło"}
                    autoCapitalize='none'
                />
            </View>

            <View style={styles.buttonContainer}>
                <MajorButton
                    onPress={() => handlePasswordResetRequest()}
                    title={"Zresetuj hasło"}></MajorButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: "column",
        backgroundColor: Colors.defaultBackground,
    },
    textContainer: {
        flex: 1 / 8,
        justifyContent: 'center',
        paddingHorizontal: '10%',
        paddingVertical: '3%',
        gap: 10,
    },
    input: {
        height: 50,
        padding: 15,
        color: Colors.textInputColor,
        backgroundColor: Colors.textInputBackground,
        borderRadius: 10,
    },
    buttonContainer: {
        flex: 1 / 6,
        gap: 15,
    },
    textInputContainer: {
        flex: 1 / 4,
        alignSelf: "center",
        minWidth: "85%",
        marginVertical: "5%",
        justifyContent: "flex-start",
        gap: 15,
    },
    header2: {
        ...TextStyles.header2,
        color: Colors.primary,
        textAlign: "center",
    },
    text14Medium: {
        ...TextStyles.text14Medium,
        color: Colors.darkGrey,
        textAlign: "center",
    },
});
