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
        <img
          className="w-full aspect-video object-cover rounded-lg"
          src="https://d2p1cf6997m1ir.cloudfront.net/media/thumbnails/73/08/7308015568c5a4ce1ae7d0188490e46b.webp"
        />

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
