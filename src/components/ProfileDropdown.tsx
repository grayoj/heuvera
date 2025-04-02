"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@heuvera/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@heuvera/components/ui/avatar";
import {
  RiSettings3Line,
  RiHomeSmileLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

interface ProfileDropdownProps {
  selected?: string;
  avatarUrl?: string;
  fallback?: string;
}

export function ProfileDropdown({
  selected,
  avatarUrl = "https://lh3.googleusercontent.com/a/ACg8ocKQWfaudEjOg1tHLb3WZFMGH1DLf56QEhrIhRYRMeJVROgTRbifUA=s96-c",
  fallback = "FG",
}: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center outline-none focus:ring-2 ring-[#7B4F3A] dark:ring-[#8B5F4D] rounded-full">
          <Avatar
            className={`rounded-full overflow-hidden ${selected === "Profile" ? "ring-2 ring-[#7B4F3A] dark:ring-[#8B5F4D]" : ""}`}
          >
            <AvatarImage src={avatarUrl} alt="avatar" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-[#F8F7F2] dark:bg-[#333333] shadow-md rounded-md"
      >
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-[#444444] rounded-md"
          >
            <RiSettings3Line className="text-lg" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/host/dashboard"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-[#444444] rounded-md"
          >
            <RiHomeSmileLine className="text-lg" />
            <span>Switch to Host</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => console.log("Logging out...")}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-[#444444] rounded-md cursor-pointer"
        >
          <RiLogoutBoxRLine className="text-lg text-red-500" />
          <span className="text-red-500">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
