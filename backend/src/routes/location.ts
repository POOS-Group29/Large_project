import express from "express";

import logger from "../config/winston";
import { adminMiddleware } from "../middleware/AuthMiddleware";
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
    }).limit(10);
    return res.json(locations);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Error fetching locations" });
  }
});

LocationRoutes.get("/pending", adminMiddleware, async (req, res) => {
  const locations = await Location.find({ approved: false }).limit(10);
  res.json(locations);
});

LocationRoutes.put("/approve/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const location = await Location.findByIdAndUpdate(id, { approved: true });
  res.json(location);
});

// List all locations near a given latitude and longitude
LocationRoutes.get("/", async (req, res) => {
  const { lat, long, page, name } = req.query;
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
      name: { $regex: new RegExp(name as string, "i") },
      approved: true,
    })
      .skip((parseInt(page as string) - 1) * 10)
      .limit(50);
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
      // @ts-expect-error User ID is injected by the middleware
      approved: req.user.isAdmin,
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
LocationRoutes.put("/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { long, lat, ...rest } = req.body;
  const location = await Location.findByIdAndUpdate(
    id,
    {
      ...rest,
      location: {
        type: "Point",
        coordinates: [parseFloat(long), parseFloat(lat)],
      },
    },
    { new: true }
  );

  if (!location) {
    return res.status(404).json({ message: "Location not found" });
  }

  return res.json(location);
});

// Delete a location
LocationRoutes.delete("/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndDelete(id);
  res.json({ message: "Location deleted" });
});
