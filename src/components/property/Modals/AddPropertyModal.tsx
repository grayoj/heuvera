import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";
import { DialogHeader } from "../../ui/dialog";
import Input from "../../ui/Input";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Amenities from "../Amenities";
import Textarea from "@heuvera/components/ui/Textarea";
import DropDown from "@heuvera/components/ui/DropDown";
import Image from "next/image";
import { Bath, BedDouble, Trash, Upload, User } from "lucide-react";

export default function AddPropertyModal({
  open,
  setOpen,
}: {
  open: string;
  setOpen: (value: string) => void;
}) {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    price: "",
    bedrooms: "1",
    bathrooms: "1",
    guests: "1",
  });

  const [activeAmenities, setActiveAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen ? "add" : "");
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      amenities: activeAmenities,
      images,
    };

    console.log("Submitting: ", payload);

    setFormData({
      location: "",
      description: "",
      price: "",
      bedrooms: "1",
      bathrooms: "1",
      guests: "1",
    });
    setImages([]);
    setActiveAmenities([]);
    setOpen("");
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
      <AnimatePresence>
        {open === "add" && (
          <motion.div
            className="bg-[#F8F7F2] dark:bg-[#333333] rounded-xl p-4 my-10 space-y-6 w-[90vw] max-w-[1024px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Dialog open={open === "add"} onOpenChange={handleOpenChange}>
              <DialogContent className="max-h-[80vh] bg-[#F8F7F2] dark:bg-[#333333] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-semibold text-xl mb-4">
                    Add Property
                  </DialogTitle>
                </DialogHeader>

                <div className="flex gap-8">
                  {/* Left Side */}
                  <div className="flex flex-col gap-6 pr-8 border-r-2">
                    <div className="grid gap-4">
                      <Input
                        label="Property Location"
                        className="col-span-3"
                        value={formData.location}
                        onChange={handleChange("location")}
                      />
                      <Textarea
                        label="Property Description"
                        className="col-span-3"
                        value={formData.description}
                        onChange={handleChange("description")}
                      />
                    </div>

                    <div className="flex gap-4 w-full">
                      <DropDown
                        type="guests"
                        icon={<User />}
                        label="Guests"
                        value={formData.guests}
                        onChange={(val) => handleDropdownChange("guests", val)}
                      />
                      <DropDown
                        type="bedrooms"
                        icon={<BedDouble />}
                        label="Bedrooms"
                        value={formData.bedrooms}
                        onChange={(val) =>
                          handleDropdownChange("bedrooms", val)
                        }
                      />
                      <DropDown
                        type="bathrooms"
                        icon={<Bath/>}
                        label="Bathrooms"
                        value={formData.bathrooms}
                        onChange={(val) =>
                          handleDropdownChange("bathrooms", val)
                        }
                      />
                    </div>

                    <Amenities
                      activeAmenities={activeAmenities}
                      setActiveAmenities={setActiveAmenities}
                    />

                    <Input
                      label="Price /night"
                      prefix="₦"
                      value={formData.price}
                      onChange={handleChange("price")}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Property Images</h3>
                      <Button variant="outline" onClick={handleUploadClick}>
                        <Upload size={16} className="mr-1" />
                        Upload Image
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(image)}
                            width={313}
                            height={150}
                            alt={`preview-${index}`}
                            className="rounded-lg object-cover"
                          />
                          <Trash
                            onClick={() => handleDelete(index)}
                            className="absolute top-2 right-2 text-[#EA4335] bg-white rounded-full p-1 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="default"
              className="bg-[#7B4F3A] text-center w-full rounded-full font-semibold"
              onClick={handleSubmit}
            >
              Add Property
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
