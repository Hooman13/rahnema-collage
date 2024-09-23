export const MyPageSkeleton = () => {
  return (
    <div className="flex items-center animate-pulse">
      <svg
        className="border rounded-full w-[105px] h-[105px] text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div className="grid grid-rows-3 h-[105px] mr-4 items-center">
        <div className="flex">
          <div className="ml-4 mb-2">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-900 w-40 inline-block"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-900 w-32 mr-4 inline-block"></div>
          </div>
        </div>
        <div className="flex ">
          <div className="pl-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2"></div>
          </div>
          |
          <div className="px-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2"></div>
          </div>
          |
          <div className="pr-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
      </div>
    </div>
  );
};
