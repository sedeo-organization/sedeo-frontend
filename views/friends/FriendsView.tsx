import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TabButton from "@/components/TabButton";
import {Colors} from "@/styles/Colors";
import AcceptedFriendCard from "@/components/AcceptedFriendCard";
import FriendRequestCard from "@/components/FriendRequestCard";
import FloatingActionButton from "@/components/FloatingActionButton";
import {TextStyles} from "@/styles/CommonStyles";
import {userApi} from "@/utils/api/userApi";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {router} from "expo-router";
import {ChangeFriendInvitationStatusRequest} from "@/model/User";

const FriendsView = () => {
    const [selectedTab, setSelectedTab] = useState('Zaakceptowani');
    const [acceptedFriends, setAcceptedFriends] = useState<AcceptedFriend[]>([]);
    const [friendInvitations, setFriendInvitations] = useState<FriendInvitation[]>([]);
    const [refetchAcceptedFriends, setRefetchAcceptedFriends] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    async function fetchAcceptedFriends() {
        setIsLoading(true);
        const _acceptedFriends = await userApi.getFriends();
        if (_acceptedFriends) {
            setAcceptedFriends(_acceptedFriends.friends);
            setIsLoading(false);
        }
    }

    async function fetchFriendInvitations() {
        setIsLoading(true);
        const _friendInvitations = await userApi.getFriendInvitations();
        setFriendInvitations(_friendInvitations.invitingUsers);
        setIsLoading(false);
    }

    async function acceptFriendInvitation(invitingUserId: string) {
        const changeFriendInvitationStatusRequest: ChangeFriendInvitationStatusRequest = {
            invitingUserId: invitingUserId,
            status: "ACCEPTED"
        }
        await userApi.patchChangeFriendInvitationStatus(changeFriendInvitationStatusRequest)
        await fetchFriendInvitations();
    }

    async function rejectFriendInvitation(invitingUserId: string) {
        const changeFriendInvitationStatusRequest: ChangeFriendInvitationStatusRequest = {
            invitingUserId: invitingUserId,
            status: "REJECTED"
        }
        await userApi.patchChangeFriendInvitationStatus(changeFriendInvitationStatusRequest)
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

    const renderInvitationCard = ({item}: { item: FriendInvitation }) => (
        <FriendRequestCard
            key={item.userId}
            firstName={item.firstName}
            lastName={item.lastName}
            onAccept={() => acceptFriendInvitation(item.userId)}
            onDecline={() => rejectFriendInvitation(item.userId)}
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
                    data={friendInvitations}
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