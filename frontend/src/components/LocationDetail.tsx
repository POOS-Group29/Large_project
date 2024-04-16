import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import type { LocationSchemaType } from "@xhoantran/common";
import { useEffect, useState } from "react";

import { API } from "../services";
import { Rating } from "./Rating";

interface LocationDetailProps {
  id: string;
  onClickBack: () => void;
}

export const LocationDetail = (props: LocationDetailProps) => {
  const { id, onClickBack } = props;

  const [location, setLocation] = useState<LocationSchemaType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      API.location
        .retrieve(id)
        .then((data) => {
          setLocation(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {/* Back button */}
      <div
        className="flex flex-row gap-x-1 items-center mb-4"
        onClick={onClickBack}
      >
        <ChevronLeftIcon className="h-5 w-5 text-white" />
        <button className="text-white">Back</button>
      </div>

      {location ? (
        <div className="flex flex-col gap-y-2 text-white">
          <h1 className="text-2xl font-semibold">{location.name}</h1>
          <p>{location.address}</p>

          <Rating
            rate={location.difficultyRateValue / location.difficultyRateCount}
          />

          <p>
            {location.city}, {location.state} {location.zip}
          </p>
          <p>Coordinates: {location.location.coordinates.join(", ")}</p>
          <p>Created: {location.createdAt}</p>
          <p>Updated: {location.updatedAt}</p>
        </div>
      ) : (
        <div>
          {error ? (
            <p className="text-white">{error}</p>
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>
      )}
    </>
  );
};
