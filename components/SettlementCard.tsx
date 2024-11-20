import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";

interface SettlementCardProps {
    settlementId: string;
    title: string;
    totalValue: string;
}

const SettlementCard = (settlementCardProps: SettlementCardProps) => {
    return (
        <View style={styles.card}>
            <Text>{settlementCardProps.title}</Text>
            <Text>{settlementCardProps.totalValue}zł</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
});

export default SettlementCard;