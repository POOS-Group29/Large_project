import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { AuthRoutes } from "./auth";
import { LocationRoutes } from "./location";
import { RatingRoutes } from "./rating";

export const routes = Router();

routes.use("/api/auth", AuthRoutes);
routes.use("/api/location", authMiddleware, LocationRoutes);
routes.use("/api/rating", authMiddleware, RatingRoutes);
