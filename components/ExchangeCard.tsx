import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";
import {ExchangeArrowIcon} from "@/assets/icons/ExchangeArrowIcon";
import MajorButton from "@/components/MajorButton";
import { CheckIcon } from '@/assets/icons/CheckIcon';

interface ExchangeCardProps {
    creditorId?: string;
    creditorFirstName?: string;
    creditorLastName?: string;
    debtorId?: string;
    debtorFirstName?: string;
    debtorLastName?: string;
    exchangeValue?: string;
    status?: string;
    currentUserId?: string;
    onButtonPress: () => void;
}

export const ExchangeCard = (exchangeCardProps: ExchangeCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.names}>
                <View style={styles.nameColumn}>
                    <Text style={{textAlign: "center"}}>{exchangeCardProps.creditorFirstName}</Text>
                    <Text style={{textAlign: "center"}}>{exchangeCardProps.creditorLastName}</Text>
                </View>
                <View style={styles.inputAndArrow}>
                    <ExchangeArrowIcon />
                    <View style={styles.textContainer}>
                        <TextInput
                            style={styles.input}
                            value={exchangeCardProps?.exchangeValue + "zł"}
                            keyboardType="numeric"
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>
                </View>
                <View style={styles.nameColumn}>
                    <Text style={{textAlign: "center"}}>{exchangeCardProps.debtorFirstName}</Text>
                    <Text style={{textAlign: "center"}}>{exchangeCardProps.debtorLastName}</Text>
                </View>
            </View>

            {exchangeCardProps.status === "PENDING" && exchangeCardProps.currentUserId === exchangeCardProps.creditorId ? (
                <MajorButton title={"Rozlicz"} onPress={exchangeCardProps.onButtonPress}></MajorButton>
            ) : exchangeCardProps.status === "SETTLED" ? (
                <CheckIcon style={styles.checkIcon}></CheckIcon>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 80,
        maxWidth: 80
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
        backgroundColor: Colors.defaultBackground,
        borderRadius: 10,
        marginVertical: "2%",
        textAlign: "center",
    },
    inputAndArrow: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
});
