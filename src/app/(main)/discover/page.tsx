export default function Discover() {
  return <>
{/*   <section className="relative bg-[#8b5d3b] py-16 md:py-24 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-8 left-24 w-64 h-40 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=160&width=256"
            alt="Interior"
            width={256}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-8 right-24 w-64 h-40 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=160&width=256"
            alt="Building"
            width={256}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute bottom-24 left-24 w-32 h-40 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=160&width=128"
            alt="Kitchen"
            width={128}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute bottom-24 right-24 w-64 h-40 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=160&width=256"
            alt="Balcony"
            width={256}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
          Find <span className="text-[#e8a87c]">exclusive homes</span> that
          <br />
          fit your life style
        </h1>

        {/* Search Box */}
        <div className="mt-16">
          <div className="inline-flex bg-white rounded-lg p-1 mb-8">
            {["Lease", "Rent", "Stays"].map((tab) => (
              <button
                key={tab}
                className={`px-8 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab ? "bg-[#f8f5f0] text-gray-800" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row bg-white rounded-full overflow-hidden shadow-xl">
            <div className="flex-1 p-4 border-r border-gray-200">
              <div className="text-xs text-gray-500 font-medium">Where</div>
              <input
                type="text"
                placeholder="Address, City or Zip"
                className="w-full outline-none text-gray-800 text-sm mt-1"
              />
            </div>
            <div className="flex-1 p-4 border-r border-gray-200">
              <div className="text-xs text-gray-500 font-medium">Price</div>
              <input type="text" placeholder="Add price" className="w-full outline-none text-gray-800 text-sm mt-1" />
            </div>
            <div className="flex-1 p-4 border-r border-gray-200">
              <div className="text-xs text-gray-500 font-medium">Beds & bath</div>
              <input
                type="text"
                placeholder="Add bed & bath"
                className="w-full outline-none text-gray-800 text-sm mt-1"
              />
            </div>
            <div className="flex-1 p-4 border-r border-gray-200">
              <div className="text-xs text-gray-500 font-medium">Property Type</div>
              <input type="text" placeholder="Property" className="w-full outline-none text-gray-800 text-sm mt-1" />
            </div>
            <Link
              href="/search-results"
              className="bg-[#8b5d3b] text-white p-6 flex items-center justify-center hover:bg-[#7a4d2b] transition-colors"
            >
              <Search size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section> */}
  </>;
}
