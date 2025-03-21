import { Button } from '@heuvera/components/ui/button';
import { personInput } from '../../data/array';
import Input from '../../../components/ui/Input';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@heuvera/components/ui/avatar';
import Help from '@heuvera/components/ui/Help';
import { Plus, Upload } from 'lucide-react';

export default function PersonInfo() {
  return (
    <>
      <div className="border-b pb-5 mb-5">
        <h2 className="text-[20px] font-medium-">Personal Info</h2>
        <p className="text-[#898989] font-normal text-[14px]">
          Update your profile, contact details, and preferences to personalize
          your experience.
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col justify-between w-[66%]">
          <div className="pb-5">
            <Avatar className="w-[75px] h-[75px]">
              <AvatarImage className="" src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex mt-5 justify-between">
              <div>
                <h2 className="text-[1rem] font-medium">Profile Picture</h2>
                <p className="text-[#898989] text-[14px] ">
                  PNG,JPEG under 15mb{' '}
                </p>
              </div>
              <div className="flex space-x-8">
                <Button variant="default" className="bg-[#7B4F3A] rounded-full">
                  <Upload />
                  Upload Image
                </Button>
                <Button variant="outline" className="rounded-full">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          {personInput.map((item, index) => (
            <div
              key={index}
              className={`${item.label2 && 'flex-row'} flex flex-col space-y-4`}
            >
              <div className="flex justify-between items-center space-x-4 space-y-5 border-t">
                <div className="flex flex-col justify-center mt-3  space-y-4 w-[50%]">
                  <Input label={item.label || ''} value={item.value || ''} />
                  {index >= 1 && (
                    <Button variant="outline" className="w-fit rounded-full">
                      <Plus />
                      {item.secondaryBtn}
                    </Button>
                  )}
                </div>
                {item.label2 && (
                  <Input label={item.label2 || ''} value={item.value || ''} />
                )}
                {index >= 1 && (
                  <Button variant="outline">{item.primaryBtn}</Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Help />
      </div>
    </>
  );
}
