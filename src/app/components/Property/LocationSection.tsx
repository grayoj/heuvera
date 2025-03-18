export default function LocationSection() {
    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-2xl font-serif font-medium text-[#3E3E3E] pb-2">Where you're staying</h1>
            {/* Map placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                <p className="text-gray-500">Map will be displayed here</p>
            </div>
        </div>
    );
}