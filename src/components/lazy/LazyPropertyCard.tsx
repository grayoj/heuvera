export default function LazyPropertyCardGrid() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:max-w-[300px] animate-pulse border rounded-lg">
        <div className="bg-gray-200 dark:bg-[#444444] w-full h-60 md:h-36 lg:h-28 xl:h-36 2xl:h-44 rounded-t-lg">
          <div className="w-full flex justify-end p-4">
            <div className="size-8 bg-gray-300 dark:bg-[#55555577] rounded"></div>
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 dark:bg-[#444444] rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#444444] rounded w-1/12"></div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-[#444444] rounded w-1/2"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 dark:bg-[#444444] rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#444444] rounded w-1/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
