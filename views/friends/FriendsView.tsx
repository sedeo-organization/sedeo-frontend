import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TabButton from "@/components/TabButton";
import {Colors} from "@/styles/Colors";
import AcceptedFriendCard from "@/components/AcceptedFriendCard";
import FriendRequestCard from "@/components/FriendRequestCard";
import FloatingActionButton from "@/components/FloatingActionButton";
import {TextStyles} from "@/styles/CommonStyles";
import {friendApi} from "@/utils/api/friendApi";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {router} from "expo-router";
import {ChangeFriendInvitationStatusRequest} from "@/model/User";

const FriendsView = () => {
    const [selectedTab, setSelectedTab] = useState('Zaakceptowani');
    const [acceptedFriends, setAcceptedFriends] = useState<AcceptedFriend[]>([]);
    const [friendshipInvitations, setFriendshipInvitations] = useState<FriendshipInvitation[]>([]);
    const [refetchAcceptedFriends, setRefetchAcceptedFriends] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    async function fetchAcceptedFriends() {
        setIsLoading(true);
        const _acceptedFriends = await friendApi.getFriends();
        if (_acceptedFriends) {
            setAcceptedFriends(_acceptedFriends.friends);
            setIsLoading(false);
        }
    }

    async function fetchFriendInvitations() {
        setIsLoading(true);
        const _friendInvitations = await friendApi.getFriendshipInvitations();
        setFriendshipInvitations(_friendInvitations.invitations);
        setIsLoading(false);
    }

    async function acceptFriendInvitation(invitationId: string) {
        const changeFriendInvitationStatusRequest: ChangeFriendInvitationStatusRequest = {
            status: "ACCEPTED"
        }
        await friendApi.patchChangeFriendshipInvitationStatus(changeFriendInvitationStatusRequest, invitationId)
        await fetchFriendInvitations();
    }

    async function rejectFriendInvitation(invitationId: string) {
        const changeFriendInvitationStatusRequest: ChangeFriendInvitationStatusRequest = {
            status: "REJECTED"
        }
        await friendApi.patchChangeFriendshipInvitationStatus(changeFriendInvitationStatusRequest, invitationId)
        await fetchFriendInvitations();
    }

    useEffect(() => {
        fetchAcceptedFriends();
    }, [refetchAcceptedFriends])


    const renderAcceptedCard = ({item}: { item: AcceptedFriend }) => (
        <AcceptedFriendCard
            key={item.userId}
            firstName={item.firstName}
            lastName={item.lastName}
            phone={item.phoneNumber}
        />
    );

    const renderInvitationCard = ({item}: { item: FriendshipInvitation }) => (
        <FriendRequestCard
            key={item.userId}
            firstName={item.firstName}
            lastName={item.lastName}
            phoneNumber={item.phoneNumber}
            onAccept={() => acceptFriendInvitation(item.invitationId)}
            onDecline={() => rejectFriendInvitation(item.invitationId)}
        />
    );

    const renderList = () => {
        if (selectedTab === 'Zaakceptowani') {
            return (
                <FlatList
                    data={acceptedFriends}
                    renderItem={renderAcceptedCard}
                    keyExtractor={(item) => item.userId}
                />
            );
        } else {
            return (
                <FlatList
                    data={friendshipInvitations}
                    renderItem={renderInvitationCard}
                    keyExtractor={(item) => item.userId}
                />
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.text40Medium}>Znajomi</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TabButton
                    title="Zaakceptowani"
                    onPress={() => {
                        setSelectedTab('Zaakceptowani');
                        setRefetchAcceptedFriends(!refetchAcceptedFriends);
                    }}
                    selected={selectedTab === 'Zaakceptowani'}
                />
                <TabButton
                    title="Zaproszenia"
                    onPress={() => {
                        setSelectedTab('Zaproszenia');
                        fetchFriendInvitations();
                    }}
                    selected={selectedTab === 'Zaproszenia'}
                />
            </View>

            <View style={styles.listContainer}>
                {isLoading ? (<CircularActivityIndicator></CircularActivityIndicator>) : renderList()}
            </View>

            <View style={styles.actionButtonContainer}>
                <FloatingActionButton onPress={() => router.navigate("/add-friend")}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.defaultBackground,
        gap: 20,
    },
    headerContainer: {
        flex: 1 / 6,
        justifyContent: 'flex-end',
        marginHorizontal: 15,
    },
    actionButtonContainer: {
        justifyContent: "flex-end"
    },
    text40Medium: {
        ...TextStyles.text40Medium,
        color: Colors.primary,
        flexGrow: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    listContainer: {
        flex: 1,
    }
});

export default FriendsView;