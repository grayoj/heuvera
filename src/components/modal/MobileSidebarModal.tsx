"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Calendar,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { Button } from "@heuvera/components/ui/button";
import SidebarItem from "@heuvera/components/ui/SidebarItem";
import {
  Dialog,
  DialogContentNoClose,
  DialogHeader,
} from "@heuvera/components/ui/dialog";

import PersonInfo from "@heuvera/app/(main)/profile/property-renters/personal/page";
import BookingHistory from "@heuvera/app/(main)/profile/property-renters/booking/page";
import PaymentMethods from "@heuvera/app/(main)/profile/property-renters/payment/page";
import Support from "@heuvera/app/(main)/profile/property-renters/support/page";

const sideBarItems = [
  {
    name: "Personal Info",
    route: "personal",
    description:
      "Update your profile, contact details, and preferences to personalize your experience.",
    icon: User,
    component: PersonInfo,
  },
  {
    route: "booking",
    name: "Booking History",
    description:
      "View and manage your past, current, and upcoming bookings in one place.",
    icon: Calendar,
    component: BookingHistory,
  },
  {
    route: "payment",
    name: "Payment Methods",
    description:
      "Securely manage and update your preferred payment options for smooth transactions.",
    icon: CreditCard,
    component: PaymentMethods,
  },
  {
    route: "support",
    name: "Support & Assistance",
    description:
      "Get help, contact support, and access resources to enhance your experience.",
    icon: HelpCircle,
    component: Support,
  },
];

const MobileProfileSettings = () => {
  const [selectedItem, setSelectedItem] = useState<
    (typeof sideBarItems)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: (typeof sideBarItems)[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8F7F2] dark:bg-[#333333]">
      <div className="flex-1 overflow-y-auto px-4 space-y-2 py-2">
        <h1 className="text-xl font-semibold mb-4 pt-2">Profile Settings</h1>
        {sideBarItems.map((item) => (
          <div
            key={item.route}
            onClick={() => handleItemClick(item)}
            className="cursor-pointer"
          >
            <SidebarItem item={item} route={item.route}>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <h2 className="font-medium text-sm">{item.name}</h2>
                  <p className="text-[#898989] text-xs w-full line-clamp-2 overflow-hidden text-ellipsis">
                    {item.description}
                  </p>
                </div>
                <div className="text-gray-400">›</div>
              </div>
            </SidebarItem>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContentNoClose className="p-0 sm:max-w-md max-w-full w-full mx-auto bg-[#F8F7F2] dark:bg-[#333333] sm:h-auto h-full flex flex-col rounded-none">
          <DialogHeader className="px-4 py-3 border-b flex flex-row items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseModal}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto w-full max-h-[calc(100vh-6rem)]">
            {selectedItem && (
              <div className="px-4 w-full">
                {React.createElement(selectedItem.component)}
              </div>
            )}
          </div>
        </DialogContentNoClose>
      </Dialog>
    </div>
  );
};

export default MobileProfileSettings;
