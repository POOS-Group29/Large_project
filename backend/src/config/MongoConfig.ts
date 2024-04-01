import mongoose from "mongoose";
import Location from "../model/Location";

const url = process.env.MONGO_URL;

if (!url) {
  throw new Error("MONGO_URL must be provided");
}

export const MongooseSetUp = async () => {
  mongoose
    .connect(url)
    .then(async () => {
      console.log("Successfully connected to the database");
      await Location.createIndexes();
    })
    .catch((err) => {
      console.error("Error connecting to the database", err);
    });

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to the database", err);
  });
};
