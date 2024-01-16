import { FlatList, Text, View } from 'react-native';
import { Tile } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';

const DirectoryScreen = ({ navigation }) => {
    const cabins = useSelector((state) => state.cabins);

    if (cabins.isLoading) {
        return <Loading />
    }

    if (cabins.errMess) {
        <View>
            <Text>{cabins.errMess}</Text>
        </View>
    }

    const renderDirectoryItem = ({ item: cabin }) => {
        return (
            <Animatable.View
                animation='fadeInRightBig'
                duration={2000}
            >
                <Tile
                    title={cabin.name}
                    caption={cabin.description}
                    featured
                    onPress={() => navigation.navigate('CabinInfo', { cabin })}
                    imageSrc={cabin.image}
                />
            </Animatable.View>
        );
    }

    return (
        <FlatList
            data={cabins.cabinsArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    )
};

export default DirectoryScreen;