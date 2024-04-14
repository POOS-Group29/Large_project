/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Card, ICard } from "../components/Card";
import { LocationDetail } from "../components/LocationDetail";
import { Pagination } from "../components/Pagination";
import { API } from "../services";
import Dashboard from "./Dashboard";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";

const transformLocationData = (data: any) => {
  return data.map((location: any) => {
    return {
      ...location,
      lat: location.location.coordinates[1],
      lng: location.location.coordinates[0],
      rate: location.difficultyRateValue / location.difficultyRateCount,
    };
  });
};

export default function Home() {
  const [pointsData, setPointsData] = useState<ICard[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<ICard | null>(null);
  const [pov, setPov] = useState({
    lat: 0,
    lng: 0,
    altitude: 2.5
  })
  const setPovDebounced = useDebounceCallback(setPov, 10);
  const globeRef = useRef();

  useEffect(() => {
    API.location
      .list({
        long: pov.lng,
        lat: pov.lat
      })
      .then((data: any) => {
        console.log(data);
        setPointsData(transformLocationData(data));
      });
  }, [pov]);

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
                      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'point' implicitly has an 'any' type.
                      id={selectedPoint._id}
                      onClickBack={() => setSelectedPoint(null)}
                    />
                  ) : (
                    <>
                      {pointsData.map((point, index) => (
                        <Card
                          onClick={() => setSelectedPoint(point)}
                          key={index}
                          rate={point.rate}
                          name={point.name}
                          lat={point.lat}
                          lng={point.lng}
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
                  onPointClick={(point) => setSelectedPoint(point as any)}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                  onZoom={(newPov) => setPovDebounced(newPov)}
                />
              </div>
            </main>
          </div>
        </div>
      </Dashboard>
    </>
  );
}
