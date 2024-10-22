import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";

interface InvitationCardProps {
    firstName: string;
    lastName: string;
    onAccept: () => void;
    onDecline: () => void;
}

const FriendRequestCard = (invitationCardProps: InvitationCardProps) => {
    return (
        <View style={styles.card}>
            <Text>{invitationCardProps.firstName} {invitationCardProps.lastName}</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.acceptButton} onPress={invitationCardProps.onAccept}>
                    <Text style={styles.buttonText}>Zaakceptuj</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectButton} onPress={invitationCardProps.onDecline}>
                    <Text style={styles.buttonText}>Odrzuć</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    buttonGroup: {
        flexDirection: 'row',
    },
    acceptButton: {
        backgroundColor: Colors.positive,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 10,
        minWidth: 90,
        alignItems: "center"
    },
    rejectButton: {
        backgroundColor: Colors.negative,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 10,
        minWidth: 90,
        alignItems: "center"
    },
    buttonText: {
        color: Colors.textWhite
    }
});

export default FriendRequestCard;