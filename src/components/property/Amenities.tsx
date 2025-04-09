import { amenities } from "@heuvera/app/data/array";

export default function Amenities({
  active,
  setActive,
}: {
  active: number[];
  setActive: (value: number[]) => void;
}) {
  const handleToggle = (index: number) => {
    if (active.includes(index)) {
      setActive(active.filter((i) => i !== index));
    } else {
      setActive([...active, index]);
    }
  };

  return (
    <div className="">
      <h3 className="">Amenities</h3>

      <div className="grid grid-cols-3 gap-2">
        {amenities.map((amenity, index) => (
          <div
            onClick={() => handleToggle(index)}
            key={index}
            className={`${
              active.includes(index) &&
              "border-[#7B4F3A] text-[#7B4F3A] bg-[#7B4F3A1A]"
            } bg-[#F8F7F2] flex justify-between py-3 px-1.5 rounded-md border-2 cursor-pointer`}
          >
            {amenity.name}
            <amenity.icon />
          </div>
        ))}
      </div>
    </div>
  );
}
