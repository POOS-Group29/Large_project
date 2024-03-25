/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, MarkerAnimated, Marker} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform, 
  PermissionsAndroid,
  Dimensions
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GeoCoordinates } from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location'
//////////

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [restaurants, setRestaurants] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.7749, // Initial region set to San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization(
        () => {
          console.log("Success");
        },
        () => {
          console.log("Failed");
        }
      );
      locateCurrentPosition();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location',
          buttonPositive:''
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        locateCurrentPosition();
      } else {
        // Handle permission denied
      }
    }
  };

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position: { coords: { latitude: any; longitude: any; }; }) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      (error: any) => console.log(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  };

  /////Restaurant API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentPosition.latitude},${currentPosition.longitude}&radius=50000&type=restaurant&key=AIzaSyC3-XMS4aQ7nQR5X2LIT6bwzbR8WhM6ZyQ`);
        setRestaurants(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurants();
  }, [region]);  

  /////
  useEffect(() => {
    requestLocationPermission();
  }, []);
  return (
    <View style={{flex : 1}}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        style = {{width : '100%', height : '100%'}}
        region={currentPosition}
        mapType="satelliteFlyover"
        showsUserLocation={true}
        zoomEnabled={true}
        >
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            title={restaurant.name}
          />
        ))}
        <Marker
          coordinate={currentPosition}        
          title={"You are here"}
        />
      </MapView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;