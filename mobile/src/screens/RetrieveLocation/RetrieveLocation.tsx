import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { useRetrieveLocation, UseRetrieveLocationOptions } from '../../feature/location/api/retrieve';
import { useRateLocation, UseRateLocationOptions } from '@/feature/location/api/rate';
import { useUpdateLocation, UseUpdateLocationOptions } from '@/feature/location/api/update';

import { Rating } from '@kolking/react-native-rating';


const RetrieveLocation = ({route}) => {
    const { locationId } = route.params;
    const retrieveLocation = useRetrieveLocation({ locationId });
    const rateLocation = useRateLocation();
    const updateLocation = useUpdateLocation();

    useEffect(() => {
        void retrieveLocation.refetch();
    }, []);

    let location = retrieveLocation.data;
    console.log(location);


    const [rating, setRating] = useState(0);
    
    const calculateRating = (sum:number, count:number) :number=>{
        return count === 0 ? 0 : sum / count;
    };
        
    const handleChange = (newRating: number) => {
        setRating(newRating);
    };

    const submitRating = async () => {
        try {
            await updateLocation.mutate({
                locationId: locationId,
                value: rating,
            });
            Alert.alert('Rating updated!');
        } catch (error) {
            await rateLocation.mutate({
                locationId: locationId,
                value: rating,
            });
            Alert.alert('Rating submitted!');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{location?.name}</Text>
            <Text style={styles.subText}>{location?.address}</Text>

            <View style={styles.ratingContainer}>
                <Rating size={17} rating={calculateRating(location?.difficultyRateValue ?? 0, location?.difficultyRateCount ?? 0)} />
                <Text style={styles.rateCount}>{location?.difficultyRateCount} Reviews</Text>
            </View>

            <Text style={styles.dateText}>Created: {new Date(location?.createdAt || '').toLocaleDateString()}</Text>
            <Text style={styles.dateText}>Updated: {new Date(location?.updatedAt || '').toLocaleDateString()}</Text>
            <Text style={styles.subText}>Coordinates: {location?.location.coordinates[1]}, {location?.location.coordinates[0]}</Text>

            <View style={styles.userRatingContainer}>
                <Text style={styles.clickToRateText}>Click to rate</Text>
                <Rating size={34} rating={rating} onChange={handleChange} />
                <Text style={styles.text}>Rated {rating} out of 5</Text>
                <Button
                    title="Submit"
                    onPress={() => submitRating()}
                />
            </View>
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
