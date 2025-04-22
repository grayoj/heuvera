export type SortOption = "recent" | "price-low" | "price-high";

export type ViewMode = "grid" | "list";

export type FavoritesHeaderProps = {
  sortOption: SortOption | "";
  setSortOption: (value: SortOption | "") => void;
  viewMode: ViewMode;
  setViewMode: (view: ViewMode) => void;
  isMobile?: boolean;
};
