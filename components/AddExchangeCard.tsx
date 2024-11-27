import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";
import {MaterialIcons} from "@expo/vector-icons";
import {ExchangeArrowIcon} from "@/assets/icons/ExchangeArrowIcon";

interface AddExchangeCardProps {
    creditorFirstName?: string;
    creditorLastName?: string;
    debtorFirstName?: string;
    debtorLastName?: string;
    exchangeValue?: string;
    onCreditorPress: () => void;
    onDebtorPress: () => void;
    onTextChange: (text: string) => void;
}

export const AddExchangeCard = (addExchangeCardProps: AddExchangeCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.names}>
                {addExchangeCardProps.creditorFirstName ? (
                    <TouchableOpacity style={{maxWidth: 80, minWidth: 80}} onPress={addExchangeCardProps.onCreditorPress}>
                        <Text style={{textAlign: "center"}}>{addExchangeCardProps.creditorFirstName}</Text>
                        <Text style={{textAlign: "center"}}>{addExchangeCardProps.creditorLastName}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={addExchangeCardProps.onCreditorPress}>
                        <MaterialIcons name="add" size={24} color={Colors.lighterGrey} />
                    </TouchableOpacity>
                )}
                <View style={styles.inputAndArrow}>
                    <ExchangeArrowIcon />
                    <View style={styles.textContainer}>
                        <TextInput
                            style={styles.input}
                            value={addExchangeCardProps?.exchangeValue}
                            keyboardType="numeric"
                            onChangeText={addExchangeCardProps.onTextChange}
                        />
                    </View>
                </View>
                {addExchangeCardProps.debtorFirstName ? (
                    <TouchableOpacity style={{maxWidth: 80, minWidth: 80}} onPress={addExchangeCardProps.onDebtorPress}>
                        <Text style={{textAlign: "center"}}>{addExchangeCardProps.debtorFirstName}</Text>
                        <Text style={{textAlign: "center"}}>{addExchangeCardProps.debtorLastName}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={addExchangeCardProps.onDebtorPress}>
                        <MaterialIcons name="add" size={24} color={Colors.lighterGrey} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginHorizontal: 15,
        marginVertical: 1,
        marginBottom: 15,
        backgroundColor: Colors.defaultBackground,
        ...CardStyles.cardShadow,
        minHeight: 62,
        borderRadius: 30,
    },
    names: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    centerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        padding: 10,
        minWidth: '45%',
        color: Colors.textInputColor,
        backgroundColor: Colors.textInputBackground,
        borderRadius: 10,
        marginVertical: "2%",
        textAlign: "center"
    },
    inputAndArrow: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});