import express from "express";

import logger from "../config/winston";
import Location from "../model/Location";
import { DifficultyRating } from "../model/Rating";

export const LocationRoutes = express.Router();

// Search for locations by name
LocationRoutes.get("/search", async (req, res) => {
  const { name } = req.query;
  if (!name) {
    logger.error("Name is required");
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const locations = await Location.find({
      name: { $regex: new RegExp(name as string, "i") },
    });
    return res.json(locations);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Error fetching locations" });
  }
});

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
      .limit(100);
    return res.json(locations);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Error fetching locations" });
  }
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
        coordinates: [parseFloat(lat), parseFloat(long)],
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
  const rating = await DifficultyRating.findOne({
    locationId: id,
    // @ts-expect-error User ID is injected by the middleware
    userId: req.user._id,
  });

  if (!location) {
    return res.status(404).json({ message: "Location not found" });
  }

  res.json({
    ...location.toJSON(),
    userRating: rating,
  });
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
