import mongoose from "mongoose";
import Location from "../model/Location";
import logger from "./winston";

const url = process.env.MONGO_URL;

if (!url) {
  throw new Error("MONGO_URL must be provided");
}

export const MongooseSetUp = async () => {
  try {
    await mongoose.connect(url);
    logger.info("Successfully connected to the database");
    await Location.createIndexes();
    logger.info("Successfully created indexes");
  } catch (error) {
    logger.error("Error connecting to the database", error);
  }
};
