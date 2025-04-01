'use client'

import PastBookingTable from '@heuvera/components/booking/PastBookingTable';
import UpcomingBookingTable from '@heuvera/components/booking/UpcomingBookingTable';
import AccountHeader from '@heuvera/components/ui/AccountHeader';
import { Button } from '@heuvera/components/ui/button';
import PageLayout from '@heuvera/components/ui/PageLayout';
import { MessageSquare, Pencil, X } from 'lucide-react';
import { useState } from 'react';

export default function Page() {
  const [active,setActive]= useState('upcoming')
  return (
    <PageLayout>
      <AccountHeader
      className='border-none relative'
        heading="Booking Management"
        subheading="Track upcoming, ongoing, and past bookings in one place"
      >
        <div className="absolute flex justify-end w-full items-end top-[25%] border-b mt-4">
          <Button
          onClick={()=> setActive('upcoming')}
            variant="outline"
            className={`${active==='upcoming' ? 'bg-[#F5F5F0] hover:bg-[#e2e2e2]' : 'bg-[#E3E2D9]'} py-2.5 px-6 rounded-t-xl hover:cursor-pointer  absolute right-40 rounded-b-[0px] border-b-0`}
          >
            Upcoming Bookings
          </Button>
          <Button
          onClick={()=> setActive('past')}
            variant="default"
            className={`${active==='past' ? 'bg-[#F5F5F0] hover:bg-[#e2e2e2]' : 'bg-[#E3E2D9] hover:bg-[#cac9c3]'} py-2.5 px-12 rounded-t-xl rounded-b-[0px] hover:cursor-pointer   text-black`}
          >
            Past Bookings
          </Button>
        </div>
      </AccountHeader>

      
        
      <div className="flex justify-between items-center mb-4 border-l">
        <h3>Upcoming Bookings</h3>
        <div className="flex justify-between gap-3 text-[#E3E2D9]">
          <Button variant="outline" className="cursor-pointer bg-transparent">
            Modify <Pencil />{' '}
          </Button>
          <Button variant="outline" className="cursor-pointer bg-transparent">
            Cancel <X />
          </Button>
          <Button variant="default" className="cursor-pointer bg-[#7B4F3A]">
            Contact Guest <MessageSquare />
          </Button>
        </div>
      </div>
      {active ==='upcoming' ? <UpcomingBookingTable /> : <PastBookingTable />}
    </PageLayout>
  );
}
