import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import {Colors} from "@/styles/Colors";

interface SearchBarProps {
    clicked: boolean;
    searchPhrase: string;
    setSearchPhrase: (phrase: string) => void;
    setClicked: (value: boolean) => void;
}

export const SearchBar = (searchBarProps: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <View
                style={
                    searchBarProps.clicked
                        ? styles.searchBarClicked
                        : styles.searchBarUnclicked
                }
            >
                <Feather
                    name="search"
                    size={20}
                    color="#A9A9A9"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Wyszukaj znajomych"
                    placeholderTextColor="#A9A9A9"
                    value={searchBarProps.searchPhrase}
                    onChangeText={searchBarProps.setSearchPhrase}
                    onFocus={() => {
                        searchBarProps.setClicked(true);
                    }}
                />
                <View style={styles.crossIconContainer}>
                    {searchBarProps.clicked && (
                        <Entypo
                            name="cross"
                            size={20}
                            color="#A9A9A9"
                            onPress={() => {
                                searchBarProps.setSearchPhrase("");
                                Keyboard.dismiss();
                                searchBarProps.setClicked(false);
                            }}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "95%",
        margin: "5%",
        alignSelf: "center",
    },
    searchBarUnclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#e5e5e5",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    searchBarClicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#e5e5e5",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        flex: 7/8,
        color: Colors.lighterGrey,
    },
    crossIconContainer: {
        flex: 1 / 8,
        justifyContent: "center",
        alignItems: "center",
    },
});