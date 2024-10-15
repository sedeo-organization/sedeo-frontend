import {Tabs} from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color, focused}) => (
                        <FontAwesome name={focused ? 'user' : 'user-o'} color={color} size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="userProfile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color}
                                  size={24}/>
                    ),
                }}
            />
        </Tabs>
    );
}
