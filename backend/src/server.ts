import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import { MongooseSetUp } from "./config/MongoConfig";
import logger from "./config/winston";
import { routes } from "./routes";

// Create a new express application instance
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use(routes);

// Connect to MongoDB
MongooseSetUp().then(() => {
  // Set port, listen for requests
  if (process.env.AWS_LAMBDA === undefined) {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}.`);
    });
  }
});

export const handler = serverless(app);
