import React, { Fragment, useState } from "react";
import AddLocationPopup from "../components/AddLocationPopup"; // Import the AddLocationPopup component
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { API } from "../services";

import clsx from "clsx";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Directory", href: "#", current: false },
];
const userNavigation = [{ name: "Sign out", href: "signin" }];

export default function Dashboard(props: React.PropsWithChildren<object>) {
  const { children } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery) {
      alert("Please enter a search term.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.cop4331.xhoantran.com/api/location/search=${encodeURIComponent(
          searchQuery
        )}`,
        {
          method: "GET", // Assuming GET since you're fetching data
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      alert("Failed to fetch locations");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full">
        <Popover
          as="header"
          className={({ open }) =>
            clsx(
              open ? "fixed inset-0 z-40 overflow-y-auto" : "",
              "bg-white shadow-sm lg:static lg:overflow-y-visible"
            )
          }
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                  <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                    <div className="flex flex-shrink-0 items-center">
                      <a href="#">
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                          alt="Your Company"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                      <div className="w-full">
                        <form onSubmit={handleSearch}>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <MagnifyingGlassIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                            <input
                              id="search"
                              name="search"
                              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                              placeholder="Search"
                              type="search"
                              value={searchQuery}
                              onChange={handleInputChange}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* More component code here */}
                </div>
              </div>
            </>
          )}
        </Popover>

        {/* Display search results */}
        {locations.length > 0 && (
          <ul>
            {locations.map((location) => (
              <li key={location.name}>{location.name}</li>
            ))}
          </ul>
        )}

        {children}
      </div>
    </>
  );
}
