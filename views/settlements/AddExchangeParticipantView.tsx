import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SearchBar} from "@/components/SearchBar";
import {Colors} from "@/styles/Colors";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {router, useLocalSearchParams} from "expo-router";
import {settlementGroupApi} from "@/utils/api/settlementGroupApi";
import AddSettlementContext from "@/store/add-settlement-context";
import {AddParticipantCard} from "@/components/AddParticipantCard";

export default function AddExchangeParticipantView() {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [searchedGroupParticipants, setSearchedGroupParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(false);
    const { exchangeId } = useLocalSearchParams<{ exchangeId: string }>();
    const { isCreditor } = useLocalSearchParams<{ isCreditor: string }>();
    const { groupId } = useLocalSearchParams<{ groupId: string }>();
    const {contextSettlementExchanges, setContextSettlementExchanges} = useContext(AddSettlementContext);

    useEffect(() => {
        fetchData();
    }, [searchPhrase]);

    const fetchData = async () => {
        setLoading(true);
        const response = await settlementGroupApi.getParticipants(groupId);
        if (response) {
            let filteredParticipants = response.participants
            if (searchPhrase != ""){
                filteredParticipants = response.participants
                    .filter((friend: Participant) =>
                        friend.firstName.toLowerCase().startsWith(searchPhrase.toLowerCase()) ||
                        friend.lastName.toLowerCase().startsWith(searchPhrase.toLowerCase())
                    );
            }
            setSearchedGroupParticipants(filteredParticipants);
            setLoading(false);
        }
    };

    function addParticipantToExchange(participant: Participant) {
        if (isCreditor === "true") {
            setContextSettlementExchanges((prevExchanges) => {
                return prevExchanges.map(exchange => {
                    if (exchange.exchangeId === exchangeId) {
                        return {
                            ...exchange,
                            creditorFirstName: participant.firstName,
                            creditorLastName: participant.lastName,
                            creditorUserId: participant.userId,
                        };
                    }
                    return exchange;
                });
            });
        } else {
            setContextSettlementExchanges((prevExchanges) => {
                return prevExchanges.map(exchange => {
                    if (exchange.exchangeId === exchangeId) {
                        return {
                            ...exchange,
                            debtorFirstName: participant.firstName,
                            debtorLastName: participant.lastName,
                            debtorUserId: participant.userId,
                        };
                    }
                    return exchange;
                });
            });
        }
    }

    const renderAddFriendCard = ({item}: { item: Participant }) => (
        <AddParticipantCard
            key={item.userId}
            firstName={item.firstName}
            lastName={item.lastName}
            onAddPress={() => {
                addParticipantToExchange(item)
                router.navigate({
                    pathname: "/add-settlement-exchange",
                    params: {groupId: groupId},
                })
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
            />

            {loading ? (
                <CircularActivityIndicator></CircularActivityIndicator>
            ) : (
                <FlatList
                    data={searchedGroupParticipants}
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