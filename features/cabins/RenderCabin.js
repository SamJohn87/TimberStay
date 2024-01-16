import { StyleSheet, Text, View, PanResponder, Alert, Share } from 'react-native';
import { useRef } from 'react';
import { Card, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const RenderCabin = ({ cabin, isFavorite, markFavorite, onShowModal }) => {
    const view = useRef();

    const isLeftSwipe = ({ dx }) => dx < -200;
    const isRightSwipe = ({ dx }) => dx > 200;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current
                .rubberBand(1000)
                .then((endState) => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end ', gestureState);
            if (isLeftSwipe(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    `Are you sure you want to add ${cabin.name} to favorites?`,
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => isFavorite ? console.log('Already set as favorite') : markFavorite()
                        }
                    ],
                    { cancelable: false }
                )
            } else if (isRightSwipe(gestureState)) {
                onShowModal();
            }
        }
    });

    const shareCabin = (title, message, url) => {
        Share.share(
            {
                title,
                message: `${title}: ${message} ${url}`,
                url
            },
            {
                dialogTitle: `Share ${title}`
            }
        )
    }

    if (cabin) {
        return (
            <Animatable.View
                animation='fadeInDownBig'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card containerStyle={styles.cardContainer}>
                    <Card.Image source={cabin.image}>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text style={styles.cardText}>
                                {cabin.name}
                            </Text>
                        </View>
                    </Card.Image>
                    <Text style={{ margin: 20, color: '#3581C4' }}>{cabin.description}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginTop: 10, marginLeft: 20, color: 'green', fontWeight: 'bold' }}>${cabin.price}</Text>
                        <Text style={{ marginTop: 15, color: '#3581C4', fontSize: 10 }}>/night</Text>
                    </View>

                    <View style={styles.cardRow}>
                        <Icon
                            name={isFavorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#D17B30'
                            raised
                            reverse
                            onPress={
                                () => isFavorite
                                    ? console.log('Already set as a favorite')
                                    : markFavorite()
                            }
                        />
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#3581C4'
                            raised
                            reverse
                            onPress={onShowModal}
                        />
                        <Icon
                            name='share'
                            type='font-awesome'
                            color='#3581C4'
                            raised
                            reverse
                            onPress={() => shareCabin(cabin.name, cabin.description, `${baseUrl}${cabin.image}`)}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }

    return <View />;
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0,0,0,1',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
})

export default RenderCabin;