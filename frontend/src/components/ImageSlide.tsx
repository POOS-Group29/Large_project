import { NoSymbolIcon } from "@heroicons/react/20/solid";
import { Carousel } from "flowbite-react";
import React from "react";

interface ImageSlideProps {
  images: string[];
}

const ImageSlide: React.FC<ImageSlideProps> = ({ images }) => {
  return (
    <div className="w-full aspect-video">
      {images.length === 0 ? (
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
      ) : (
        <Carousel>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image ${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ImageSlide;
