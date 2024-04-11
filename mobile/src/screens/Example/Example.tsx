
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Searchbar, Card, Title, Paragraph, Button } from 'react-native-paper';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

function Example() {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [locations, setLocations] = useState<Location[]>([]); // State to store locations

  const requestLocationPermission = async () => {
	if (Platform.OS === 'ios') {
		Geolocation.requestAuthorization(() => {});
		locateCurrentPosition();
	} else {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Location Access Required',
				message: 'This app needs to access your location',
				buttonPositive: 'OK', // Add the buttonPositive property
			},
		);
		
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			locateCurrentPosition();
		} else {
			console.log('Location permission denied');
		}
	}
  };

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  };

  useEffect(() => {
    requestLocationPermission();
    // fetchLocations function will be called inside useEffect
  }, []);

  const url = 'https://api.cop4331.xhoantran.com/api/location/?lat=28.600709&long=-81.201459';
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBjN2I1NDAzZWU0Y2E1ZTE5NDljNzgiLCJpYXQiOjE3MTIwOTQwMzksImV4cCI6MTcxNDY4NjAzOX0.ZpcibkB6sMRhR7t7gv4m5zCJTluXkOROv-6vocjgTwc';


  async function fetchLocations(url: string, token: string): Promise<void> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setLocations(data); // Assuming 'data' is an array of locations
      // console.log(data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  }

  // Call the function with the URL and authToken when the component is mounted
  useEffect(() => {
    fetchLocations(url, authToken);
  }, [url, authToken]); // Only re-run the effect if URL or authToken changes

  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <MapView
        style={{ flex: 1 }}
        region={currentPosition}
        mapType="satelliteFlyover"
        showsUserLocation
        zoomEnabled
      >
        {locations.map((location) => (
          <Marker
            key={location._id}
            coordinate={{
              latitude: location.location.coordinates[1],
              longitude: location.location.coordinates[0],
            }}
            title={location.name}
          />
        ))}
      </MapView>
      <ScrollView style={styles.container}>
        {locations.map((location) => (
          <Card key={location.id} style={styles.card}>
            <Card.Content>
              <Title>{location.name}</Title>
              <Paragraph>{`${location.distance} | ${location.address}`}</Paragraph>
            </Card.Content>
            {/* <Card.Cover source={{ uri: location.images[0] }} /> */}
            <Card.Actions>
              {/* <Button>Directions</Button> */}
              <Button>Rate</Button>
            </Card.Actions>
          </Card>
        ))}
     </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    top: '50%', // Adjust this to place the list where you want it on the screen
    width: '100%',
  },
  listItem: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  listItemText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
  },
});

export default Example;
