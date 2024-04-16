import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { useRetrieveLocation, UseRetrieveLocationOptions } from '../../feature/location/api/retrieve';
import { useRateLocation, UseRateLocationOptions } from '@/feature/location/api/rate';
import { useUpdateLocation, UseUpdateLocationOptions } from '@/feature/location/api/update';
import LocationDetails from '@/feature/location/components/LocationDetails';
import RateLocation from '@/feature/location/components/RateLocation';
import { Rating } from '@kolking/react-native-rating';


const RetrieveLocation = ({route}) => {
    // const { locationId } = route.params;
    // const { data: location, refetch, isLoading, error } = useRetrieveLocation({ locationId });

    // const [selectedLocation, setSelectedLocation] = useState(null);
    // const [currentRating, setCurrentRating] = useState(0);
    // // Effect for handling new location data and user ratings
    // useEffect(() => {
    //     refetch();  // Ensures the latest data is fetched when component mounts or locationId changes
    // }, [locationId, refetch, currentRating]);

    // useEffect(() => {
    //     if (location) {
    //         setSelectedLocation(location); // Update the location when fetched
    //         if (location.userRating) {
    //             setCurrentRating(location.userRating.value); // Update the rating if available
    //         }
    //     }
    // }, [location, currentRating]);

    // if (isLoading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error fetching location: {error.message}</Text>;

    // return (
    //     <View style={styles.container}>
    //       {selectedLocation && <LocationDetails location={selectedLocation} />}
    //       {selectedLocation && <RateLocation  currentRating={currentRating} location={selectedLocation} />}
    //     </View>
    // );
    const { locationId } = route.params;
    const { data: location, refetch } = useRetrieveLocation({ locationId });
    const [currentRating, setCurrentRating] = useState(0);

    useEffect(() => {
        if (location && location.userRating) {
            setCurrentRating(location.userRating.value);
        }
    }, [location]);

    const handleRatingUpdate = (newRating) => {
        setCurrentRating(newRating);
        refetch(); // Optionally refetch the location data if needed
    };

    return (
        <View>
            <LocationDetails location={location} />
            <RateLocation
                currentRating={currentRating}
                location={location}
                onRatingSubmit={handleRatingUpdate}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    
container: {
    padding: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rateCount: {
    marginLeft: 5,
    fontSize: 16,
  },
  coordinates: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userRatingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  clickToRateText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    fontStyle: 'italic',
  }
});

export default RetrieveLocation;
