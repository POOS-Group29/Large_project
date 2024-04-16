import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "../services";

const schema = z.object({
  name: z.string(),
  address: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  zip: z.string().nullish(),
  maximumDepth: z.string().nullish(),
  long: z.string().refine((value) => {
    return (
      value.length === 0 ||
      (!isNaN(parseFloat(value)) &&
        parseFloat(value) >= -180 &&
        parseFloat(value) <= 180)
    );
  }),
  lat: z.string().refine((value) => {
    return (
      value.length === 0 ||
      (!isNaN(parseFloat(value)) &&
        parseFloat(value) >= -90 &&
        parseFloat(value) <= 90)
    );
  }),
});

export const AddLocation = () => {
  const [open, setOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    API.location
      .create({
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        long: data.long,
        lat: data.lat,
      })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        methods.setError("root", {
          type: "server",
          message: error.message,
        });
      });
  });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="ml-6 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        New Location
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            New Location
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <FormProvider {...methods}>
                          {errors.root && (
                            <div className="mb-6 rounded-md bg-red-50 p-4">
                              <div className="flex">
                                <div className="shrink-0">
                                  <XCircleIcon
                                    className="h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-red-800">
                                    {errors.root.message}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          )}
                          <form onSubmit={onSubmit}>
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Name<span className="text-red-500">*</span>
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("name")}
                                  type="text"
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="Location Name"
                                />
                              </div>
                            </div>

                            <div className="mt-6">
                              <label
                                htmlFor="long"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Longtitude
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("long")}
                                  type="number"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="36.8219"
                                />
                              </div>
                            </div>

                            <div className="mt-6">
                              <label
                                htmlFor="lat"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Latitude<span className="text-red-500">*</span>
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("lat")}
                                  type="number"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="-1.2921"
                                />
                              </div>
                            </div>

                            <div className="mt-6">
                              <label
                                htmlFor="maximumDepth"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Maximum Depth
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("maximumDepth")}
                                  type="number"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="-1.2921"
                                />
                              </div>
                            </div>

                            <div className="mt-6">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Address
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("address")}
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="Address"
                                />
                              </div>
                            </div>

                            <div className="mt-6">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("city")}
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="City"
                                />
                              </div>
                            </div>

                            <div className="mt-6">
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                State
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("state")}
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="State"
                                />
                              </div>
                            </div>

                            <div className="mt-6">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Country
                              </label>
                              <div className="mt-2">
                                <input
                                  {...register("country")}
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                                  placeholder="Country"
                                />
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => setOpen(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                                disabled={isSubmitting}
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </FormProvider>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
