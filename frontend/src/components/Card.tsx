import { LocationSchemaType } from "@xhoantran/common";
import { GlobeMethods } from "react-globe.gl";

import { Badge } from "./Badge";
import ImageSlide from "./ImageSlide";
import { Rating } from "./Rating";

export interface ICard {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  location: LocationSchemaType;
  onClick?: () => void;
  onCardClick?: (pointId: string) => void; // Add onCardClick to the interface
}

export const Card = (props: ICard) => {
  const {
    globeRef,
    location: {
      _id,
      images,
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

  const getGlobeLocation = (lng: number, lat: number) => {
    // Function logic for getting globe location '#e0310d'
    console.log("Getting globe location...");
    globeRef.current?.pointOfView({
      lat: (lat - 2 + 90) % 180 - 90, //(lat + 2 + 90 ) mod 360 - 270
      lng: (lng + 8 + 180) % 360 - 180,
      altitude: 0.75
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col p-4 bg-white shadow-md rounded-lg">
        {/* Image */}
        <ImageSlide images={images} />
        <div
          onClick={() => {
            onClick && onClick(); // Call onClick function if provided
            getGlobeLocation(lng, lat); // Call getGlobeLocation function
            props.onCardClick && props.onCardClick(_id); // Pass the ID of the selected point
          }}
        >
          <div className="flex flex-row">
            <div className="text-lg font-bold">{name}</div>
          </div>

          {/* Rating */}
          <Rating rate={difficultyRateValue / difficultyRateCount} />

          {/* Types */}
          <div className="mt-2 flex flex-row gap-x-1">
            {types.map((type) => (
              <Badge key={type} text={type} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
