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
import useIsMobile from "@heuvera/hooks/IsMobile";

interface ProfileDropdownProps {
  selected?: string;
  avatarUrl?: string;
  fallbackName?: string;
}

function getInitials(nameOrEmail?: string) {
  if (!nameOrEmail) return "U";
  const parts = nameOrEmail.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  } else {
    return nameOrEmail.slice(0, 2).toUpperCase();
  }
}

export function ProfileDropdown({
  selected,
  avatarUrl = "/no-avatar.jpg",
  fallbackName,
}: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center outline-none focus:ring-2 ring-[#7B4F3A] dark:ring-[#8B5F4D] rounded-full">
          <Avatar
            className={`rounded-full overflow-hidden ${selected === "Profile" ? "ring-2 ring-[#7B4F3A] dark:ring-[#8B5F4D]" : ""}`}
          >
            <AvatarImage src={avatarUrl} alt="avatar" />
            <AvatarFallback>{getInitials(fallbackName)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-auto w-48 bg-[#F8F7F2] dark:bg-[#333333] border rounded-md my-4"
      >
        <DropdownMenuItem asChild>
          <Link
            href="/account"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-[#444444] rounded-md"
          >
            <RiSettings3Line className="text-lg" />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/hosts"
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
          <a href="/api/auth/logout">
            <span className="text-red-500">Logout</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
