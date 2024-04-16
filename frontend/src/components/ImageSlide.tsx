import { Carousel } from "@material-tailwind/react";
import React from "react";

interface ImageSlideProps {
  images: string[];
}

const ImageSlide: React.FC<ImageSlideProps> = ({ images }) => {
  return (
    <Carousel className="rounded-xl" placeholder={true}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image ${index + 1}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
};

export default ImageSlide;
