import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import type { LocationSchemaType } from "@xhoantran/common";
import { useEffect, useState } from "react";

import ImageSlide from "./ImageSlide";
import { API } from "../services";
import { Badge } from "./Badge";
import { Rating } from "./Rating";

interface LocationDetailProps {
  id: string;
  onClickBack: () => void;
}

export const LocationDetail = (props: LocationDetailProps) => {
  const { id, onClickBack } = props;

  const [location, setLocation] = useState<LocationSchemaType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    try {
      API.location
        .retrieve(id)
        .then((data) => setLocation(data))
        .catch((error) => setError(error.message));
    } catch (error) {
      console.error(error);
    }
  }, [rating, id]);

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

      {/* Image */}
      {location?.images && <ImageSlide images={location?.images} />}

      {location ? (
        <div className="flex flex-col gap-y-2 text-white">
          <h1 className="text-2xl font-semibold">{location.name}</h1>
          <p>{location.address}</p>

          <Rating
            rate={location.difficultyRateValue / location.difficultyRateCount}
          />

          {location.city && location.state && location.zip && (
            <p>
              {location.city}, {location.state} {location.zip}
            </p>
          )}

          {/* Types */}
          <div className="my-2 flex flex-row gap-x-1">
            {location.types.map((type) => (
              <Badge key={type} text={type} dark />
            ))}
          </div>

          {/* Details */}
          <p>
            Marine life:{" "}
            {location.marineLife.length > 0
              ? location.marineLife.join(", ")
              : "Not available"}
          </p>
          <p>
            Maximal depth:{" "}
            {location.maximumDepth
              ? location.maximumDepth.metters + "m"
              : "Not available"}
          </p>
          <p>
            Coords: {location.location.coordinates[0].toFixed(6)},{" "}
            {location.location.coordinates[1].toFixed(6)}
          </p>
          <p>Created: {new Date(location.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(location.updatedAt).toLocaleString()}</p>

          {/* User rating */}
          <div className="mt-4">
            <div className="flex flex-col">
              {location.userRating ? (
                <>
                  <h2 className="text-white text-lg font-bold mb-2">
                    Change your mind?
                  </h2>
                  <Rating
                    rate={location.userRating.value}
                    onRateChange={(rate) => {
                      API.rating
                        .update({
                          locationId: location._id,
                          value: rate,
                        })
                        .then(() => {
                          setRating(rate);
                        });
                    }}
                  />
                </>
              ) : (
                <>
                  <h2 className="text-white text-lg font-bold mb-2">
                    Already visited?
                  </h2>
                  <Rating
                    rate={rating}
                    onRateChange={(rate) => {
                      API.rating
                        .create({
                          locationId: location._id,
                          value: rate,
                        })
                        .then(() => {
                          setRating(rate);
                        });
                    }}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col"></div>
          </div>
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
