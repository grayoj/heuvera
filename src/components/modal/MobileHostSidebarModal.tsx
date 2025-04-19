"use client";

import React, { useState } from "react";
import {
  User,
  Calendar,
  CreditCard,
  HelpCircle,
  Settings,
  ChevronRight,
  ChevronLeft,
  House,
  Wallet,
  Star,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@heuvera/components/ui/button";
import { Dialog, DialogContent } from "@heuvera/components/ui/dialog";
import GeneralSettingsPage from "@heuvera/app/(main)/account/settings/page";
import useIsMobile from "@heuvera/hooks/IsMobile";
import PropertyListingsPage from "@heuvera/app/(main)/hosts/property/page";
import BookingManagementPage from "@heuvera/app/(main)/hosts/booking/page";
import EarningsPage from "@heuvera/app/(main)/hosts/earnings/page";
import ReviewsPage from "@heuvera/app/(main)/hosts/reviews/page";
import SupportPage from "@heuvera/app/(main)/hosts/support/page";
import PersonInfo from "@heuvera/app/(main)/hosts/page";

const sideBarItems = [
  {
    name: "Personal Info",
    route: "/",
    description:
      "Update your profile, contact details, and preferences to personalize your experience.",
    icon: User,
    component: PersonInfo,
  },
  {
    route: "property",
    name: "Property Listings",
    description:
      "Manage and view all properties you've listed for rent or lease.",
    icon: House,
    component: PropertyListingsPage,
  },
  {
    route: "booking",
    name: "Booking Mangement",
    description: "Track upcoming, ongoing, and past bookings in one place",
    icon: Calendar,
    component: BookingManagementPage,
  },
  {
    route: "earnings",
    name: "Earnings & Payouts",
    description:
      "Monitor your earnings, track pending payments, and manage payout preferences.",
    icon: Wallet,
    component: EarningsPage,
  },
  {
    route: "reviews",
    name: "Reviews & Ratings",
    description:
      "View guest feedback, monitor your ratings, and maintain your reputation.",
    icon: Star,
    component: ReviewsPage,
  },
  {
    route: "support",
    name: "Support & Assistance",
    description:
      "Access help articles, contact support, or resolve issues with your listings. ",
    icon: LifeBuoy,
    component: SupportPage,
  },
  {
    route: "settings",
    name: "General Settings",
    description:
      "Get help, contact support, and access resources to enhance your experience.",
    icon: Settings,
    component: GeneralSettingsPage,
  },
];

const MobileHostProfileSettings = () => {
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
    <div className="flex flex-col h-full bg-[#F8F7F2] dark:bg-[#333333]">
      <div className="px-4 py-6">
        <h1 className="text-xl font-semibold text-[#3E3E3E] dark:text-[#F8F7F2]">
          Host
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="mt-2">
          {sideBarItems.map((item) => (
            <div
              key={item.route}
              className="border-b-[0.2px] last:border-b-0 border-[#E3E2D988] dark:border-[#44444488]"
            >
              <div
                className="flex items-center justify-between py-4 cursor-pointer active:bg-[#F0EFE9] dark:active:bg-[#444444]"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#7B4F3A] dark:text-[#F8F7F2]" />
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
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="p-0 sm:max-w-md max-w-full bg-[#F8F7F2] dark:bg-[#333333] w-full mx-auto sm:h-auto h-full flex flex-col rounded-none">
          <div className="sticky top-0 z-10 flex items-center px-4 py-4 border-b border-[#E3E2D9] dark:border-[#555555] bg-[#F8F7F2] dark:bg-[#333333]">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseModal}
              className="mr-3"
            >
              <ChevronLeft className="h-5 w-5 text-[#7B4F3A] dark:text-[#F8F7F2]" />
            </Button>
            <h2 className="text-lg font-semibold text-[#3E3E3E] dark:text-[#F8F7F2]">
              {selectedItem?.name}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto w-full">
            {selectedItem && (
              <div className="px-4 py-4 w-full">
                {React.createElement(selectedItem.component)}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileHostProfileSettings;
