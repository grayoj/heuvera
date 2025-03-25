import { SortByDropdown } from '@heuvera/components/buttons/SortByButton';
import CategoryItem from '@heuvera/components/categories/CategoryItem';
import CategoryList from '@heuvera/components/categories/CategoryList';

export default function Favorites() {
  return (
    <>
      <div className="flex flex-row items-center">
        <div className="flex-grow text-center">
          <CategoryList />
        </div>
        <div className="ml-auto">
          <SortByDropdown />
        </div>
      </div>
    </>
  );
}
