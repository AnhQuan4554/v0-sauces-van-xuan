"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const categories = [
  "FRUITS",
  "VEGETABLES",
  "BEVERAGES",
  "SPICES AND SEASONING",
  "MEAT & EGGS",
  "DRIED FOODS",
  "ICE CREAM, BUTTER & CHEESE",
  "SEAFOODS",
  "ALCOHOL",
  "NON-FOOD PRODUCTS",
]

const vendors = ["England", "Australia", "Poland", "Belgium", "Cambodia", "Chile", "Korea", "USA", "Japan", "Vietnam"]

const productTags = ["bread", "fruits", "healthy", "juices", "meat", "natural", "organic", "tomato"]

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState([0, 1000000])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Price Filter */}
      <div className="bg-card rounded-lg p-3 sm:p-4 border">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-primary">Price</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="text-xs sm:text-sm text-muted-foreground">0đ - 1,000,000đ</div>
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000000} step={10000} className="w-full" />
          <Button variant="outline" size="sm" className="w-full bg-transparent soft-button text-xs sm:text-sm">
            Filter
          </Button>
        </div>
      </div>

      {/* Vendors */}
      <div className="bg-card rounded-lg p-3 sm:p-4 border">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-primary">Vendors</h3>
        <div className="space-y-1 sm:space-y-2 max-h-48 overflow-y-auto">
          {vendors.map((vendor) => (
            <div key={vendor} className="flex items-center justify-between py-1">
              <span className="text-xs sm:text-sm text-muted-foreground">{vendor}</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Tags */}
      <div className="bg-card rounded-lg p-3 sm:p-4 border">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-primary">Product tags</h3>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {productTags.map((tag) => (
            /* Applied soft-button styling and improved mobile sizing */
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="text-xs rounded-full bg-transparent soft-button px-2 py-1"
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Discover Categories */}
      <div className="bg-card rounded-lg p-3 sm:p-4 border">
        <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-primary">Discover</h3>
        <div className="space-y-1 sm:space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center justify-between py-1">
              <span className="text-xs sm:text-sm text-muted-foreground leading-tight">{category}</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
