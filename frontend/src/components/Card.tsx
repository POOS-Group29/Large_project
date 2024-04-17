import { LocationSchemaType } from "@xhoantran/common";

import { Badge } from "./Badge";
import ImageSlide from "./ImageSlide";
import { Rating } from "./Rating";

export interface ICard {
  location: LocationSchemaType;
  onClick?: () => void;
}

export const Card = (props: ICard) => {
  const {
    location: { images, name, difficultyRateCount, difficultyRateValue, types },
    onClick,
  } = props;

  return (
    <>
      <div className="flex flex-col p-4 bg-white shadow-md rounded-lg">
        {/* Image */}
        <ImageSlide images={images} />
        <div onClick={() => onClick && onClick()}>
          <div className="flex flex-row">
            <div className="text-lg font-bold">{name}</div>
          </div>

          {/* Rating */}
          <Rating
            rate={parseFloat(
              (difficultyRateValue / difficultyRateCount).toFixed(1)
            )}
          />

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
