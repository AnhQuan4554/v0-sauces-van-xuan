'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { SearchFilter } from '@/app/types/products';
import { useRouter } from 'next/navigation';

const categories = [
  'FRUITS',
  'VEGETABLES',
  'BEVERAGES',
  'SPICES AND SEASONING',
  'MEAT & EGGS',
  'DRIED FOODS',
  'ICE CREAM, BUTTER & CHEESE',
  'SEAFOODS',
  'ALCOHOL',
  'NON-FOOD PRODUCTS',
];

const vendors = [
  'England',
  'Australia',
  'Poland',
  'Belgium',
  'Cambodia',
  'Chile',
  'Korea',
  'USA',
  'Japan',
  'Vietnam',
];

const productTags = [
  'bread',
  'fruits',
  'healthy',
  'juices',
  'meat',
  'natural',
  'organic',
  'tomato',
];

const DEFAULTFILTER: SearchFilter = {
  name: undefined,
  maxPrice: undefined,
  minPrice: undefined,
  currentPage: 1,
  limit: 20,
};

export default function Sidebar() {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const initialFilter: SearchFilter = {
    ...DEFAULTFILTER,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  };
  const handleClick = () => {
    router.push(`/?category=shoes&minPrice=100`);
  };
  const [searchFilter, setSearchFilter] = useState<SearchFilter>(initialFilter);

  const handleFilter = () => {
    const params = new URLSearchParams();

    // 🧠 Lặp qua tất cả key của filter
    Object.entries(searchFilter).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    const url = queryString ? `/?${queryString}` : '/';

    router.push(url);
  };
  useEffect(() => {
    setSearchFilter({ ...searchFilter, minPrice: priceRange[0], maxPrice: priceRange[1] });
  }, [priceRange[0], priceRange[1]]);
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Price Filter */}
      <div className="bg-card rounded-lg border p-3 sm:p-4">
        <h3 className="text-primary mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Price</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="text-muted-foreground text-xs sm:text-sm">
            {priceRange[0].toLocaleString('vi-VN')}đ - {priceRange[1].toLocaleString('vi-VN')}đ
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={1000000}
            step={10000}
            className="w-full"
          />
          <Button
            variant="outline"
            size="sm"
            className="soft-button w-full bg-transparent text-xs sm:text-sm"
            onClick={handleFilter}
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Vendors */}
      <div className="bg-card rounded-lg border p-3 sm:p-4">
        <h3 className="text-primary mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Vendors</h3>
        <div className="max-h-48 space-y-1 overflow-y-auto sm:space-y-2">
          {vendors.map((vendor) => (
            <div key={vendor} className="flex items-center justify-between py-1">
              <span className="text-muted-foreground text-xs sm:text-sm">{vendor}</span>
              <ChevronRight className="text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Tags */}
      <div className="bg-card rounded-lg border p-3 sm:p-4">
        <h3 className="text-primary mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
          Product tags
        </h3>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {productTags.map((tag) => (
            /* Applied soft-button styling and improved mobile sizing */
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="soft-button rounded-full bg-transparent px-2 py-1 text-xs"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Discover Categories */}
      <div className="bg-card rounded-lg border p-3 sm:p-4">
        <h3 className="text-primary mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Discover</h3>
        <div className="max-h-64 space-y-1 overflow-y-auto sm:space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center justify-between py-1">
              <span className="text-muted-foreground text-xs leading-tight sm:text-sm">
                {category}
              </span>
              <ChevronRight className="text-muted-foreground h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
