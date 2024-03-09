import mongoose from "mongoose";

const url = process.env.MONGO_URL;

if (!url) {
  throw new Error("MONGO_URL must be provided");
}

export const MongooseSetUp = async () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.error("Error connecting to the database", err);
    });

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to the database", err);
  });
};
