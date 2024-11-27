import React, {useContext, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "@/styles/Colors";
import NextButton from "@/components/NextButton";
import {TextStyles} from "@/styles/CommonStyles";
import {router, useLocalSearchParams} from "expo-router";
import AddSettlementContext from "@/store/add-settlement-context";

const AddSettlementView = () => {
    const [currentTitle, setCurrentTitle] = useState("");
    const {groupId} = useLocalSearchParams<{ groupId: string }>();
    const [currentTotalValue, setCurrentTotalValue] = useState<string>("");
    const {settlementTitle, setSettlementTitle} = useContext(AddSettlementContext);
    const {totalSettlementValue, setTotalSettlementValue} = useContext(AddSettlementContext);

    function changeSettlementTitle(newTitle: string) {
        setSettlementTitle(newTitle)
    }

    function changeSettlementTotalValue(newSettlementTotalValue: string) {
        setTotalSettlementValue(Number(newSettlementTotalValue))
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"handled"}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.text40Medium}>Dodaj rozliczenie</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.input}
                        value={currentTitle}
                        onChangeText={setCurrentTitle}
                        placeholder={"Tytuł rozliczenia"}
                    />
                    <TextInput
                        style={styles.input}
                        value={currentTotalValue.toString()}
                        keyboardType="numeric"
                        onChangeText={text => {
                            if (/^\d*\.?\d{0,2}$/.test(text)) {
                                setCurrentTotalValue(text);
                            }
                        }}
                        placeholder={"Kwota rozliczenia"}
                    />
                </View>
                <View style={styles.nextButtonContainer}>
                    <NextButton onPress={() => {
                        changeSettlementTitle(currentTitle)
                        changeSettlementTotalValue(currentTotalValue)
                        router.navigate({
                            pathname: "/add-settlement-exchange",
                            params: {groupId: groupId},
                        })
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
        marginVertical: "5%",
    },
    input: {
        height: 50,
        padding: 10,
        color: Colors.textInputColor,
        backgroundColor: Colors.textInputBackground,
        borderRadius: 10,
        marginVertical: "2%"
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

export default AddSettlementView;