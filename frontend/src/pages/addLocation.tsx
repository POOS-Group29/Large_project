import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const AddLocation = () => {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const createCustomPoint = (name, longitude, latitude) => {
    if (!isNaN(latitude) && !isNaN(longitude)) {
      setPointsData([...pointsData, { name, lat: latitude, lng: longitude }]);
    } else {
      alert("Please enter valid latitude and longitude values.");
    }
    const handleSubmit = () => {
      fetch("https://api.cop4331.xhoantran.com/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longitude, latitude, name }),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then(() => {
              setMessage({
                message: "location added successfully",
                isError: false,
              });
            });
          } else {
            response.json().then((data) => {
              setMessage({
                message: data.message,
                isError: true,
              });
            });
          }
        })
        .catch(() => {
          setMessage({
            message: "An error occurred",
            isError: true,
          });
        });
    };
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Add Location</button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create Location
                        </Dialog.Title>
                        <div className="mt-2">
                          <form method="post">
                            {" "}
                            <span>
                              <input
                                type="text"
                                title="Name"
                                placeholder="Name"
                              />
                            </span>{" "}
                            <p></p>
                            <span>
                              <input
                                type="text"
                                title="Longitude"
                                placeholder="Longitude"
                              />
                            </span>{" "}
                            <span>
                              <input
                                type="text"
                                title="Latitude"
                                placeholder="Latitude"
                              />
                            </span>{" "}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        createCustomPoint();
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
