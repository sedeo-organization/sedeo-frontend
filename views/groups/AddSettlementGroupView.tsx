import React, {useContext, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "@/styles/Colors";
import NextButton from "@/components/NextButton";
import {TextStyles} from "@/styles/CommonStyles";
import {router} from "expo-router";
import AddSettlementGroupContext from "@/store/add-settlement-group-context";

const AddSettlementGroupView = () => {
    const [currentTitle, setCurrentTitle] = useState("");
    const {title, setTitle} = useContext(AddSettlementGroupContext);

    function changeGroupTitle(newTitle: string) {
        setTitle(newTitle)
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"handled"}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.text40Medium}>Dodaj grupę</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.input}
                        value={currentTitle}
                        onChangeText={setCurrentTitle}
                        placeholder={"Tytuł grupy rozliczeniowej"}
                    />
                </View>
                <View style={styles.nextButtonContainer}>
                    <NextButton onPress={() => {
                        changeGroupTitle(currentTitle)
                        router.navigate("/add-settlement-group-participant")
                    }}></NextButton>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.defaultBackground,
        gap: 20,
    },
    nextButtonContainer: {
        flex: 1 / 2,
        justifyContent: "center",
        alignSelf: "center"
    },
    textInputContainer: {
        flex: 1 / 4,
        alignSelf: "center",
        minWidth: "85%",
    },
    input: {
        height: 50,
        padding: 10,
        color: Colors.textInputColor,
        backgroundColor: Colors.textInputBackground,
        borderRadius: 10,
    },
    headerContainer: {
        flex: 1 / 10,
        justifyContent: 'flex-start',
        marginHorizontal: 30,
    },
    text40Medium: {
        ...TextStyles.text40Medium,
        color: Colors.primary,
        flexGrow: 0,
    },
});

export default AddSettlementGroupView;