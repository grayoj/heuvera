function SkeletalPreloader() {
    return (
        <div className="pt-5 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8 justify-center">
            {[...Array(10)].map((_, index) => (
                <div key={`skeleton-${index}`} className="w-full flex justify-center">
                    <div className="w-full max-w-[300px] animate-pulse">
                        <div className="bg-gray-200 w-full h-60 md:h-36 lg:h-28 xl:h-36 2xl:h-44 rounded-lg mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { SkeletalPreloader }