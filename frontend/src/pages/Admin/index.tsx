import Dashboard from "../Dashboard";
import { ListLocation } from "./components/ListLocation";
import { ListPendingLocation } from "./components/ListPendingLocation";

export default function Admin() {
  return (
    <Dashboard>
      <div className="py-10 flex flex-col h-full">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col">
              <div>
                <ListPendingLocation />
              </div>

              <div className="mt-6">
                <ListLocation />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Dashboard>
  );
}
