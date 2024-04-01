import express from 'express';
import Location from 'model/Location';

export const LocationRoutes = express.Router();

// List all locations near a given latitude and longitude
LocationRoutes.get('/', async (req, res) => {
  const { lat, long } = req.query;
  const locations = await Location.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(long as string), parseFloat(lat as string)],
        },
      },
    },
  });
  res.json(locations);
});

// Retrieve a location by ID
LocationRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  res.json(location);
});

// Create a new location
LocationRoutes.post('/', async (req, res) => {
  const { name, address, city, state, zip, lat, long } = req.body;
  const location = new Location({
    name,
    address,
    city,
    state,
    zip,
    location: {
      type: 'Point',
      coordinates: [parseFloat(long), parseFloat(lat)],
    },
  });
  await location.save();
  res.json(location);
});

// Update a location
LocationRoutes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, city, state, zip, lat, long } = req.body;
  const location = await Location.findByIdAndUpdate(
    id,
    {
      name,
      address,
      city,
      state,
      zip,
      location: {
        type: 'Point',
        coordinates: [parseFloat(long), parseFloat(lat)],
      },
    },
    { new: true }
  );
  res.json(location);
});

// Delete a location
LocationRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndDelete(id);
  res.json({ message: 'Location deleted' });
});