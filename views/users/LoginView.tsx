import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";
import {TextStyles} from "@/styles/CommonStyles";
import {Colors} from "@/styles/Colors";
import MajorButton from "@/components/MajorButton";
import {userApi} from "@/utils/api/userApi";
import {LoginRequest} from "@/model/User";
import {saveJwt} from "@/utils/auth/jwtStorage";
import {router} from "expo-router";

export default function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    async function handleLogin() {
        console.log("Logging user in")
        const loginRequest: LoginRequest = {
            email: email,
            password: password
        }
        const loginResponse = await userApi.postUserLogin(loginRequest)
        if (loginResponse) {
            await saveJwt(loginResponse.jwt);
            router.navigate("/")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.logo}>Sedeo</Text>
                <Text style={styles.header2}>Zaloguj się</Text>
                <Text style={styles.text14Medium}>Witaj ponownie!</Text>
            </View>

            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={email => setEmail(email)}
                    placeholder={"Email"}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                    placeholder={"Hasło"}
                />
            </View>

            <View style={styles.buttonContainer}>
                <MajorButton
                    onPress={() => {console.log("trying to log user in");handleLogin()}}
                    title={"Zaloguj się"}></MajorButton>
                <Text style={styles.text14Medium} onPress={() => router.navigate("/registration")}>Utwórz konto</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.defaultBackground,
    },
    textContainer: {
        flex: 1 / 3,
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
        flex: 1 / 4,
        gap: 15,
    },
    textInputContainer: {
        flex: 1 / 4,
        alignSelf: "center",
        minWidth: "85%",
        marginVertical: "5%",
        gap: 15,
    },
    logo: {
        ...TextStyles.appLogoText,
        color: Colors.logo,
        textAlign: "center",
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
