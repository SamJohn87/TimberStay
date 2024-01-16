import { Platform, View, StyleSheet, Image, Text, Alert, ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCabins } from '../features/cabins/cabinsSlice';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import Constants from 'expo-constants';
import CabinInfoScreen from './CabinInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import ReservationScreen from './ReservationScreen';
import logo from '../assets/app_logo.png';
import FavoritesScreen from './FavoritesScreen';
import NetInfo from '@react-native-community/netinfo';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenOptions = {
    headerStyle: { backgroundColor: '#703F13' },
    headerTintColor: 'white'
};

const HomeNavigator = () => {

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        ></Icon>
                    )
                })}
            />
        </Stack.Navigator>

    );
};

const AboutNavigator = () => {

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='About'
                component={AboutScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        ></Icon>
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const ContactNavigator = () => {

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Contact'
                component={ContactScreen}
                options={({ navigation }) => ({
                    title: 'Contact Us',
                    headerLeft: () => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        ></Icon>
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const DirectoryNavigator = () => {

    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={screenOptions}>
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={({ navigation }) => ({
                    title: 'Cabin Directory',
                    headerLeft: () => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        ></Icon>
                    )
                })}

            />
            <Stack.Screen
                name='CabinInfo'
                component={CabinInfoScreen}
                options={({ route }) => ({
                    title: route.params.cabin.name
                })}
            />
        </Stack.Navigator>
    )
};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} activeTintColor='#3581C4' inactiveTintColor='#D17B30' />
    </DrawerContentScrollView>
);

const ReservationNavigator = () => {

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Reservation'
                component={ReservationScreen}
                options={({ navigation }) => ({
                    title: 'Reservation Search',
                    headerLeft: () => (
                        <Icon
                            name='tree'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        ></Icon>
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const FavoritesNavigator = () => {

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={({ navigation }) => ({
                    title: 'Favorite Cabins',
                    headerLeft: () => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        ></Icon>
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCabins());
        dispatch(fetchPromotions());
        dispatch(fetchPartners());
        dispatch(fetchComments());
    }, [dispatch]);

    useEffect(() => {
        NetInfo.fetch().then((connectionInfo) => {
            Platform.OS === 'ios'
                ? Alert.alert('Initial Network Connectivity Type:', connectionInfo.type)
                : ToastAndroid.show(`Initial Network Connectivity Type: ${connectionInfo.type}`, ToastAndroid.LONG);
        });

        const unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
            handleconnectivityChange(connectionInfo);
        });

        return unsubscribeNetInfo;
    }, []);

    const handleconnectivityChange = (connectionInfo) => {
        let connectionMsg = 'You are connected to an active network';

        switch (connectionInfo.type) {
            case 'none': connectionMsg = 'No network connection is active.';
                break;
            case 'unknown': connectionMsg = 'The network connection state is npw unknown.';
                break;
            case 'cellular': connectionMsg = 'You are now connected to a cellular network';
                break;
            case 'wifi': connectionMsg = 'You are now connected to a WiFi Network';
                break;
        }

        Platform.OS === 'ios' ? Alert.alert('Connection change: ', connectionMsg) : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
    }

    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        }}>
            <Drawer.Navigator
                initialRouteName='Home'
                drawerContent={CustomDrawerContent}
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        drawerIcon: () => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={'#703F13'}
                            ></Icon>
                        )
                    }}
                />
                <Drawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{
                        title: 'Cabin Directory',
                        drawerIcon: () => (
                            <Icon
                                name='list'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={'#703F13'}
                            ></Icon>
                        )
                    }}
                />
                <Drawer.Screen
                    name='ReserveCabin'
                    component={ReservationNavigator}
                    options={{
                        title: 'Reserve Cabin',
                        drawerIcon: () => (
                            <Icon
                                name='tree'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={'#703F13'}
                            ></Icon>
                        )
                    }}
                />
                <Drawer.Screen
                    name='Favorites'
                    component={FavoritesNavigator}
                    options={{
                        title: 'My Favorites',
                        drawerIcon: () => (
                            <Icon
                                name='heart'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={'#703F13'}
                            ></Icon>
                        )
                    }}
                />
                <Drawer.Screen
                    name='About'
                    component={AboutNavigator}
                    options={{
                        drawerIcon: () => (
                            <Icon
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={'#703F13'}
                            ></Icon>
                        )
                    }}
                />
                <Drawer.Screen
                    name='Contact'
                    component={ContactNavigator}
                    options={{
                        title: 'Contact Us',
                        drawerIcon: () => (
                            <Icon
                                name='address-card'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={'#703F13'}
                            ></Icon>
                        )
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24

    },
    drawerHeader: {
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    drawerImage: {
        marginTop: 20,
        height: 100,
        width: 100
    }
});

export default Main;