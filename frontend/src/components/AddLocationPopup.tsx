import React from "react";
import { API } from "../services";

interface Props {
  onClose: () => void;
}

const AddLocationPopup: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLongitude(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if latitude and longitude are valid numbers
    if (!isNaN(Number(latitude)) && !isNaN(Number(longitude))) {
      // Make API call to add location
      API.location
        .create({
          name: name,
          address: "Temp",
          city: "Temp",
          state: "Temp",
          zip: "temp",
          long: parseFloat(longitude),
          lat: parseFloat(latitude),
        })
        .then((response) => {
          if (response) {
            // Location added successfully
            console.log("Done");
          } else {
            // Error adding location
            throw new Error("Failed to add location");
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error adding location:", error);
          // Optionally, you can display an error message or perform error handling actions
        })
        .finally(() => {
          // Close the popup regardless of success or failure
          onClose();
        });
    } else {
      // Display an error message if latitude or longitude is not a number
      alert("Please enter valid latitude and longitude values.");
    }
  };

  //   const createCustomPoint = (name, longitude, latitude) => {
  //     console.log("Get here")
  //     if (!isNaN(latitude) && !isNaN(longitude)) {
  //       setPointsData([...pointsData, { name, lat: latitude, lng: longitude }]);
  //     } else {
  //       alert("Please enter valid latitude and longitude values.");
  //     }
  //     const handleSubmit = () => {
  //       fetch("https://api.cop4331.xhoantran.com/api/location", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ longitude, latitude, name }),
  //       })
  //         .then((response) => {
  //           if (response.status === 200) {
  //             response.json().then(() => {
  //               setMessage({
  //                 message: "location added successfully",
  //                 isError: false,
  //               });
  //             });
  //           } else {
  //             response.json().then((data) => {
  //               setMessage({
  //                 message: data.message,
  //                 isError: true,
  //               });
  //             });
  //           }
  //         })
  //         .catch(() => {
  //           setMessage({
  //             message: "An error occurred",
  //             isError: true,
  //           });
  //         });
  //     };
  //   };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-bold mb-4">Add Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={handleLatitudeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={handleLongitudeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => handleSubmit} // Call the createCustomPoint function when clicked
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationPopup;
