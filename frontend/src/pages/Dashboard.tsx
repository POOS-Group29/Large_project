import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LocationSchemaType } from "@xhoantran/common";
import clsx from "clsx";
import { HTTPError } from "ky";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";

import { AddLocation } from "../components/AddLocation";
import { ROUTES } from "../config/routes";
import { API } from "../lib/ky";
import { useAuthStore } from "../lib/zustand";

const userNavigation = [
  { name: "Your Profile", onClick: () => {} },
  { name: "Settings", onClick: () => {} },
  {
    name: "Sign out",
    onClick: () => {
      localStorage.removeItem("token");
      window.location.href = ROUTES.SIGN_IN;
    },
  },
];

interface DashboardProps extends React.PropsWithChildren<object> {
  onSelectedLocation?: (location: LocationSchemaType) => void;
}

export default function Dashboard(props: DashboardProps) {
  const { children } = props;

  const { user, setUser } = useAuthStore();

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
                    <Menu as="div" className="relative ml-5 flex-shrink-0">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon
                            className="h-8 w-8 rounded-full text-gray-400"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  onClick={item.onClick}
                                  className={clsx(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>

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
                    {userNavigation.map((item) => (
                      <a
                        key={item.name}
                        onClick={item.onClick}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    ))}
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
