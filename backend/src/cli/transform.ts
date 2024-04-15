import { readFileSync, writeFileSync } from "fs";
import z from "zod";

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
  images: z.array(ImageSchema),
  marineLife: z.array(z.string()),
  maximumDepth: MaximumDepthSchema.nullable(),
  title: z.string(),
  travelUrl: z.string(),
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
  }

  return {
    ...site,
    coordinate,
  };
});

// Write transformed dive sites data
writeFileSync(
  "data/dive-sites-transformed.json",
  JSON.stringify(diveSitesTransformed, null, 2)
);
