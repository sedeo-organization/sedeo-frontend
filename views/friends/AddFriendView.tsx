import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SearchBar} from "@/components/SearchBar";
import {Colors} from "@/styles/Colors";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {AddFriendCard} from "@/components/AddFriendCard";
import {friendApi} from "@/utils/api/friendApi";

export default function AddFriendView() {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [potentialFriends, setPotentialFriends] = useState<PotentialFriend[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchPhrase) {
            fetchData();
        } else {
            setPotentialFriends([]);
            setLoading(false);
        }
    }, [searchPhrase]);

    const fetchData = async () => {
        setLoading(true);
        const response = await friendApi.getPotentialFriends(searchPhrase);
        if (response) {
            setPotentialFriends(response.potentialFriends);
            setLoading(false);
        }
    };

    async function sendFriendInvitation(userId: string) {
        const invitationRequest: AddFriendshipInvitationRequest = {
            invitedUserId: userId,
        };
        await friendApi.sendFriendshipInvitation(invitationRequest);
    }

    const renderAddFriendCard = ({item}: { item: PotentialFriend }) => (
        <AddFriendCard
            key={item.userId}
            firstName={item.firstName}
            lastName={item.lastName}
            phoneNumber={item.phoneNumber}
            onAddPress={() => {
                sendFriendInvitation(item.userId);
                setPotentialFriends((prevPotentialFriends) => prevPotentialFriends.filter(potentialFriend => potentialFriend.userId !== item.userId));
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
                    data={potentialFriends}
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