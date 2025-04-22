"use client";

import React, { useState } from "react";
import {
  User,
  Calendar,
  CreditCard,
  HelpCircle,
  Settings,
  ChevronRight,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@heuvera/components/ui/button";
import { Dialog, DialogContent } from "@heuvera/components/ui/dialog";

import PersonInfo from "@heuvera/app/(main)/account/page";
import BookingHistory from "@heuvera/app/(main)/account/booking/page";
import PaymentMethods from "@heuvera/app/(main)/account/payment/page";
import Support from "@heuvera/app/(main)/account/support/page";
import GeneralSettingsPage from "@heuvera/app/(main)/account/settings/page";
import useIsMobile from "@heuvera/hooks/IsMobile";
import { RiHomeSmileLine, RiLogoutBoxRLine } from "react-icons/ri";

const sideBarItems = [
  {
    route: "account",
    name: "My Account",
    description: "Personal details and preferences",
    icon: User,
    component: PersonInfo,
  },
  {
    route: "booking",
    name: "Booking History",
    description: "View past and upcoming bookings",
    icon: Calendar,
    component: BookingHistory,
  },
  {
    route: "payment",
    name: "Payment Methods",
    description: "Manage your payment options",
    icon: CreditCard,
    component: PaymentMethods,
  },
  {
    route: "support",
    name: "Support & Assistance",
    description: "Get help with your account",
    icon: HelpCircle,
    component: Support,
  },
  {
    route: "settings",
    name: "General Settings",
    description: "App preferences and appearance",
    icon: Settings,
    component: GeneralSettingsPage,
  },
];

const MobileProfileSettings = () => {
  const isMobile = useIsMobile();
  const [selectedItem, setSelectedItem] = useState<
    (typeof sideBarItems)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: (typeof sideBarItems)[0]) => {
    setSelectedItem(item);
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-6">
        <h1 className="text-xl font-semibold text-[#3E3E3E] dark:text-[#F8F7F2]">
          Profile
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="mt-2">
          {sideBarItems.map((item) => (
            <div
              key={item.route}
              className="border-b-[0.2px] border-[#E3E2D988] dark:border-[#44444488]"
            >
              <div
                className="flex items-center justify-between py-4 cursor-pointer active:bg-gray-100 dark:active:bg-[#555555]"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium text-[#3E3E3E] dark:text-[#F8F7F2]">
                      {item.name}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#A7A7A7]" />
              </div>
            </div>
          ))}
        </div>
        <a href="/hosts">
          <div className="border-b-[0.2px] border-[#E3E2D988] dark:border-[#44444488]">
            <div className="flex items-center justify-between py-4 cursor-pointer active:bg-gray-100 dark:active:bg-[#555555]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                  <RiHomeSmileLine className="text-lg" />
                </div>
                <div>
                  <p className="font-medium text-[#3E3E3E] dark:text-[#F8F7F2]">
                    Switch to Host
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A7A7A7]" />
            </div>
          </div>
        </a>
        <a href="/api/auth/logout">
          <div className="flex items-center justify-between py-4 cursor-pointer active:bg-gray-100 dark:active:bg-[#555555]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <RiLogoutBoxRLine className="text-lg text-[#FF6B6B]" />
              </div>
              <div>
                <p className="font-medium text-[#FF6B6B]">Logout</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#FF6B6B]" />
          </div>
        </a>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="p-0 sm:max-w-md max-w-full bg-[#F8F7F2] dark:bg-[#333333] w-full mx-auto sm:h-auto h-full flex flex-col rounded-none">
          <div className="flex items-center mt-20 bg-[#F8F7F2] dark:bg-[#333333]">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseModal}
              className="mr-3"
            >
              <ChevronLeft className="h-5 w-5 text-[#A7A7A7]" />
            </Button>
            <h2 className="text-lg font-semibold">{selectedItem?.name}</h2>
          </div>

          <div className="flex-1 overflow-y-auto w-full">
            {selectedItem && (
              <div className="px-4 pb-4 w-full">
                {React.createElement(selectedItem.component)}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileProfileSettings;
