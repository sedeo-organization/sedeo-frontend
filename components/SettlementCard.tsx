import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";

interface SettlementCardProps {
    settlementId: string;
    title: string;
    totalValue: string;
    onCardPress: () => void;
}

const SettlementCard = (settlementCardProps: SettlementCardProps) => {
    return (
        <TouchableOpacity style={styles.card} onPress={settlementCardProps.onCardPress}>
            <View style={styles.text}>
                <Text>{settlementCardProps.title}</Text>
                <Text>{settlementCardProps.totalValue}zł</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
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
    text: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});

export default SettlementCard;