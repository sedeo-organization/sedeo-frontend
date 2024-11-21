import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CardStyles, TextStyles} from "@/styles/CommonStyles";

interface CustomCardProps {
    leftText?: string;
    rightText?: string;
    backgroundColor?: string;
}

const { height } = Dimensions.get('window');

const AccountBalanceCard = (cardProps: CustomCardProps) => {
    return (
        <View style={[styles.cardContainer, {backgroundColor: cardProps.backgroundColor || Colors.darkGrey}]}>
            <View style={styles.leftTextContainer}>
                {cardProps.leftText ? <Text style={styles.text18Medium}>{cardProps.leftText}</Text> : null}
            </View>
            <View style={styles.rightTextContainer}>
                {cardProps.rightText ? <Text style={styles.text32Regular}>{cardProps.rightText}</Text> : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: '7%',
        marginVertical: '2%',
        minHeight: height * 0.15,
        maxHeight: height * 0.15,
        ...CardStyles.cardShadow,
        borderRadius: 30,
    },
    leftTextContainer: {
        position: 'absolute',
        marginTop: '3%',
        marginLeft: '7%'
    },
    rightTextContainer: {
        flex: 1,
        marginLeft: '7%',
        justifyContent: 'center'
    },
    text18Medium: {
        ...TextStyles.text18Medium,
        color: Colors.textWhite,
    },
    text32Regular: {
        ...TextStyles.text32Regular,
        color: Colors.textWhite
    }
});

export default AccountBalanceCard;