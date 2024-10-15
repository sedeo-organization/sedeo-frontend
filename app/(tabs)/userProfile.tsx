import {Text, View, StyleSheet} from 'react-native';

export default function UserProfile() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Michał Dąbkowski</Text>
            <Text style={styles.text}>+48 519 770 196</Text>
            <Text style={styles.text}>michal.dabkowski321@gmail.com</Text>
            <Text style={styles.text}>Stan konta</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});
