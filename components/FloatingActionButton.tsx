import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {CardStyles} from "@/styles/CommonStyles";
import {Colors} from "@/styles/Colors";

interface FloatingActionButtonProps {
    onPress: () => void;
}

const FloatingActionButton = (floatingActionButtonProps: FloatingActionButtonProps) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={floatingActionButtonProps.onPress}>
            <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 48,
        height: 48,
        right: 24,
        bottom: 60,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        ...CardStyles.cardShadow,
        borderRadius: 30,
    },
});

export default FloatingActionButton;