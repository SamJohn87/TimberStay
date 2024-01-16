import { ScrollView } from 'react-native';
import { Card, Text, ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';

const Mission = () => {
    return (
        <ScrollView>
            <Card>
                <Card.Title>Our Mission</Card.Title>
                <Card.Divider />
                <Text style={{ margin: 10, color: '#3581C4' }}>Welcome to our cabin rental company, where relaxation meets nature's embrace! At TimberStay, we pride ourselves on curating stress-free getaways that transcend the ordinary. Nestled in serene locations, our cabins are designed to be your home away from home, ensuring every moment is filled with tranquility.
                </Text>
                <Text style={{ margin: 10, color: '#3581C4' }}>We value your feedback immensely, as it plays a crucial role in enhancing our commitment to excellence. We encourage our guests to share their experiences through reviews, providing insights that reflect our dedication to offering an unparalleled escape. Your input not only shapes our future but also serves as a testament to our ongoing efforts to make your stay stress-free and memorable.
                </Text>
            </Card>
        </ScrollView>
    );
};

const AboutScreen = () => {
    const partners = useSelector((state) => state.partners);

    if (partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            </ScrollView>
        );
    }

    if (partners.errMess) {
        <ScrollView>
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
            >
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Card.Divider />
                    <Text>{partners.errMess}</Text>
                </Card>
            </Animatable.View>
        </ScrollView>
    }

    return (
        <ScrollView>
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
            >
                <Mission />
                <Card>
                    <Card.Title>Community Partners</Card.Title>
                    <Card.Divider />
                    {partners.partnersArray.map((partner) => {
                        return (
                            <ListItem key={partner.id}>
                                <Avatar source={partner.image} rounded />
                                <ListItem.Content>
                                    <ListItem.Title style={{ color: '#703F13', fontWeight: 'bold' }}>{partner.name}</ListItem.Title>
                                    <ListItem.Subtitle>
                                        {partner.description}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        );
                    })}
                </Card>
            </Animatable.View>
        </ScrollView>
    );
};

export default AboutScreen;