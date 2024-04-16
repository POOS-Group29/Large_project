import { NoSymbolIcon } from "@heroicons/react/20/solid";
import { LocationSchemaType } from "@xhoantran/common";
import { Badge } from "./Badge";
import { Rating } from "./Rating";

export interface ICard {
  location: LocationSchemaType;
  onClick?: () => void;
}

export const Card = (props: ICard) => {
  const {
    location: {
      image,
      name,
      difficultyRateCount,
      difficultyRateValue,
      types,
      location: {
        coordinates: [lng, lat],
      },
    },
    onClick,
  } = props;

  return (
    <>
      <div
        className="flex flex-col p-4 bg-white shadow-md rounded-lg"
        onClick={onClick}
      >
        {/* Image */}
        {image ? (
          <img
            className="w-full aspect-video object-cover rounded-lg"
            src={image}
          />
        ) : (
          <div className="w-full aspect-video bg-gray-300 rounded-lg">
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex-col">
                <NoSymbolIcon className="w-12 h-12 m-auto text-gray-400" />
                <span className="text-lg text-gray-400 text-center">
                  Not available
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row">
          <div className="text-lg font-bold">{name}</div>
        </div>

        {/* Rating */}
        <Rating rate={difficultyRateValue / difficultyRateCount} />

        {/* Types */}
        <div className="mt-2 flex flex-row gap-x-1">
          {types.map((type) => (
            <Badge text={type} />
          ))}
        </div>

        {/* Coordinates */}
        <div className="flex flex-row">
          <span className="text-sm text-gray-900">Coordinates: </span>
          <span className="text-sm text-gray-900">
            {lat.toFixed(2)}, {lng.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
};
