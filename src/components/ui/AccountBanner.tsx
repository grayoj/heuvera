import { Button } from "./button";
import Input from "./Input";

export default function AccountBanner() {
  return (
    <div className="w-full h-[3.4rem] bg-[#F8F7F2] flex border-b-[1px] border-[#E3E2D9] sticky top-0 z-10">
      <div className="border-r-[1px] w-[20%] flex items-center justify-center">
        <Button variant='outline' className="bg-[#F8F7F2]">Back</Button>
      </div>
      <div className="flex justify-around w-[80%] items-center text-sm">
        <p>Account {">"} <span className="font-semibold">Support</span></p>
        <Input className="w-[19rem] flex items-center justify-center text-center" placeholder="Search" />
        <Button variant='outline' className='bg-[#F8F7F2]'>Help</Button>
      </div>
    </div>
  );
}