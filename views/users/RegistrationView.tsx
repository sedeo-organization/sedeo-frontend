import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";
import {TextStyles} from "@/styles/CommonStyles";
import {Colors} from "@/styles/Colors";
import MajorButton from "@/components/MajorButton";
import {userApi} from "@/utils/api/userApi";
import {RegisterUserRequest} from "@/model/User";

export default function RegistrationView() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")

    async function handleCreateUser() {
        console.log("Registering user")
        const registerUserRequest: RegisterUserRequest = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            password: password
        }
        await userApi.postUserRegistration(registerUserRequest)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header2}>Stwórz konto</Text>
                <Text style={styles.text14Medium}>Stwórz konto aby rozliczać się ze znajomymi!</Text>
            </View>

            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={email => setEmail(email)}
                    placeholder={"Email"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={firstName => setFirstName(firstName)}
                    placeholder={"Imię"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={lastName => setLastName(lastName)}
                    placeholder={"Nazwisko"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                    placeholder={"Numer telefonu"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={password => setPassword(password)}
                    placeholder={"Hasło"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={password => setRepeatedPassword(password)}
                    placeholder={"Potwierdź hasło"}
                />
            </View>

            <View style={styles.buttonContainer}>
                <MajorButton
                    onPress={() => handleCreateUser()}
                    title={"Zarejestruj się"}></MajorButton>
                <Text style={styles.text14Medium} onPress={() => console.log("Navigate to login view")}>Posiadam już
                    konto</Text>
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
        flex: 1,
        alignSelf: "center",
        minWidth: "85%",
        marginVertical: "5%",
        justifyContent: "space-evenly",
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
