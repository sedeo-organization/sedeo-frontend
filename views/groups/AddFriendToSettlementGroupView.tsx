import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SearchBar} from "@/components/SearchBar";
import {Colors} from "@/styles/Colors";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {AddFriendCard} from "@/components/AddFriendCard";
import {friendApi} from "@/utils/api/friendApi"
import AddSettlementGroupContext from "@/store/add-settlement-group-context";

export default function AddFriendToSettlementGroupView() {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [searchedFriends, setSearchedFriends] = useState<AcceptedFriend[]>([]);
    const [loading, setLoading] = useState(false);
    const {contextFriends, setContextFriends} = useContext(AddSettlementGroupContext);

    useEffect(() => {
        if (searchPhrase) {
            fetchData();
        } else {
            setSearchedFriends([]);
            setLoading(false);
        }
    }, [searchPhrase]);

    const fetchData = async () => {
        setLoading(true);
        const response = await friendApi.getFriends();
        if (response) {
            let filteredFriends = response.friends
                .filter((friend: AcceptedFriend) =>
                    friend.firstName.toLowerCase().startsWith(searchPhrase.toLowerCase()) ||
                    friend.lastName.toLowerCase().startsWith(searchPhrase.toLowerCase()) ||
                    friend.phoneNumber.startsWith(searchPhrase)
                );
            let alreadyAddedFriendIds = contextFriends.map((friend: AcceptedFriend) => friend.userId);
            let filteredNewFriends = filteredFriends.filter((friend: AcceptedFriend) =>
                !alreadyAddedFriendIds.includes(friend.userId)
            );
            setSearchedFriends(filteredNewFriends);
            setLoading(false);
        }
    };

    function addFriendToSettlementGroup(friend: AcceptedFriend) {
        setContextFriends((prevFriends) => [...prevFriends, friend]);
        console.log(contextFriends)
    }

    const renderAddFriendCard = ({item}: { item: AcceptedFriend }) => (
        <AddFriendCard
            key={item.userId}
            firstName={item.firstName}
            lastName={item.lastName}
            phoneNumber={item.phoneNumber}
            onAddPress={() => {
                addFriendToSettlementGroup(item)
                setSearchedFriends((prevPotentialFriends) => prevPotentialFriends.filter(potentialFriend => potentialFriend.userId !== item.userId));
            }}
        />
    );

    return (
        <View style={styles.container}>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
                textInputPlaceholder={"Wyszukaj znajomych"}
            />

            {loading ? (
                <CircularActivityIndicator></CircularActivityIndicator>
            ) : (
                <FlatList
                    data={searchedFriends}
                    keyExtractor={(item) => item.userId}
                    renderItem={renderAddFriendCard}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.defaultBackground,
        gap: 20,
        paddingHorizontal: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
});