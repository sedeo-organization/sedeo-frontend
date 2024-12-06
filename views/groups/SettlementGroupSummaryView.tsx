import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import TabButton from "@/components/TabButton";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import {Colors} from "@/styles/Colors";
import {TextStyles} from "@/styles/CommonStyles";
import {settlementGroupApi} from "@/utils/api/settlementGroupApi";
import {ExchangeCard} from "@/components/ExchangeCard";
import {getJwt} from "@/utils/auth/jwtStorage";
import {jwtDecode} from "jwt-decode/build/esm";

const SettlementGroupSummaryView = () => {
    const {groupId} = useLocalSearchParams<{ groupId: string }>();
    const [selectedTab, setSelectedTab] = useState('Oczekujące');
    const [pendingSummaries, setPendingSummaries] = useState<SummarisedExchange[]>([]);
    const [overallSummaries, setOverallSummaries] = useState<SummarisedExchange[]>([]);
    const [refetchPendingSummaries, setRefetchPendingSummaries] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | undefined>("");

    async function extractClaims() {
        const plainJwt = await getJwt();
        if (plainJwt) {
            const decodedClaims = jwtDecode(plainJwt);
            setCurrentUserId(decodedClaims.sub)
        }
    }

    async function fetchPendingSummaries() {
        setIsLoading(true);
        const _pendingSummaries = await settlementGroupApi.getGroupSummaries(groupId, "pending");
        if (_pendingSummaries) {
            setPendingSummaries(_pendingSummaries.summarisedExchanges);
            setIsLoading(false);
        }
    }

    async function fetchOverallSummaries() {
        setIsLoading(true);
        const _overallSummaries = await settlementGroupApi.getGroupSummaries(groupId, "");
        if (_overallSummaries) {
            setOverallSummaries(_overallSummaries.summarisedExchanges);
            setIsLoading(false);
        }
    }

    async function batchSettleExchanges(creditorUserId: string, debtorUserId: string) {
        setIsLoading(true)
        const batchSettleExchangesRequest: BatchSettleExchangesRequest = {
            creditorUserId,
            debtorUserId
        };
        await settlementGroupApi.patchBatchSettleExchanges(groupId, batchSettleExchangesRequest);
        await fetchPendingSummaries()
        setIsLoading(false)
    }

    useFocusEffect(
        React.useCallback(() => {
            extractClaims()
            fetchPendingSummaries()
        }, [])
    );

    useEffect(() => {
        fetchPendingSummaries();
    }, [refetchPendingSummaries])

    const renderSettlementGroupCard = ({item}: { item: SummarisedExchange },
                                       status: string,
                                       onPress: () => void) => (
        <ExchangeCard
            key={`${item.creditorUserId}-${item.debtorUserId}`}
            creditorId={item.creditorUserId}
            creditorFirstName={item.creditorFirstName}
            creditorLastName={item.creditorLastName}
            debtorId={item.debtorUserId}
            debtorFirstName={item.debtorFirstName}
            debtorLastName={item.debtorLastName}
            exchangeValue={item.summarisedExchangesValue.toString()}
            status={status}
            currentUserId={currentUserId}
            onButtonPress={onPress}
        />
    );

    const renderList = () => {
        if (selectedTab === 'Oczekujące') {
            return (
                <FlatList
                    data={pendingSummaries}
                    renderItem={({item}) => renderSettlementGroupCard({item}, "PENDING", () => {
                        batchSettleExchanges(item.creditorUserId, item.debtorUserId)

                    })}
                    keyExtractor={(item) => `${item.creditorUserId}-${item.debtorUserId}`}
                />
            );
        } else {
            return (
                <FlatList
                    data={overallSummaries}
                    renderItem={({item}) => renderSettlementGroupCard({item}, "", () => {
                    })}
                    keyExtractor={(item) => `${item.creditorUserId}-${item.debtorUserId}`}
                />
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.text40Medium}>Podsumowanie</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TabButton
                    title="Oczekujące"
                    onPress={() => {
                        setSelectedTab('Oczekujące');
                        setRefetchPendingSummaries(!refetchPendingSummaries);
                    }}
                    selected={selectedTab === 'Oczekujące'}
                />
                <TabButton
                    title="Sumaryczne"
                    onPress={() => {
                        setSelectedTab('Sumaryczne');
                        fetchOverallSummaries();
                    }}
                    selected={selectedTab === 'Sumaryczne'}
                />
            </View>

            <View style={styles.listContainer}>
                {isLoading ? (<CircularActivityIndicator></CircularActivityIndicator>) : renderList()}
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
        flex: 1 / 10,
        justifyContent: 'flex-start',
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

export default SettlementGroupSummaryView;