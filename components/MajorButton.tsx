import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface MajorButtonProps {
    title: string;
    onPress: () => void;
}

const MajorButton = (majorButtonProps: MajorButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={majorButtonProps.onPress}>
            <Text style={styles.text}>{majorButtonProps.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#1F41BB',
        shadowColor: '#CBD6FF',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        borderRadius: 10,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MajorButton;
