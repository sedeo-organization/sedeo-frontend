import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import TabButton from "@/components/TabButton";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import FloatingActionButton from "@/components/FloatingActionButton";
import {router} from "expo-router";
import {Colors} from "@/styles/Colors";
import {TextStyles} from "@/styles/CommonStyles";
import SettlementGroupCard from "@/components/SettlementGroupCard";
import {settlementGroupApi} from "@/utils/api/settlementGroupApi";

const SettlementGroupsView = () => {
    const [selectedTab, setSelectedTab] = useState('Oczekujące');
    const [pendingSettlementGroups, setPendingSettlementGroups] = useState<SettlementGroup[]>([]);
    const [settledSettlementGroups, setSettledSettlementGroups] = useState<SettlementGroup[]>([]);
    const [refetchPendingSettlementGroups, setRefetchPendingSettlementGroups] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    async function fetchPendingSettlementGroups() {
        setIsLoading(true);
        const _pendingGroups = await settlementGroupApi.getSettlementGroups("pending");
        if (_pendingGroups) {
            setPendingSettlementGroups(_pendingGroups.settlementGroups);
            setIsLoading(false);
        }
    }

    async function fetchSettledSettlementGroups() {
        setIsLoading(true);
        const _settledSettlementGroups = await settlementGroupApi.getSettlementGroups("settled");
        if (_settledSettlementGroups) {
            setSettledSettlementGroups(_settledSettlementGroups.settlementGroups);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPendingSettlementGroups();
    }, [refetchPendingSettlementGroups])

    const renderSettlementGroupCard = ({ item }: { item: SettlementGroup }) => (
        <SettlementGroupCard
            key={item.groupId}
            groupId={item.groupId}
            title={item.title}
        />
    );

    const renderList = () => {
        if (selectedTab === 'Oczekujące') {
            return (
                <FlatList
                    data={pendingSettlementGroups}
                    renderItem={renderSettlementGroupCard}
                    keyExtractor={(item) => item.groupId}
                />
            );
        } else {
            return (
                <FlatList
                    data={settledSettlementGroups}
                    renderItem={renderSettlementGroupCard}
                    keyExtractor={(item) => item.groupId}
                />
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.text40Medium}>Twoje grupy</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TabButton
                    title="Oczekujące"
                    onPress={() => {
                        setSelectedTab('Oczekujące');
                        setRefetchPendingSettlementGroups(!refetchPendingSettlementGroups);
                    }}
                    selected={selectedTab === 'Oczekujące'}
                />
                <TabButton
                    title="Rozliczone"
                    onPress={() => {
                        setSelectedTab('Rozliczone');
                        fetchSettledSettlementGroups();
                    }}
                    selected={selectedTab === 'Rozliczone'}
                />
            </View>

            <View style={styles.listContainer}>
                {isLoading ? (<CircularActivityIndicator></CircularActivityIndicator>) : renderList()}
            </View>

            <View style={styles.actionButtonContainer}>
                <FloatingActionButton onPress={() => router.navigate("/add-settlement-group")} />
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

export default SettlementGroupsView;