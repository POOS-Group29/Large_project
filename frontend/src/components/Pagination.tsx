// interface IPagination {
//   total: number;
//   perPage: number;
//   currentPage: number;
// }

export const Pagination = () => {
  // const { total, perPage, currentPage } = props;

  return (
    <div className="mt-auto">
      {/* <nav className="flex justify-center" aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-200 bg-gray-900 border border-e-0 border-gray-700 rounded-s-lg hover:bg-gray-500 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-200 bg-gray-900 border border-gray-700 hover:bg-gray-500 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-200 bg-gray-900 border border-gray-700 hover:bg-gray-500 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 border border-gray-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 border-gray-700 bg-gray-700 text-gray-200"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-200 bg-gray-900 border border-gray-700 hover:bg-gray-500 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-200 bg-gray-900 border border-gray-700 hover:bg-gray-500 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-200 bg-gray-900 border border-gray-700 rounded-e-lg hover:bg-gray-500 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
            >
              Next
            </a>
          </li>
        </ul>
      </nav> */}
      <nav className="flex justify-center" aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              //aria-current="page"
              //className="flex items-center justify-center px-3 h-8 border hover:bg-blue-100 hover:text-blue-700 border-gray-700 bg-gray-700 text-white"
              className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
