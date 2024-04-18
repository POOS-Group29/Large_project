/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LocationSchemaType } from "@xhoantran/common";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge } from "../../../components/Badge";
import { Rating } from "../../../components/Rating";
import { API } from "../../../lib/ky";
import useDebounce from "../../../utils/useDebounce";
import { DeleteLocation } from "./DeleteLocation";
import { UpdateLocation } from "./UpdateLocation";

export const ListLocation = () => {
  const [locationDelete, setLocationDelete] =
    useState<LocationSchemaType | null>(null);
  const [locationUpdate, setLocationUpdate] =
    useState<LocationSchemaType | null>(null);

  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search, 250);

  const navigate = useNavigate();

  const listLocation = useInfiniteQuery({
    queryKey: ["location", searchDebounced],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      API.location.list({
        long: 0,
        lat: 0,
        page: pageParam,
        name: searchDebounced,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: string | any[],
      _allPages: any,
      lastPageParam: number
    ) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (
      _firstPage: any,
      _allPages: any,
      firstPageParam: number
    ) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-4 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Locations
          </h2>

          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Location name"
            />
          </div>
        </div>
      </div>

      <DeleteLocation
        onClose={() => setLocationDelete(null)}
        location={locationDelete}
      />

      <UpdateLocation
        location={locationUpdate}
        onClose={() => setLocationUpdate(null)}
      />

      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell lg:pl-8"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="sticky top-0 z-10  border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left font-semibold text-gray-900 backdrop-blur backdrop-filter "
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10  border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center font-semibold text-gray-900 backdrop-blur backdrop-filter "
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listLocation.data?.pages.map((group, i) => (
                  <Fragment key={i}>
                    {group.map((location) => (
                      <tr key={location._id} className="even:bg-gray-50">
                        <td
                          className={clsx(
                            "border-b border-gray-200",
                            "whitespace-nowrap hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:table-cell lg:pl-8"
                          )}
                        >
                          {location.name}
                        </td>
                        <td
                          className={clsx(
                            "border-b border-gray-200",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-900"
                          )}
                        >
                          <Rating
                            rate={parseFloat(
                              (
                                location.difficultyRateValue /
                                location.difficultyRateCount
                              ).toFixed(1)
                            )}
                          />
                        </td>
                        <td
                          className={clsx(
                            "border-b border-gray-200",
                            "whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"
                          )}
                        >
                          <div className="mt-2 flex flex-row gap-x-1">
                            {location.types.map((type) => (
                              <Badge key={type} text={type} />
                            ))}
                          </div>
                        </td>
                        <td
                          className={clsx(
                            "border-b border-gray-200",
                            "flex justify-end items-center gap-x-4 py-4 pr-4 pl-3 text-sm font-medium sm:pr-8 lg:pr-8"
                          )}
                        >
                          <button
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() =>
                              navigate(`/admin/location/${location._id}`)
                            }
                          >
                            View
                            <span className="sr-only">, {location.name}</span>
                          </button>
                          <Menu as="div" className="relative flex-none">
                            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                              <span className="sr-only">Open options</span>
                              <EllipsisVerticalIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      className={clsx(
                                        active ? "bg-gray-50" : "",
                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                      )}
                                      onClick={() =>
                                        setLocationUpdate(location)
                                      }
                                    >
                                      Edit
                                      <span className="sr-only">
                                        , {location.name}
                                      </span>
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      className={clsx(
                                        active ? "bg-gray-50" : "",
                                        "block px-3 py-1 text-sm leading-6 text-gray-900 cueventr-pointer"
                                      )}
                                      onClick={() =>
                                        setLocationDelete(location)
                                      }
                                    >
                                      Delete
                                      <span className="sr-only">
                                        , {location.name}
                                      </span>
                                    </a>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
                {listLocation.isLoading && (
                  <>
                    {[1, 2, 3, 4, 5].map((locationId) => (
                      <tr
                        key={locationId}
                        className="animate-pulse even:bg-gray-50"
                      >
                        <td className="border-b border-gray-200">
                          <div className="py-4 pl-4 pr-3">
                            <div className="w-32 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200">
                          <div className="px-3 py-4">
                            <div className="w-16 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200">
                          <div className="px-3 py-4 flex justify-center">
                            <div className="w-48 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200">
                          <div className="py-4 pr-4 pl-3 flex justify-end">
                            <div className="w-16 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>

            <div className="flex justify-center py-4">
              <button
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => listLocation.fetchNextPage()}
                disabled={
                  !listLocation.hasNextPage || listLocation.isFetchingNextPage
                }
              >
                {listLocation.isFetchingNextPage
                  ? "Loading more..."
                  : listLocation.hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
