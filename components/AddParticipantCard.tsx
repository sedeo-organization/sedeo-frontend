import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";
import {MaterialIcons} from "@expo/vector-icons";

interface AddParticipantCardProps {
    firstName: string;
    lastName: string;
    onAddPress: () => void;
}

export const AddParticipantCard = (addParticipantCardProps: AddParticipantCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{addParticipantCardProps.firstName} {addParticipantCardProps.lastName}</Text>
            <TouchableOpacity style={styles.icon} onPress={addParticipantCardProps.onAddPress}>
                <MaterialIcons name="add" size={24} color={Colors.lighterGrey} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    name: {
        flex: 1,
        textAlign: "center",
    },
    icon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});