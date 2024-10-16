import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {useCallback, useState} from "react";
import {userApi} from "@/utils/api/userApi";
import {useFocusEffect} from "expo-router";
import {UserProfileData} from "@/model/User";

export default function SettlementsView() {
    const [userProfile, setUserProfile] = useState<UserProfileData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            setLoading(true);

            const fetchUser = async () => {
                try {
                    const user = await userApi.getProfile();

                    if (isActive) {
                        setUserProfile(user);
                        setError('');
                    }
                } catch (e) {
                    if (isActive) {
                        setError('Nie udało się załadować profilu użytkownika');
                    }
                } finally {
                    if (isActive) {
                        setLoading(false);
                    }
                }
            };

            fetchUser();

            return () => {
                isActive = false;
            };
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#1F41BB" />;
    }

    if (error) {
        return <Text style={styles.secondaryText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            {userProfile ? (
                <>
                    <Text style={styles.primaryText}>{userProfile?.firstName}</Text>
                    <Text style={styles.secondaryText}>{userProfile?.lastName}</Text>
                    <Text style={styles.secondaryText}>{userProfile?.phoneNumber}</Text>
                    <Text style={styles.secondaryText}>{userProfile?.email}</Text>
                    <Text style={styles.balanceHeaderText}>Stan konta</Text>
                    <Text style={styles.balanceText}>{userProfile?.accountBalance}</Text>
                </>
            ) : (
                <Text style={styles.secondaryText}>Nie znaleziono profilu użytkownika</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryText: {
        color: '#1F41BB',
        fontFamily: 'Poppins_500Medium',
        fontSize: 40
    },
    secondaryText: {
        color: '#2E2E2E',
        fontFamily: 'Poppins_500Medium',
        fontSize: 20
    },
    balanceHeaderText: {
        color: '#F6F6F6',
        fontFamily: 'Poppins_500Medium',
        fontSize: 18
    },
    balanceText: {
        color: '#F6F6F6',
        fontFamily: 'Poppins_500Medium',
        fontSize: 32
    }
});
