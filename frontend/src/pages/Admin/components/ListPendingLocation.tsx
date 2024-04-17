import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { LocationSchemaType } from "@xhoantran/common";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApproveLocation } from "../../../api/approve";
import { useListPendingLocation } from "../../../api/listPending";
import { Badge } from "../../../components/Badge";
import { DeleteLocation } from "./DeleteLocation";

export const ListPendingLocation = () => {
  const navigate = useNavigate();

  const [locationDelete, setLocationDelete] = useState<LocationSchemaType | null>(null);

  const listPendingLocation = useListPendingLocation();
  const approveLocation = useApproveLocation();

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-bold leading-4 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Pending Locations
          </h2>
        </div>
      </div>

      <DeleteLocation
        onClose={() => setLocationDelete(null)}
        location={locationDelete}
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
                    Maximum Depth
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
                {listPendingLocation.isLoading && (
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
                {listPendingLocation.data?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-sm font-medium text-gray-900 text-center"
                    >
                      No pending locations
                    </td>
                  </tr>
                ) : (
                  listPendingLocation.data?.map((location, locationId) => (
                    <tr key={location._id} className="even:bg-gray-50">
                      <td
                        className={clsx(
                          locationId !== listPendingLocation.data.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:table-cell lg:pl-8"
                        )}
                      >
                        {location.name}
                      </td>
                      <td
                        className={clsx(
                          locationId !== listPendingLocation.data.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-900"
                        )}
                      >
                        {location.maximumDepth
                          ? location.maximumDepth.metters + "m"
                          : "N/A"}
                      </td>

                      <td
                        className={clsx(
                          locationId !== listPendingLocation.data.length - 1
                            ? "border-b border-gray-200"
                            : "",
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
                          locationId !== listPendingLocation.data.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "flex justify-end items-center gap-x-4 py-4 pr-4 pl-3 text-sm font-medium sm:pr-8 lg:pr-8"
                        )}
                      >
                        <button
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => navigate(`/admin/location/${location._id}`)}
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
                                    onClick={() => approveLocation.mutate(location._id)}
                                  >
                                    Approve
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
                                    onClick={() => setLocationDelete(location)}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
