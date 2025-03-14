import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";

interface SettlementGroupCardProps {
    groupId: string;
    title: string;
    onPress: () => void;
}

const SettlementGroupCard = (settlementGroupCardProps: SettlementGroupCardProps) => {
    return (
        <TouchableOpacity style={styles.card} onPress={settlementGroupCardProps.onPress}>
            <View>
                <Text>{settlementGroupCardProps.title}</Text>
            </View>
        </TouchableOpacity>
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

export default SettlementGroupCard;