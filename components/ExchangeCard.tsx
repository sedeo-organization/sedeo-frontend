import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";
import {MaterialIcons} from "@expo/vector-icons";
import {ExchangeArrowIcon} from "@/assets/icons/ExchangeArrowIcon";

interface ExchangeCardProps {
    creditorFirstName?: string;
    creditorLastName?: string;
    debtorFirstName?: string;
    debtorLastName?: string;
    exchangeValue?: string;
    onCreditorPress: () => void;
    onDebtorPress: () => void;
    onTextChange: (text: string) => void;
}

export const ExchangeCard = (exchangeCardProps: ExchangeCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.names}>
                {exchangeCardProps.debtorFirstName ? (
                    <TouchableOpacity onPress={exchangeCardProps.onDebtorPress}>
                        <Text>{exchangeCardProps.debtorFirstName}</Text>
                        <Text>{exchangeCardProps.debtorLastName}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={exchangeCardProps.onDebtorPress}>
                        <MaterialIcons name="add" size={24} color={Colors.lighterGrey} />
                    </TouchableOpacity>
                )}
                <View style={styles.inputAndArrow}>
                    <ExchangeArrowIcon />
                    <View style={styles.textContainer}>
                        <TextInput
                            style={styles.input}
                            value={exchangeCardProps?.exchangeValue}
                            keyboardType="numeric"
                            onChangeText={exchangeCardProps.onTextChange}
                        />
                    </View>
                </View>
                {exchangeCardProps.creditorFirstName ? (
                    <TouchableOpacity onPress={exchangeCardProps.onCreditorPress}>
                        <Text>{exchangeCardProps.creditorFirstName}</Text>
                        <Text>{exchangeCardProps.creditorLastName}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={exchangeCardProps.onCreditorPress}>
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