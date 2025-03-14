import {Alert, StyleSheet, Text, View} from 'react-native';
import {useCallback, useState} from "react";
import {userApi} from "@/utils/api/userApi";
import {router, useFocusEffect} from "expo-router";
import {UserProfileData} from "@/model/User";
import {TextStyles} from "@/styles/CommonStyles";
import {Colors} from "@/styles/Colors";
import {CircularActivityIndicator} from "@/components/CircularActivityIndicator";
import AccountBalanceCard from "@/components/AccountBalanceCard";
import MajorButton from "@/components/MajorButton";
import {deleteJwt} from "@/utils/auth/jwtStorage";

export default function UserProfileView() {
    let [userProfile, setUserProfile] = useState<UserProfileData | undefined>(undefined);
    let [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            setLoading(true);

            const fetchUser = () => {
                userApi.getProfile()
                    .then(user => {
                        if (isActive) {
                            setUserProfile(user);
                        }
                    })
                    .catch(() => {
                        if (isActive) {
                            Alert.alert(
                                'Nieoczekiwany błąd',
                                'Nie udało się pobrać użytkownika',
                            );
                        }
                    })
                    .finally(() => {
                        if (isActive) {
                            setLoading(false);
                        }
                    });
            };

            fetchUser();

            return () => {
                isActive = false;
            };
        }, [])
    );

    if (loading) {
        return <CircularActivityIndicator/>;
    }

    return (
        <View style={styles.container}>
            {userProfile ? (
                <>
                    <View style={styles.textContainer}>
                        <Text style={styles.header1}>{userProfile?.firstName}</Text>
                        <Text style={styles.header1}>{userProfile?.lastName}</Text>
                        <Text style={styles.text20Medium}>{userProfile?.phoneNumber}</Text>
                        <Text style={styles.text20Medium}>{userProfile?.email}</Text>
                    </View>
                    <View>
                        <AccountBalanceCard leftText={'Stan rozliczeniowy konta'}
                                            rightText={`${userProfile?.accountBalance.toString()} zł`}
                                            backgroundColor={userProfile?.accountBalance >= 0 ? Colors.positive : Colors.negative}>
                        </AccountBalanceCard>
                    </View>
                    <View style={styles.buttonContainer}>
                        <MajorButton title={"Wyloguj się"} onPress={() => {
                            deleteJwt;
                            router.navigate("/login")
                        }}></MajorButton>
                    </View>
                </>
            ) : (
                <Text style={styles.text20Medium}>Nie znaleziono profilu użytkownika</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: Colors.defaultBackground,
    },
    textContainer: {
        flex: 1 / 2,
        justifyContent: 'center',
        paddingHorizontal: '10%',
        paddingVertical: '3%',
        paddingTop: '15%',
    },
    cardContainer: {
        flex: 1 / 3,
        justifyContent: "center",
    },
    buttonContainer: {
        flex: 1 / 4,
        gap: 15,
        justifyContent: "flex-end",
    },
    header1: {
        ...TextStyles.header1,
        color: Colors.primary
    },
    text20Medium: {
        ...TextStyles.text20Medium,
        color: Colors.darkGrey
    },
    text18Medium: {
        ...TextStyles.text18Medium,
        color: Colors.textWhite
    },
    text32Regular: {
        ...TextStyles.text32Regular,
        color: Colors.textWhite
    }
});
