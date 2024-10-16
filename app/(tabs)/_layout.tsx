import {Tabs} from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import {HomeIcon} from "@/assets/icons/HomeIcon";
import {WalletIcon} from "@/assets/icons/WalletIcon";
import {FriendIcon} from "@/assets/icons/FriendIcon";
import {Colors} from "@/styles/Colors";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#386BF6',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.defaultBackground,
                    borderTopWidth: 0,
                    elevation: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({focused}) => <HomeIcon focused={focused.toString()}/>,
                    tabBarLabel: ''
                }}
            />
            <Tabs.Screen
                name="settlements"
                options={{
                    tabBarIcon: ({focused}) => <WalletIcon focused={focused.toString()}/>,
                    tabBarLabel: ''
                }}
            />
            <Tabs.Screen
                name="friends"
                options={{
                    tabBarIcon: ({focused}) => <FriendIcon focused={focused.toString()}/>,
                    tabBarLabel: ''
                }}
            />
        </Tabs>
    );
}
