import { View, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingComponent";

const FeaturedItem = (props) => {
    const { item } = props;

    if (props.isLoading) {
        return <Loading />
    }

    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }

    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={item.image}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 20
                        }}>
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20, color: '#5381C4' }}>
                    {item.description}
                </Text>
            </Card>
        );
    }

    return <View />
};

const HomeScreen = () => {
    const cabins = useSelector((state) => state.cabins);
    const promotions = useSelector((state) => state.promotions);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
    });

    const featCabins = cabins.cabinsArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find((item) => item.featured);

    useEffect(() => {
        scaleAnimation.start();
    }, [])

    return (
        <>
            <Animated.ScrollView style={{ transform: [{ scale: scaleValue }] }}>
                <FeaturedItem item={featCabins} isLoading={cabins.isLoading} errMess={cabins.errMess} />
                <FeaturedItem item={featPromotion} isLoading={promotions.isLoading} errMess={promotions.errMess} />
            </Animated.ScrollView>
            <Text style={{ fontSize: 7 }}>logos by hotpot.ai/art-generator</Text>
            <Text style={{ fontSize: 7 }}>images by Unsplash</Text>
        </>
    );
};

export default HomeScreen;