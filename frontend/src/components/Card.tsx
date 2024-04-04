import { Rating } from "./Rating";

export interface ICard {
  name: string;
  lng: number;
  lat: number;
  rate: number;
  onClick?: () => void;
}

export const Card = (props: ICard) => {
  const { name, lng, lat, rate, onClick } = props;

  return (
    <>
      <div
        className="flex flex-col p-4 bg-white shadow-md rounded-lg"
        onClick={onClick}
      >
        {/* <img
          className="h-auto max-w-lg rounded-lg"
          src="https://blog-assets.thedyrt.com/uploads/2019/07/shutterstock_385210003-1.jpg"
        /> */}

        <div className="flex flex-row">
          <div className="text-lg font-bold">{name}</div>
        </div>

        {/* Rating */}
        <Rating rate={rate} />

        <div className="flex flex-row">
          <div className="text-sm">Longitude: {lng}</div>
        </div>
        <div className="flex flex-row">
          <div className="text-sm">Latitude: {lat}</div>
        </div>
      </div>
    </>
  );
};
