import { View, Text } from 'react-native';



export default function ForecastDetails({ route }) {

    return (
        <View>
            <Text>This is the Details Page</Text>
            <Text>Name: {route.params.name}</Text>
            <Text>Temperature: {route.params.temperature}</Text>
            <Text>Number: {route.params.number}</Text>
            <Text>Wind: {route.params.windDirection} - {route.params.windSpeed} </Text>
            <Text>Wind Speed: {route.params.windSpeed}</Text>
            <Text>{JSON.stringify(route.params)}</Text>

        </View>
    )
}