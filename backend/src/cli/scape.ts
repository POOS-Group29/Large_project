import axios from "axios";
import fs from "fs";

const bottomLeft = {
  lat: -86.53194966939856,
  lng: -170.85937500000003,
};

const topRight = {
  lat: 86.53194966939856,
  lng: 170.85937500000003,
};

// Get all dive sites
axios
  .get(
    `https://travel.padi.com/api/v2/travel/dive-guide/world/all/dive-sites/?page=1&page_size=4022&bottom_left=1,${bottomLeft.lng}&top_right=${topRight.lat},${topRight.lng}`
  )
  .then((response) => {
    console.log(`Total dive sites: ${response.data.results.length}`);

    // Write data to a json file
    fs.writeFileSync("dive-sites.json", JSON.stringify(response.data));
  })
  .catch((error) => {
    console.error(error);
  });

// Divide the world into 50x50 grid
const longStep = 360 / 50;
const latStep = 180 / 50;

interface GridElement {
  bottomLeft: {
    lat: number;
    lng: number;
  };
  topRight: {
    lat: number;
    lng: number;
  };
}

const grid: GridElement[] = [];

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    grid.push({
      bottomLeft: {
        lat: -90 + latStep * i,
        lng: -180 + longStep * j,
      },
      topRight: {
        lat: -90 + latStep * (i + 1),
        lng: -180 + longStep * (j + 1),
      },
    });
  }
}

interface DiveSite {
  id: number;
  longtitute: number;
  latitude: number;
}

const diveSites: DiveSite[] = [];
const diveSiteIds = new Set();

const requestDiveSites = async (gridElement: GridElement) => {
  return axios
    .get(
      `https://travel.padi.com/api/v2/travel/dsl/dive-sites/map/?bottom_left=${gridElement.bottomLeft.lat},${gridElement.bottomLeft.lng}&top_right=${gridElement.topRight.lat},${gridElement.topRight.lng}`,
      {
        // Add headers to bypass anti-scraping
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        },
      }
    )
    .then((response) => {
      const results = response.data;
      for (const result of results) {
        if (!diveSiteIds.has(result.id)) {
          diveSites.push(result);
          diveSiteIds.add(result.id);
        }
      }
    });
};

const scrape = async () => {
  // Break the grid into chunks of 50
  const chunkSize = 50;
  const chunks = [];

  for (let i = 0; i < grid.length; i += chunkSize) {
    chunks.push(grid.slice(i, i + chunkSize));
  }

  for (let i = 0; i < chunks.length; i++) {
    const promises = chunks[i].map((gridElement) =>
      requestDiveSites(gridElement)
    );
    await Promise.all(promises);
    console.log(`Processed chunk ${i + 1}/${chunks.length}`);
    console.log(`Total dive sites: ${diveSites.length}`);
  }

  // Write data to a json file
  fs.writeFileSync("dive-site-coordinates.json", JSON.stringify(diveSites));
};

scrape();
