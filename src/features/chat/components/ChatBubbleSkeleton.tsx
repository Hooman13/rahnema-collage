export const ChatBubbleSkeleton = () => {
  return (
    <li className="rounded-3xl rounded-tr-none bg-gray-200 dark:bg-gray-900 w-32 h-10 p-2 mb-3 animate-pulse list-none">
      <div className="pt-1 pr-0 pb-1 pl-2">
        <div className="text-right mb-2 font-normal text-sm text-white"></div>
      </div>
    </li>
  );
};
