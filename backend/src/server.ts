import { json, urlencoded } from "body-parser";
import { MongooseSetUp } from "config/MongoConfig";
import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import { routes } from "./routes";

// Set up mongoose
MongooseSetUp();

// Create a new express application instance
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use(routes);

// Set port, listen for requests
if (process.env.AWS_LAMBDA === undefined) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

export const handler = serverless(app);
