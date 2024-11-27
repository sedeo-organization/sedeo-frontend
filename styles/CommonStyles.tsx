import { StyleSheet } from 'react-native';
import {Colors} from "@/styles/Colors";

const SEMI_BOLD_FONT = 'poppins-semi-bold'
const MEDIUM_FONT = 'poppins-medium'
const REGULAR_FONT = 'poppins-regular'
const LOGO_FONT = 'gfs-didot-regular'

export const TextStyles = StyleSheet.create({
    appLogoText: {
        fontSize: 74,
        fontFamily: LOGO_FONT,
        color: Colors.logo
    },
    header1: {
        fontSize: 40,
        fontFamily: MEDIUM_FONT,
    },
    header2: {
        fontSize: 30,
        fontFamily: SEMI_BOLD_FONT,
    },
    text20SemiBold: {
        fontSize: 20,
        fontFamily: SEMI_BOLD_FONT,
    },
    text16Medium: {
        fontSize: 16,
        fontFamily: MEDIUM_FONT,
    },
    text14SemiBold: {
        fontSize: 14,
        fontFamily: SEMI_BOLD_FONT,
    },
    text14Medium: {
        fontSize: 14,
        fontFamily: MEDIUM_FONT
    },
    text20Medium: {
        fontSize: 20,
        fontFamily: MEDIUM_FONT
    },
    text18Medium: {
        fontSize: 18,
        fontFamily: MEDIUM_FONT
    },
    text32Regular: {
        fontSize: 32,
        fontFamily: REGULAR_FONT
    },
    text18Regular: {
        fontSize: 18,
        fontFamily: REGULAR_FONT
    },
    text36Medium: {
        fontSize: 36,
        fontFamily: MEDIUM_FONT
    },
    text40Medium: {
        fontSize: 40,
        fontFamily: MEDIUM_FONT
    }
});

export const CardStyles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#2E2E2E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 5,
    }
})