
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import { getGridPoint, getForecastData } from '../requests/weather.requests.js';


export default function ForecastList() {

    // similar to useHistory
    const navigation = useNavigation();

    // variable to map over
    const [forecast, setForecast] = useState([
        {
            temperature: 80,
            name: 'Mostly Sunny',
            number: 1,
        },
        {
            temperature: 91,
            name: 'Sunny',
            number: 2,
        }
    ]);


    // location services
    const [location, setLocation] = useState();

    useEffect(() => {
        getLocation();
    }, []);

    // forecast services
    useEffect(() => {
        if(location && location.coords) {
            getWeatherData();
        }
    }, [location]); // when location is updated, run this function

    const getWeatherData = async () => {
        let forecastUrl = await getGridPoint(location);
        let forecastData = await getForecastData(forecastUrl);
        setForecast(forecastData);
    }

    // get location function
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted') {
            console.log(`permission not granted`);
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
    }


    return (
        <View style={{ height: '100%' }}>

            <Text>{JSON.stringify(location)}</Text>

            <FlatList
                data={forecast}
                // similar to .map to display data
                // item to render (forecast)
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ padding: 20, borderColor: 'gray', borderBottomWidth: 1 }}
                        onPress={() => {
                            console.log(`you pressed a button!`);
                            // navigate takes two properties ->  name , props 
                            navigation.navigate('Details', item);
                        }}
                        >
                        <Text>{item.name} {item.temperature}</Text>
                    </TouchableOpacity>
                )}
                style={{ width: '100%' }}
            />

        </View>
    )
}