import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { useRateLocation, UseRateLocationOptions } from '@/feature/location/api/rate';
import { useUpdateLocation, UseUpdateLocationOptions } from '@/feature/location/api/update';
import { Rating } from '@kolking/react-native-rating';
import { useNavigation } from '@react-navigation/native';


const RetrieveLocation = ({onRatingSubmit,currentRating, location}) => {
    const rateLocation = useRateLocation();
    const updateLocation = useUpdateLocation();
    const [rating, setRating] = useState(currentRating);
    //const navigate = useNavigation();
    const handleChange = (newRating: number) => {
        setRating(newRating);
    };

    const submitRating = async () => {

        if (location?.userRating === null) {
            rateLocation.mutate({
                locationId: location._id,
                value: rating,
            }, {
                onSuccess: () => {
                    Alert.alert('Rating submitted!');
                    onRatingSubmit(rating); // Notify parent component
                }
            });
            
        } else {
            updateLocation.mutate({
                locationId: location._id,
                value: rating,
            }, {
                onSuccess: () => {
                    Alert.alert('Rating updated!');
                    onRatingSubmit(rating); // Notify parent component
                }
            });
        }
    }

    return (

            <View style={styles.userRatingContainer}>
                <Text style={styles.clickToRateText}>Click to rate</Text>
                <Rating size={34} rating={rating} onChange={handleChange} />
                <Text style={styles.text}>Rated {rating} out of 5</Text>
                <Button
                    buttonStyle={{width: '50%'}}
                    title="Submit"
                    onPress={() => submitRating()}
                />
            </View>

  );
};

const styles = StyleSheet.create({
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
