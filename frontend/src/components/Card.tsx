import { NoSymbolIcon } from "@heroicons/react/20/solid";
import { LocationSchemaType } from "@xhoantran/common";
import { Badge } from "./Badge";
import { Rating } from "./Rating";
import { Carousel } from "@material-tailwind/react";
import ImageSlide from "./ImageSlide";
import Globe, { GlobeMethods } from 'react-globe.gl';


export interface ICard {
  globeRef: React.MutableRefObject<GlobeMethods | undefined>;
  location: LocationSchemaType;
  onClick?: () => void;
}

export const Card = (props: ICard) => {
  const {
    globeRef,
    location: {
      image,
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
    // Function logic for getting globe location
    console.log("Getting globe location...");
    globeRef.current?.pointOfView({
      lat: lat,
      lng: lng,
    });
    
  };

  return (
    <>
      <div
        className="flex flex-col p-4 bg-white shadow-md rounded-lg"
        
      >
        {/* Image */}
        {images && <ImageSlide images={images} />} 
        <div onClick={() => {
          onClick && onClick(); // Call onClick function if provided
          getGlobeLocation(lng, lat); // Call getGlobeLocation function
        }}>
          <div className="flex flex-row"
          
          >
            <div className="text-lg font-bold">{name}</div>
          </div>

          {/* Rating */}
          <Rating rate={difficultyRateValue / difficultyRateCount} />

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
