import express from "express";
import logger from "../config/winston";
import Location from "../model/Location";

export const LocationRoutes = express.Router();

// List all locations near a given latitude and longitude
LocationRoutes.get("/", async (req, res) => {
  const { lat, long, page } = req.query;
  if (!lat || !long) {
    logger.error("Latitude and longitude are required");
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required" });
  }
  try {
    const locations = await Location.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(long as string),
              parseFloat(lat as string),
            ],
          },
        },
      },
    })
      .skip((parseInt(page as string) - 1) * 10)
      .limit(10);
    return res.json(locations);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Error fetching locations" });
  }
});

// search locations api
LocationRoutes.get('/search', async (req, res) => {
  // TO DO
});


// Create a new location
LocationRoutes.post("/", async (req, res) => {
  const { name, address, city, state, zip, lat, long } = req.body;
  try {
    const location = new Location({
      name,
      address,
      city,
      state,
      zip,
      location: {
        type: "Point",
        coordinates: [parseFloat(long), parseFloat(lat)],
      },
    });
    await location.save();
    return res.json(location);
  } catch (error: any) {
    logger.error(error);
    return res.status(400).json({ message: "Error creating location" });
  }
});

// Retrieve a location by ID
LocationRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  res.json(location);
});

// Update a location
LocationRoutes.put("/:id", async (req, res) => {
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
        type: "Point",
        coordinates: [parseFloat(long), parseFloat(lat)],
      },
    },
    { new: true }
  );
  res.json(location);
});

// Delete a location
LocationRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndDelete(id);
  res.json({ message: "Location deleted" });
});
