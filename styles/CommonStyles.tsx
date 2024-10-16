import { StyleSheet } from 'react-native';
import {Colors} from "@/styles/Colors";

const SEMI_BOLD_FONT = 'Poppins_600SemiBold'
const MEDIUM_FONT = 'Poppins_500Medium'
const REGULAR_FONT = 'Poppins_400Regular'
const LOGO_FONT = 'GFS Didot'

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
    }
});