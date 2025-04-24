export default function BookingSkeleton() {
  return (
    <div className="rounded-lg border border-[#E3E2D9] dark:border-gray-700 bg-[#F8F7F2] dark:bg-gray-800 p-4">
      <div className="hidden md:block">
        <div className="mb-4 h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex gap-4 mb-4">
              <div className="h-16 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
      </div>

      <div className="block md:hidden space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 space-y-3"
            >
              <div className="flex gap-3">
                <div className="h-12 w-16 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
