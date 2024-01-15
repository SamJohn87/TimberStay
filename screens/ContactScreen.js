import { ScrollView, Text } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

const ContactScreen = () => {
    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['info@timberstay.com'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
    };

    return (
        <ScrollView>
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
            >
                <Card wrapperStyle={{ margin: 10 }}>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider />
                    <Text style={{ color: '#3581C4' }}>1 Nucamp Way</Text>
                    <Text style={{ color: '#3581C4' }}>Seattle, WA 98001</Text>
                    <Text style={{ marginBottom: 10, color: '#3581C4' }}>U.S.A.</Text>
                    <Text style={{ color: '#3581C4' }}>Phone: 1-206-555-1234</Text>
                    <Text style={{ color: '#3581C4' }}>Email: campsite@nucamp.co</Text>
                    <Button
                        title='Send Email'
                        buttonStyle={{ backgroundColor: '#703F13', margin: 40 }}
                        icon={
                            <Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        onPress={() => sendMail()}
                    />
                </Card>
            </Animatable.View>
        </ScrollView >
    );
};

export default ContactScreen;