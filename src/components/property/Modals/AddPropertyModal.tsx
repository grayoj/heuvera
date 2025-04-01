import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '../../ui/button';
import { DialogHeader } from '../../ui/dialog';
import Input from '../../ui/Input';
import { useState } from 'react';
import PropertyFeature from '../PropertyFeature';
import Amenities from '../Amenities';
import PropertyImage from '../PropertyImage';
import PropertyForm from '../PropertyForm';

export default function AddPropertyModal({
  open,
  setOpen,
}: {
  open: string;
  setOpen: (value: string) => void;
}) {
  const [active, setActive] = useState<number[]>([]);
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen ? 'add' : '');
  };

  return (
    <div className="fixed inset-0 bg-[#00000080]  flex items-center justify-center z-50 ">
      <div className="bg-white rounded-xl p-4  my-10 space-y-6">
        <Dialog open={open === 'add'} onOpenChange={handleOpenChange}>
          <DialogContent className=" max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle  className='font-semibold text-xl mb-4'>Edit Property</DialogTitle>
            </DialogHeader>

            <div className="flex gap-8">
              <div className="flex flex-col gap-6 pr-8 border-r-2">
                <PropertyForm />

                <PropertyFeature />

                <Amenities active={active} setActive={setActive} />
                <Input label="Price /night" prefix="₦"  />
              </div>

              <PropertyImage />
            </div>
          </DialogContent>
        </Dialog>
        <Button
          variant="default"
          className="bg-[#7B4F3A] text-center w-full rounded-full font-semibold"
        >
          Add Property
        </Button>
      </div>
    </div>
  );
}
