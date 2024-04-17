import { Popover } from "@headlessui/react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { LocationSchemaType } from "@xhoantran/common";
import clsx from "clsx";
import { HTTPError } from "ky";
import React, { useEffect, useRef, useState } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";

import { useNavigate } from "react-router-dom";
import { AddLocation } from "../components/AddLocation";
import { ROUTES } from "../config/routes";
import { API } from "../lib/ky";
import { useAuthStore } from "../lib/zustand";

interface DashboardProps extends React.PropsWithChildren<object> {
  onSelectedLocation?: (location: LocationSchemaType) => void;
}

export default function Dashboard(props: DashboardProps) {
  const { children } = props;
  const navigate = useNavigate();

  const { user, setUser, setToken } = useAuthStore();

  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [results, setResults] = useState<LocationSchemaType[]>([]);
  const [debouncedSearchValue] = useDebounceValue(search, 100);

  useEffect(() => {
    API.auth
      .fetchProfile()
      .then((data) => setUser(data))
      .catch((error) => {
        if (error instanceof HTTPError) {
          if (error.response.status === 401) {
            window.location.href = ROUTES.SIGN_IN;
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!debouncedSearchValue && user?.isAdmin) {
      setResults([]);
    } else {
      API.location
        .search({
          name: debouncedSearchValue,
        })
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  useOnClickOutside(searchRef, () => setSearchOpen(false));

  return (
    <>
      <div className="flex flex-col h-screen w-full">
        {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
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
                      <a>
                        <img
                          className="h-8 w-auto"
                          src="/scubadiver.jpeg"
                          alt="Scuparadise"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0 h-14">
                      <div className="w-full relative" ref={searchRef}>
                        {!user?.isAdmin && (
                          <>
                            <label htmlFor="search" className="sr-only">
                              Search
                            </label>
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
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                                placeholder="Search"
                                type="search"
                                onFocus={() => setSearchOpen(true)}
                              />
                            </div>
                            {searchOpen && (
                              <div className="w-full absolute z-[51]">
                                <div className="bg-white border border-gray-200 rounded-md shadow-lg">
                                  {results.length === 0 ? (
                                    debouncedSearchValue.length > 0 ? (
                                      <a className="block px-6 py-4 text-sm text-gray-700">
                                        No results found
                                      </a>
                                    ) : (
                                      <a className="block px-6 py-4 text-sm text-gray-700">
                                        Start typing to search
                                      </a>
                                    )
                                  ) : (
                                    results.map((location) => (
                                      <a
                                        key={location._id}
                                        className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                          if (props.onSelectedLocation) {
                                            props.onSelectedLocation(location);
                                            setSearchOpen(false);
                                          }
                                        }}
                                      >
                                        <p className="font-semibold">
                                          {location.name}
                                        </p>
                                        <p className="text-gray-500">
                                          Maximum Depth:{" "}
                                          {location.maximumDepth
                                            ? `${location.maximumDepth.metters}m`
                                            : "N/A"}
                                        </p>
                                      </a>
                                    ))
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                    {/* Profile dropdown */}
                    <ArrowRightEndOnRectangleIcon
                      className="h-6 w-6 text-gray-700 cursor-pointer"
                      onClick={() => {
                        setToken("");
                        setUser(null);
                        navigate(ROUTES.SIGN_IN);
                      }}
                    />
                    <AddLocation />
                  </div>
                </div>
              </div>

              <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <UserCircleIcon
                        className="h-10 w-10 rounded-full text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user?.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                    <ArrowRightEndOnRectangleIcon
                      className="h-6 w-6 text-gray-700 cursor-pointer"
                      onClick={() => {
                        setToken("");
                        setUser(null);
                        navigate(ROUTES.SIGN_IN);
                      }}
                    />
                    <AddLocation />
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>

        {children}
      </div>
    </>
  );
}
