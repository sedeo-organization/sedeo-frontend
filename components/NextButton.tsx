import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import NextIcon from "@/assets/icons/NextIcon";

interface NextButtonProps {
    onPress: () => void;
}

const NextButton = (nextButtonProps: NextButtonProps) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={nextButtonProps.onPress}>
            <NextIcon></NextIcon>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NextButton;