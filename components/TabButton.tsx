import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {Colors} from "@/styles/Colors";

interface TabButtonProps {
    title: string;
    onPress: () => void;
    selected: boolean;
}

const TabButton = (tabButtonProps: TabButtonProps) => {
    return (
        <TouchableOpacity
            onPress={tabButtonProps.onPress}
            style={tabButtonProps.selected ? styles.selectedButton : styles.unselectedButton}
        >
            <Text style={tabButtonProps.selected ? styles.selectedText : styles.unselectedText}>{tabButtonProps.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    selectedButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        shadowColor: 'rgba(46, 46, 46, 0.15)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 15,
        borderRadius: 30,
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        minWidth: 150,
    },
    unselectedButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(46, 46, 46, 0.85)',
        borderRadius: 30,
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        minWidth: 150,
    },
    selectedText: {
        fontSize: 16,
        color: Colors.textWhite,
        fontWeight: 'bold',
    },
    unselectedText: {
        fontSize: 16,
        color: Colors.darkGrey,
        fontWeight: 'bold',
    },
});

export default TabButton;
