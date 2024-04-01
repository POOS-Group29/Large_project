import express from "express";
import logger from "../config/winston";
import Location from "../model/Location";
import { DifficultyRating } from "../model/Rating";

export const RatingRoutes = express.Router();

// Create a new rating
RatingRoutes.post("/difficulty", async (req, res) => {
  const { locationId, value } = req.body;

  // Validate the value
  if (value < 1 || value > 5) {
    return res
      .status(400)
      .json({ message: "Rating value must be between 1 and 5" });
  }

  // @ts-expect-error userId is added to req by authMiddleware
  const userId = req.user._id;
  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await DifficultyRating.create({
      locationId,
      userId,
      value,
    });

    await Location.findByIdAndUpdate(locationId, {
      $inc: {
        difficultyRateCount: 1,
        difficultyRateValue: value,
      },
    });

    return res.json({ message: "Ok" });
  } catch (error: any) {
    logger.error(error);
    return res.status(400).json({ message: "Error rating location" });
  }
});

// Using PUT to update a rating
RatingRoutes.put("/difficulty", async (req, res) => {
  const { locationId, value } = req.body;

  // Validate the value
  if (value < 1 || value > 5) {
    return res
      .status(400)
      .json({ message: "Rating value must be between 1 and 5" });
  }

  // @ts-expect-error userId is added to req by authMiddleware
  const userId = req.user._id;
  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    const rating = await DifficultyRating.findOne({
      locationId,
      userId,
    });

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    await DifficultyRating.updateOne(
      { locationId, userId },
      {
        value,
      }
    );

    await Location.findByIdAndUpdate(locationId, {
      $inc: {
        difficultyRateValue: value - rating.value,
      },
    });

    return res.json({ message: "Ok" });
  } catch (error: any) {
    logger.error(error);
    return res.status(400).json({ message: "Error rating location" });
  }
});
