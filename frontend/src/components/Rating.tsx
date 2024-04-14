import React, { useState } from "react";
import clsx from "clsx";

interface RatingProps {
  rate: number;
  userId: string;
  locationId: string;
}

export const Rating = (props: RatingProps) => {
  const [currentRate, setCurrentRate] = useState(props.rate);

  const handleStarClick = async (clickedRate: number) => {
    setCurrentRate(clickedRate);

    // Call the API to submit the new rating
    try {
      const response = await fetch(
        "https://api.cop4331.xhoantran.com/api/difficulty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: props.userId,
            locationId: props.locationId,
            value: clickedRate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Rating updated:", data);
    } catch (error) {
      console.error("Failed to update rating:", error);
    }
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          className={clsx(
            "w-4 h-4",
            index <= currentRate
              ? "text-yellow-300"
              : "text-gray-300 dark:text-gray-500"
          )}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
          onClick={() => handleStarClick(index)}
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
      {!isNaN(currentRate) && (
        <>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {currentRate}
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </>
      )}
    </div>
  );
};

// import clsx from "clsx";

// export const Rating = (props: { rate: number }) => {
//   return (
//     <div className="flex items-center">
//       <svg
//         className={clsx(
//           "w-4 h-4",
//           props.rate >= 1
//             ? "text-yellow-300"
//             : "text-gray-300 dark:text-gray-500"
//         )}
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 22 20"
//       >
//         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//       </svg>
//       <svg
//         className={clsx(
//           "w-4 h-4 ms-1",
//           props.rate >= 2
//             ? "text-yellow-300"
//             : "text-gray-300 dark:text-gray-500"
//         )}
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 22 20"
//       >
//         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//       </svg>
//       <svg
//         className={clsx(
//           "w-4 h-4 ms-1",
//           props.rate >= 3
//             ? "text-yellow-300"
//             : "text-gray-300 dark:text-gray-500"
//         )}
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 22 20"
//       >
//         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//       </svg>
//       <svg
//         className={clsx(
//           "w-4 h-4 ms-1",
//           props.rate >= 4
//             ? "text-yellow-300"
//             : "text-gray-300 dark:text-gray-500"
//         )}
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 22 20"
//       >
//         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//       </svg>
//       <svg
//         className={clsx(
//           "w-4 h-4 ms-1",
//           props.rate == 5
//             ? "text-yellow-300"
//             : "text-gray-300 dark:text-gray-500"
//         )}
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="currentColor"
//         viewBox="0 0 22 20"
//       >
//         <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//       </svg>
//       {/* <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
//         {props.rate}
//       </p>
//       <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
//         out of
//       </p>
//       <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
//         5
//       </p> */}
//     </div>
//   );
// };

// import React from 'react'

// const Rating = () => {
//   return <div></div>
// }

// export default Rating




// import React, { useState } from "react";
// import clsx from "clsx";

// export const Rating = () => {
//   const [rating, setRating] = useState<number>(0);

//   const handleStarClick = (clickedRating: number) => {
//     setRating(clickedRating === rating ? 0 : clickedRating);
//   };

//   return (
//     <div className="flex items-center">
//       {[1, 2, 3, 4, 5].map((index) => (
//         <svg
//           key={index}
//           className={clsx(
//             "w-4 h-4",
//             index <= rating
//               ? "text-yellow-300"
//               : "text-gray-300 dark:text-gray-500"
//           )}
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 22 20"
//           onClick={() => handleStarClick(index)}
//         >
//           <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//         </svg>
//       ))}
//       {!isNaN(rating) && (
//         <>
//           <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
//             {rating}
//           </p>
//           <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
//             out of
//           </p>
//           <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
//             5
//           </p>
//         </>
//       )}
//     </div>
//   );
// };
