import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles} from "@/styles/CommonStyles";
import {MaterialIcons} from "@expo/vector-icons";

interface AddFriendCardProps {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    onAddPress: () => void;
}

export const AddFriendCard = (addFriendCardProps: AddFriendCardProps) => {
    return (
        <View style={styles.card}>
            <Text>{addFriendCardProps.firstName} {addFriendCardProps.lastName}</Text>
            <Text>{addFriendCardProps.phoneNumber}</Text>
            <TouchableOpacity onPress={addFriendCardProps.onAddPress}>
                <MaterialIcons name="add" size={24} color={Colors.lighterGrey} />
            </TouchableOpacity>
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