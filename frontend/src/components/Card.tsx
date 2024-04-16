import { NoSymbolIcon } from "@heroicons/react/20/solid";
import { LocationSchemaType } from "@xhoantran/common";
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

          <div className="flex flex-row">
            <div className="text-sm">Longitude: {lng}</div>
          </div>
          <div className="flex flex-row">
            <div className="text-sm">Latitude: {lat}</div>
          </div>
        </div>
        
      </div>
    </>
  );
};
