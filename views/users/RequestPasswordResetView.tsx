import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";
import {TextStyles} from "@/styles/CommonStyles";
import {Colors} from "@/styles/Colors";
import MajorButton from "@/components/MajorButton";
import {userApi} from "@/utils/api/userApi";
import {RequestPasswordResetRequest} from "@/model/User";
import {router} from "expo-router";

export default function RequestPasswordResetView() {
    const [email, setEmail] = useState("");

    async function handleRequestPasswordReset() {
        const requestPasswordResetRequest: RequestPasswordResetRequest = {
            email: email
        }
        await userApi.postPasswordResetRequest(requestPasswordResetRequest)
        router.navigate("/login")
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }} keyboardShouldPersistTaps={"handled"}>
            <View style={styles.textContainer}>
                <Text style={styles.header2}>Zresetuj hasło</Text>
                <Text style={styles.text14Medium} onPress={() => {}}>Podaj email na który zostanie wysłany link do zresetowania hasła</Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={email => setEmail(email)}
                    placeholder={"Email"}
                    autoCapitalize='none'
                />
            </View>

            <View style={styles.buttonContainer}>
                <MajorButton
                    onPress={() => handleRequestPasswordReset()}
                    title={"Wyślij"}></MajorButton>
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
        justifyContent: "space-evenly",
        gap: 10,
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
