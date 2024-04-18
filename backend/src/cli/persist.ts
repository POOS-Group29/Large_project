import { readFileSync } from "fs";
import z from "zod";

import { MongooseSetUp } from "../config/MongoConfig";
import logger from "../config/winston";
import Location from "../model/Location";

const ImageSchema = z.object({
  "800x800": z.string(),
  origin: z.string(),
});

const MaximumDepthSchema = z.object({
  FEET: z.object({
    value: z.number(),
    title: z.string(),
  }),
  METERS: z.object({
    value: z.number(),
    title: z.string(),
  }),
});

const DiveSiteSchema = z.object({
  id: z.number(),
  travelUrl: z.string(),

  maximumDepth: MaximumDepthSchema.nullable(),
  title: z.string(),
  images: z.array(ImageSchema),
  marineLife: z.array(z.string()),
  types: z.array(z.string()),
});

const DiveSiteListSchema = z.array(DiveSiteSchema);

const DiveSiteCoordinateSchema = z.object({
  id: z.number(),
  latitude: z.number(),
  longitude: z.number(),
});

const DiveSiteCoordinateListSchema = z.array(DiveSiteCoordinateSchema);

// Dive sites data
const diveSitesData = readFileSync("data/dive-sites.json", "utf-8");
const diveSites = DiveSiteListSchema.parse(JSON.parse(diveSitesData).results);

// Dive sites coordinates data
const diveSitesCoordinatesData = readFileSync(
  "data/dive-site-coordinates.json",
  "utf-8"
);
const diveSitesCoordinates = DiveSiteCoordinateListSchema.parse(
  JSON.parse(diveSitesCoordinatesData)
);
const diveSitesCoordinatesMap = new Map(
  diveSitesCoordinates.map((coordinate) => [coordinate.id, coordinate])
);

// Transform dive sites data
const diveSitesTransformed = diveSites.map((site) => {
  const coordinate = diveSitesCoordinatesMap.get(site.id);

  if (!coordinate) {
    console.warn(`Coordinate not found for dive site with id: ${site.id}`);
    return null;
  }

  return new Location({
    name: site.title,
    location: {
      type: "Point",
      coordinates: [coordinate.longitude, coordinate.latitude],
    },
    types: site.types,
    marineLife: site.marineLife,
    image: site.images.length > 0 ? site.images[0].origin : null,
    images: site.images.map((image) => image["origin"]),
    maximumDepth: site.maximumDepth
      ? {
          metters: site.maximumDepth.METERS.value,
          feet: site.maximumDepth.FEET.value,
        }
      : null,
    address: null,
    city: null,
    state: null,
    country: null,
    approved: true,
  });
});

//Persist dive sites data
MongooseSetUp().then(async () => {
  // Drop existing dive sites data
  await Location.deleteMany({});

  // Break down the dive sites data into chunks of 100
  const chunkSize = 50;
  const diveSitesChunks = [];
  for (let i = 0; i < diveSitesTransformed.length; i += chunkSize) {
    diveSitesChunks.push(diveSitesTransformed.slice(i, i + chunkSize));
  }

  // Persist dive sites data
  for (const chunk of diveSitesChunks) {
    try {
      await Location.insertMany(chunk);
    } catch (error) {
      logger.error(`Chunk index ${diveSitesChunks.indexOf(chunk)} failed`);
    }
  }
});
