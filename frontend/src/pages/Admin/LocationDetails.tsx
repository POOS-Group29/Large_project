import { useNavigate, useParams } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useGetLocation } from "../../api/get";
import { Badge } from "../../components/Badge";
import ImageSlide from "../../components/ImageSlide";
import { Rating } from "../../components/Rating";
import Dashboard from "../Dashboard";

export default function LocationDetail() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const getLocation = useGetLocation({ id });

  return (
    <>
      <Dashboard>
        <div className="py-10 flex flex-col h-full">
          <main>
            <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
              {/* Back button */}
              <div
                className="flex flex-row gap-x-1 items-center mb-4"
                onClick={() => navigate(-1)}
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-900" />
                <button className="text-gray-900">Back</button>
              </div>

              {/* Image */}
              {getLocation.data?.images && (
                <ImageSlide images={getLocation.data.images} />
              )}

              {/* Details */}
              {getLocation.data ? (
                <div className="flex flex-col gap-y-2 mt-6">
                  <h1 className="text-2xl font-semibold">
                    {getLocation.data.name}
                  </h1>
                  <p>{getLocation.data.address}</p>

                  <Rating
                    rate={parseFloat(
                      (
                        getLocation.data.difficultyRateValue /
                        getLocation.data.difficultyRateCount
                      ).toFixed(1)
                    )}
                  />

                  {getLocation.data.city &&
                    getLocation.data.state &&
                    getLocation.data.zip && (
                      <p>
                        {getLocation.data.city}, {getLocation.data.state}{" "}
                        {getLocation.data.zip}
                      </p>
                    )}

                  {/* Types */}
                  <div className="my-2 flex flex-row gap-x-1">
                    {getLocation.data.types.map((type) => (
                      <Badge key={type} text={type} dark />
                    ))}
                  </div>

                  {/* Details */}
                  <p>
                    Marine life:{" "}
                    {getLocation.data.marineLife.length > 0
                      ? getLocation.data.marineLife.join(", ")
                      : "Not available"}
                  </p>
                  <p>
                    Maximal depth:{" "}
                    {getLocation.data.maximumDepth
                      ? getLocation.data.maximumDepth.metters + "m"
                      : "Not available"}
                  </p>
                  <p>
                    Coords:{" "}
                    {getLocation.data.location.coordinates[0].toFixed(6)},{" "}
                    {getLocation.data.location.coordinates[1].toFixed(6)}
                  </p>
                  <p>
                    Created:{" "}
                    {new Date(getLocation.data.createdAt).toLocaleString()}
                  </p>
                  <p>
                    Updated:{" "}
                    {new Date(getLocation.data.updatedAt).toLocaleString()}
                  </p>
                </div>
              ) : (
                <div>
                  {getLocation.error ? (
                    <p className="">{getLocation.error.message}</p>
                  ) : (
                    <p className="">Loading...</p>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </Dashboard>
    </>
  );
}
