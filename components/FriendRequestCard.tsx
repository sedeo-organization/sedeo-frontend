import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles, TextStyles} from "@/styles/CommonStyles";

interface InvitationCardProps {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    onAccept: () => void;
    onDecline: () => void;
}

const FriendRequestCard = (invitationCardProps: InvitationCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.text18Regular}>{invitationCardProps.firstName} {invitationCardProps.lastName}</Text>
                <Text style={styles.text18Regular}>{invitationCardProps.phoneNumber}</Text>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.rejectButton} onPress={invitationCardProps.onDecline}>
                    <Text style={styles.rejectButtonText}>Odrzuć</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={invitationCardProps.onAccept}>
                    <Text style={styles.acceptButtonText}>Zaakceptuj</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginHorizontal: 15,
        marginVertical: 1,
        marginBottom: 15,
        backgroundColor: Colors.defaultBackground,
        ...CardStyles.cardShadow,
        minHeight: 62,
        borderRadius: 30,
        gap: 20
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        flex: 1,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        paddingVertical: '2%',
    },
    acceptButton: {
        backgroundColor: Colors.positive,
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        shadowColor: '#CBD6FF',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        borderRadius: 10,
        minWidth: 120
    },
    rejectButton: {
        backgroundColor: Colors.textInputBackground,
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        shadowColor: '#CBD6FF',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        borderRadius: 10,
        minWidth: 120,
    },
    acceptButtonText: {
        color: Colors.textWhite,
        ...TextStyles.text14Regular
    },
    rejectButtonText: {
        color: Colors.darkGrey,
        ...TextStyles.text14Regular
    },
    text18Regular: {
        ...TextStyles.text18Regular,
        color: Colors.darkGrey,
    },
});

export default FriendRequestCard;