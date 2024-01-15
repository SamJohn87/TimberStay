import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Alert } from 'react-native';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';

const FavoritesScreen = ({ navigation }) => {
    const { cabinsArray, isLoading, errMess } = useSelector((state) => state.cabins);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const renderFavoriteItem = ({ item: cabin }) => {
        return (
            <SwipeRow rightOpenValue={-100}>
                <View style={styles.deleteView}>
                    <TouchableOpacity
                        style={styles.deleteTouchable}
                        onPress={() => Alert.alert('Delete Favorite?', `Are you sure you wish to delete the favorite cabin ${cabin.name}?`,
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(`${cabin.name} Not Deleted`)
                                },
                                {
                                    text: 'OK',
                                    onPress: () => dispatch(toggleFavorite(cabin.id))
                                }
                            ],
                            { cancelable: false }
                        )}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem
                        onPress={() => navigation.navigate('Directory', {
                            screen: 'CabinInfo',
                            params: { cabin }
                        })}
                    >
                        <Avatar rounded source={{ uri: `${baseUrl}${cabin.image}` }} />
                        <ListItem.Content>
                            <ListItem.Title>{cabin.name}</ListItem.Title>
                            <ListItem.Subtitle style={{ color: '#3581C4'}}>{cabin.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        );
    };

    if (isLoading) {
        return <Loading />
    }

    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        )
    }

    return (
        <Animatable.View
            animation='fadeInRightBig'
            duration={2000}
        >
            <FlatList
                data={cabinsArray.filter((cabin) => favorites.includes(cabin.id))}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </Animatable.View>
    )
};

const styles = StyleSheet.create({
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    },
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    }
})

export default FavoritesScreen;
