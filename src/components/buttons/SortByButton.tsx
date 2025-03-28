"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

type SortOption =
  | "Price Low to High"
  | "Price High to Low"
  | "Rating"
  | "Newest";

export function SortByDropdown() {
  const [sortBy, setSortBy] = React.useState<SortOption>("Newest");

  const sortOptions: SortOption[] = [
    "Price Low to High",
    "Price High to Low",
    "Rating",
    "Newest",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          Sort By: {sortBy}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={sortBy === option}
            onCheckedChange={() => setSortBy(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
