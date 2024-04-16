import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { useDebounceCallback } from "usehooks-ts";
import { Card } from "../components/Card";
import { LocationDetail } from "../components/LocationDetail";
import { Pagination } from "../components/Pagination";
import { API } from "../services";
import Dashboard from "./Dashboard";

import type { LocationSchemaType } from "@xhoantran/common";

interface IPoint extends LocationSchemaType {
  lat: number;
  lng: number;
  _id: string; // Define _id property
}

const transformLocation = (location: LocationSchemaType): IPoint => {
  const {
    location: { coordinates },
  } = location;

  return {
    ...location,
    lat: coordinates[1],
    lng: coordinates[0],
  };
};

export default function Home() {
  const [pointsData, setPointsData] = useState<LocationSchemaType[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<LocationSchemaType | null>(
    null
  );
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);

  const [pov, setPov] = useState({
    lat: 0,
    lng: 0,
    altitude: 2.5,
  });
  const setPovDebounced = useDebounceCallback(setPov, 50);
  const globeRef = useRef();

  useEffect(() => {
    API.location
      .list({
        long: pov.lng,
        lat: pov.lat,
      })
      .then((data) =>
        setPointsData(data.map((location) => transformLocation(location)))
      );
  }, [pov]);

  const handleCardClick = (pointId: string) => {
    setSelectedPointId(pointId);
  };

  return (
    <>
      <Dashboard>
        <div className="relative h-full w-full overflow-hidden">
          {/* Removed transition mobile code */}

          {/* Static sidebar for desktop */}
          <div className="hidden lg:absolute lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 py-4">
              <div className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  {selectedPoint ? (
                    <LocationDetail
                      id={selectedPoint._id}
                      onClickBack={() => setSelectedPoint(null)}
                      globeRef={globeRef}
                    />
                  ) : (
                    <>
                      {pointsData.map((point, index) => (
                        <Card
                          globeRef={globeRef}
                          onClick={() => setSelectedPoint(point)}
                          onCardClick={handleCardClick} // Pass onCardClick callback
                          key={index}
                          location={point}
                        />
                      ))}
                      <Pagination />
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:pl-96">
            <main className="py-10">
              <div
                className="px-4 sm:px-6 lg:px-8"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "-100px",
                }}
              >
                <Globe
                  ref={globeRef}
                  pointsData={pointsData}
                  onPointClick={(point) =>
                    setSelectedPoint(point as LocationSchemaType)
                  }
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                  onZoom={(newPov) => setPovDebounced(newPov)}
                  pointColor={(point) => {
                    // Change color based on selectedPointId
                    return point._id === selectedPointId ? 'red' : '#ffffaa';
                  }}
                />
              </div>
            </main>
          </div>
        </div>
      </Dashboard>
    </>
  );
}
