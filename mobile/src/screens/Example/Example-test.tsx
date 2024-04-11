import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const restaurants = [
  {
    id: 1,
    name: "Darwin's Diner",
    rating: 4.5,
    distance: '0.3 mi',
    address: '555 Mission St, SoMa',
    attributes: ['Casual dining', 'Outdoor dining', 'Delivery', 'Takeout'],
    images: ['your_image_url_1', 'your_image_url_2', 'your_image_url_3'],
  },
  // ... other restaurants
];

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id} style={styles.card}>
          <Card.Content>
            <Title>{restaurant.name}</Title>
            <Paragraph>{`${restaurant.distance} | ${restaurant.address}`}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: restaurant.images[0] }} />
          <Card.Actions>
            <Button>Directions</Button>
            <Button>Details</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
  },
});
