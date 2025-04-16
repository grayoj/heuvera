import { amenities } from "@heuvera/app/data/array";

export default function Amenities({
  activeAmenities,
  setActiveAmenities,
}: {
  activeAmenities: string[];
  setActiveAmenities: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleToggle = (name: string) => {
    setActiveAmenities((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  return (
    <div>
      <h3 className="text-sm font-medium">Amenities</h3>
      <div className="grid grid-cols-3 gap-2">
        {amenities.map((amenity) => (
          <div
            key={amenity.name}
            onClick={() => handleToggle(amenity.name)}
            className={`${
              activeAmenities.includes(amenity.name)
                ? "border-[#7B4F3A] text-[#7B4F3A] bg-[#7B4F3A1A]"
                : ""
            } bg-[#F8F7F2] flex justify-between py-3 px-1.5 rounded-md border-2 cursor-pointer`}
          >
            <span>{amenity.name}</span>
            <amenity.icon />
          </div>
        ))}
      </div>
    </div>
  );
}
