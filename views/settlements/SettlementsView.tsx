import React, {useContext, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import FloatingActionButton from "@/components/FloatingActionButton";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {Colors} from "@/styles/Colors";
import {TextStyles} from "@/styles/CommonStyles";
import {settlementGroupApi} from "@/utils/api/settlementGroupApi";
import SettlementCard from "@/components/SettlementCard";
import AddSettlementContext from "@/store/add-settlement-context";

const SettlementView = () => {
    const { groupId } = useLocalSearchParams<{ groupId: string }>();
    const [settlements, setSettlements] = useState<Settlement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const addSettlementContext = useContext(AddSettlementContext);

    async function fetchSettlements() {
        setIsLoading(true);
        const _settlements = await settlementGroupApi.getSettlements(groupId);
        if (_settlements) {
            setSettlements(_settlements.settlements);
            setIsLoading(false);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchSettlements()
            addSettlementContext.setContextSettlementExchanges([])
            addSettlementContext.setSettlementTitle("")
            addSettlementContext.setTotalSettlementValue(0)
        }, [])
    );

    const renderSettlementCard = ({item}: { item: Settlement }) => (
        <SettlementCard
            key={item.settlementId}
            settlementId={item.settlementId}
            title={item.title}
            totalValue={item.totalValue}
            onCardPress={() => router.navigate({
                pathname: "/settlement-details",
                params: {groupId: groupId, settlementId: item.settlementId},
            })}
        />
    );

    const renderList = () => {
        return (
            <FlatList
                data={settlements}
                renderItem={renderSettlementCard}
                keyExtractor={(item) => item.settlementId}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.text40Medium}>Twoje rozliczenia</Text>
            </View>

            <View style={styles.listContainer}>
                {isLoading ? (<CircularActivityIndicator></CircularActivityIndicator>) : renderList()}
            </View>

            <View style={styles.actionButtonContainer}>
                <FloatingActionButton onPress={() => router.navigate({
                    pathname: "/add-settlement",
                    params: {groupId: groupId},
                })}
                    />
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
        flex: 1 / 14,
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
    listContainer: {
        flex: 1,
    }
});

export default SettlementView;