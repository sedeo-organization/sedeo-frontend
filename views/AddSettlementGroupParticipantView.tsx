import React, {useContext, useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {Colors} from "@/styles/Colors";
import AcceptedFriendCard from "@/components/AcceptedFriendCard";
import FloatingActionButton from "@/components/FloatingActionButton";
import {router} from "expo-router";
import MajorButton from "@/components/MajorButton";
import AddSettlementGroupContext, {AddSettlementGroupContextData} from "@/store/add-settlement-group-context";
import {settlementGroupApi} from "@/utils/api/settlementGroupApi";
import {uuid} from "expo-modules-core";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";

const AddSettlementGroupParticipantView = () => {
    const [acceptedFriends, setAcceptedFriends] = useState<AcceptedFriend[]>([]);
    const addSettlementGroupContextData: AddSettlementGroupContextData = useContext(AddSettlementGroupContext);
    const [isLoading, setIsLoading] = useState(false);

    const renderAcceptedCard = ({item}: {
        item: AcceptedFriend
    }) => (
        <AcceptedFriendCard
            key={item.userId}
            firstName={item.firstName}
            lastName={item.lastName}
            phone={item.phoneNumber}
        />
    );

    useEffect(() => {
        setAcceptedFriends(addSettlementGroupContextData.contextFriends)
    }, [addSettlementGroupContextData.contextFriends]);

    const renderList = () => {
        return (
            <FlatList
                data={acceptedFriends}
                renderItem={renderAcceptedCard}
                keyExtractor={(item) => item.userId}
            />
        );
    };

    const addSettlementGroup = async () => {
        const settlementGroupRequest: CreateSettlementGroupRequest = {
            groupId: uuid.v4(),
            title: addSettlementGroupContextData.title,
            participantIds: addSettlementGroupContextData.contextFriends.map((friend: AcceptedFriend) => friend.userId)
        };
        await settlementGroupApi.createSettlementGroup(settlementGroupRequest);
        setIsLoading(false)
    }

    const handleAddGroup = async () => {
        setIsLoading(true);
        await addSettlementGroup();
        router.navigate('/settlements');
    };

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                {acceptedFriends.length > 0 ?
                    renderList() :
                    <Text style={styles.emptyListText}>Dodaj znajomych do grupy</Text>}
            </View>
            <View style={styles.actionButtonContainer}>
                <FloatingActionButton onPress={() => router.navigate("/add-friend-to-settlement-group")}/>
            </View>
            <View style={styles.majorButtonContainer}>
                <MajorButton title={"Dodaj grupę"} onPress={() => {
                    handleAddGroup()
                }}></MajorButton>
            </View>
            {isLoading ? (<CircularActivityIndicator></CircularActivityIndicator>) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.defaultBackground,
        gap: 20,
    },
    listContainer: {
        flex: 1,
    },
    emptyListText: {
        justifyContent: "center",
        alignSelf: "center",
        color: Colors.textInputColor
    },
    actionButtonContainer: {
        justifyContent: "flex-end"
    },
    majorButtonContainer: {
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: "10%",
    },
});

export default AddSettlementGroupParticipantView;