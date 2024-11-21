import React, {useContext, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TabButton from "@/components/TabButton";
import {Colors} from "@/styles/Colors";
import FloatingActionButton from "@/components/FloatingActionButton";
import {TextStyles} from "@/styles/CommonStyles";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import {router, useLocalSearchParams} from "expo-router";
import {AddExchangeCard} from "@/components/AddExchangeCard";
import AddSettlementContext from "@/store/add-settlement-context";
import {uuid} from "expo-modules-core";
import MajorButton from "@/components/MajorButton";
import {settlementGroupApi} from "@/utils/api/settlementGroupApi";

const AddSettlementExchangeView = () => {
        const [selectedTab, setSelectedTab] = useState('Własna');
        const [isLoading, setIsLoading] = useState(false);
        const {groupId} = useLocalSearchParams<{ groupId: string }>();
        const {contextSettlementExchanges, setContextSettlementExchanges} = useContext(AddSettlementContext);
        const addSettlementContextData = useContext(AddSettlementContext);

        function handleEqualPayment() {
            const valuePerParticipant = (addSettlementContextData.totalSettlementValue / contextSettlementExchanges.length).toFixed(2)
            const newExchanges = contextSettlementExchanges.map(exchange => {
                return {
                    ...exchange,
                    exchangeValue: valuePerParticipant.toString()
                } as Exchange
            })
            setContextSettlementExchanges(newExchanges);
        }

        function handleCustomPayment() {
            const newExchanges = contextSettlementExchanges.map(exchange => {
                return {
                    ...exchange,
                    exchangeValue: "0"
                } as Exchange
            })
            setContextSettlementExchanges(newExchanges);
        }

        const renderExchangeCard = ({item}: { item: Exchange }) => (
            <AddExchangeCard
                key={item.exchangeId}
                debtorFirstName={item.debtorFirstName}
                debtorLastName={item.debtorLastName}
                creditorFirstName={item.creditorFirstName}
                creditorLastName={item.creditorLastName}
                exchangeValue={item.exchangeValue.toString()}
                onCreditorPress={() => {
                    router.navigate({
                        pathname: "/add-exchange-participant",
                        params: {exchangeId: item.exchangeId, isCreditor: "true", groupId: groupId},
                    })
                }}
                onDebtorPress={() => router.navigate({
                    pathname: "/add-exchange-participant",
                    params: {exchangeId: item.exchangeId, isDebtor: "true", groupId: groupId},
                })}
                onTextChange={text => {
                    if (/^\d*\.?\d{0,2}$/.test(text)) {
                        const newExchanges = contextSettlementExchanges.map(exchange => {
                            if (exchange.exchangeId === item.exchangeId) {
                                return {
                                    ...exchange,
                                    exchangeValue: text
                                } as Exchange
                            }
                            return exchange;
                        })
                        setContextSettlementExchanges(newExchanges);
                        setSelectedTab("Własna")
                    }
                }}
            />
        );

        const renderList = () => {
            return (
                <FlatList
                    data={contextSettlementExchanges}
                    renderItem={renderExchangeCard}
                    keyExtractor={(item) => item.exchangeId}
                />
            );
        }

        const addSettlement = async () => {
            const createSettlementRequest: CreateSettlementRequest = {
                settlementId: uuid.v4(),
                title: addSettlementContextData.settlementTitle,
                totalValue: addSettlementContextData.totalSettlementValue,
                settlementExchanges: addSettlementContextData.contextSettlementExchanges.map(exchange => {
                    return {
                        exchangeId: exchange.exchangeId,
                        debtorUserId: exchange.debtorUserId,
                        creditorUserId: exchange.creditorUserId,
                        exchangeValue: Number(exchange.exchangeValue),
                    } as SettlementExchange
                }),
            };
            await settlementGroupApi.postSettlement(createSettlementRequest, groupId);
            setIsLoading(false)
        }

        const handleAddSettlement = async () => {
            setIsLoading(true);
            await addSettlement();
            router.navigate({
                pathname: "/settlements",
                params: {groupId: groupId},
            })
        };

        return (
            <View style={styles.container}>
                <Text style={styles.text18Medium}>Strategia rozliczenia</Text>
                <View style={styles.buttonContainer}>
                    <TabButton
                        title="Własna"
                        onPress={() => {
                            setSelectedTab('Własna');
                            handleCustomPayment();
                        }}
                        selected={selectedTab === 'Własna'}
                    />
                    <TabButton
                        title="Równo"
                        onPress={() => {
                            setSelectedTab('Równo');
                            handleEqualPayment();
                        }}
                        selected={selectedTab === 'Równo'}
                    />
                </View>

                <View style={styles.listContainer}>
                    {isLoading ? (<CircularActivityIndicator></CircularActivityIndicator>) : renderList()}
                </View>

                <View style={styles.actionButtonContainer}>
                    <FloatingActionButton onPress={() => {
                        const emptyExchangeExists: boolean = contextSettlementExchanges.some(exchange => exchange.debtorUserId === undefined ||
                            exchange.creditorUserId === undefined)
                        if (!emptyExchangeExists) {
                            setContextSettlementExchanges(prevState => {
                                const newExchange: Exchange = {
                                    exchangeValue: "0",
                                    exchangeId: uuid.v4()
                                };
                                return [...prevState, newExchange]
                            })
                        }
                    }}/>
                </View>
                <View style={styles.majorButtonContainer}>
                    <MajorButton title={"Dodaj rozliczenie"} onPress={() => {
                        handleAddSettlement()
                    }}></MajorButton>
                </View>
                {isLoading ? (<CircularActivityIndicator></CircularActivityIndicator>) : null}
            </View>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.defaultBackground,
        gap: 20,
    },
    actionButtonContainer: {
        justifyContent: "flex-end"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    listContainer: {
        flex: 1,
    },
    majorButtonContainer: {
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: "10%",
    },
    text18Medium: {
        ...TextStyles.text18Medium,
        color: Colors.primary,
        flexGrow: 0,
        marginHorizontal: "6%",
    },
});

export default AddSettlementExchangeView;