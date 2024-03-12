import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import { MongooseSetUp } from "./config/MongoConfig";
import { AuthRoutes } from "./routes/auth";
import serverless from "serverless-http";

// Set up mongoose
MongooseSetUp();

// Create a new express application instance
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/api/auth", AuthRoutes);

// Set port, listen for requests
if (process.env.AWS_LAMBDA === undefined) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

// Export the express app
export const handler = serverless(app);
