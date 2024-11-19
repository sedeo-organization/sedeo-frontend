import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "@/styles/Colors";
import NextButton from "@/components/NextButton";
import {TextStyles} from "@/styles/CommonStyles";

const AddSettlementGroupView = () => {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.text40Medium}>Dodaj grupę</Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    placeholder="Tytuł rozliczenia"
                />
            </View>
            <View style={styles.nextButtonContainer}>
                <NextButton onPress={() => console.log("Pressed next button")}></NextButton>
            </View>
        </View>
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