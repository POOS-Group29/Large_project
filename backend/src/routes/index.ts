import { Router } from "express";
import { AuthRoutes } from "./auth";
import { LocationRoutes } from "./location";

export const routes = Router();

routes.use("/api/auth", AuthRoutes);
routes.use("/api/location", LocationRoutes);
