import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from "@/styles/Colors";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {useLocalSearchParams} from "expo-router";
import {ExchangeCard} from "@/components/ExchangeCard";
import {settlementGroupApi} from "@/utils/api/settlementGroupApi";
import {jwtDecode} from "jwt-decode";
import {getJwt} from "@/utils/auth/jwtStorage";

const SettlementDetailsView = () => {
        const [isLoading, setIsLoading] = useState(true);
        const {groupId} = useLocalSearchParams<{ groupId: string }>();
        const {settlementId} = useLocalSearchParams<{ settlementId: string }>();
        const [settlementExchanges, setSettlementExchanges] = useState<Exchange[]>([]);
        const [currentUserId, setCurrentUserId] = useState<string|undefined>("");

        async function extractClaims() {
            const plainJwt = await getJwt();
            if (plainJwt) {
                const decodedClaims = jwtDecode(plainJwt);
                console.log("Decoded sub", decodedClaims.sub)
                setCurrentUserId(decodedClaims.sub)
            }
            console.log("DECODED JWT:", plainJwt)
        }

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
            extractClaims();
            console.log("CURRENT USER", currentUserId)
            fetchSettlementExchanges();
        }, [])

        const renderExchangeCard = ({item}: { item: Exchange }) => (
            <ExchangeCard
                key={item.exchangeId}
                debtorId={item.debtorId}
                debtorFirstName={item.debtorFirstName}
                debtorLastName={item.debtorLastName}
                creditorId={item.creditorId}
                creditorFirstName={item.creditorFirstName}
                creditorLastName={item.creditorLastName}
                exchangeValue={item.exchangeValue.toString()}
                status={item.status}
                currentUserId={currentUserId}
                onButtonPress={async () => {
                    await settleExchange(item.exchangeId)
                    await fetchSettlementExchanges()
                }}/>
        );

        const renderList = () => {
            if (!currentUserId) return null;
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