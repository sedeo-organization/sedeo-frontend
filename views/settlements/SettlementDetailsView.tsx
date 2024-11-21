import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {useLocalSearchParams} from "expo-router";
import {ExchangeCard} from "@/components/ExchangeCard";
import {settlementGroupApi} from "@/utils/api/settlementGroupApi";

const SettlementDetailsView = () => {
        const [isLoading, setIsLoading] = useState(false);
        const {groupId} = useLocalSearchParams<{ groupId: string }>();
        const {settlementId} = useLocalSearchParams<{ settlementId: string }>();
        const [settlementExchanges, setSettlementExchanges] = useState<Exchange[]>([]);

        async function fetchSettlementExchanges() {
            setIsLoading(true);
            const _exchanges = await settlementGroupApi.getExchanges(groupId, settlementId);
            if (_exchanges) {
                setSettlementExchanges(_exchanges.settlementExchanges);
                setIsLoading(false);
            }
        }

        async function settleExchange(exchangeId: string) {
            await settlementGroupApi.settleExchange({status: "settled"}, groupId, settlementId, exchangeId)
        }

        useEffect(() => {
            fetchSettlementExchanges();
        }, [])

        const renderExchangeCard = ({item}: { item: Exchange }) => (
            <ExchangeCard
                key={item.exchangeId}
                debtorFirstName={item.debtorFirstName}
                debtorLastName={item.debtorLastName}
                creditorFirstName={item.creditorFirstName}
                creditorLastName={item.creditorLastName}
                exchangeValue={item.exchangeValue.toString()}
                status={item.status}
                onButtonPress={async () => {
                    await settleExchange(item.exchangeId)
                    await fetchSettlementExchanges()
                }}/>
        );

        const renderList = () => {
            return (
                <FlatList
                    data={settlementExchanges}
                    renderItem={renderExchangeCard}
                    keyExtractor={(item) => item.exchangeId}
                />
            );
        }

        return (
            <View style={styles.container}>
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
    listContainer: {
        flex: 1,
    },
});

export default SettlementDetailsView;