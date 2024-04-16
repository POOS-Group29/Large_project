import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { useRateLocation, UseRateLocationOptions } from '@/feature/location/api/rate';
import { useUpdateLocation, UseUpdateLocationOptions } from '@/feature/location/api/update';

import { Rating } from '@kolking/react-native-rating';

 
const LocationDetails = ({location}) => {
    if (!location) {
        return <Text>Loading location details...</Text>; // Or handle the absence differently
    }

    const calculateRating = (sum: number, count: number): number => {
        return count === 0 ? 0 : sum / count;
        
    };
        
    return (
        <View style={styles.container}>
            
            <Text style={styles.headerText}>{location?.name}</Text>
            {/* <Text style={styles.subText}>{location?.address}</Text> */}

            <View style={styles.ratingContainer}>
                <Rating size={17} rating={calculateRating(location?.difficultyRateValue, location.difficultyRateCount)} disabled />
                <Text style={styles.rateCount}>{ location.difficultyRateCount} Reviews</Text>
            </View>

            <Text style={styles.dateText}>Created: {new Date(location?.createdAt || '').toLocaleDateString()}</Text>
            <Text style={styles.dateText}>Updated: {new Date(location?.updatedAt || '').toLocaleDateString()}</Text>
            <Text style={styles.subText}>Coordinates: {location?.location.coordinates[1]}, {location?.location.coordinates[0]}</Text>
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
});

export default LocationDetails;
