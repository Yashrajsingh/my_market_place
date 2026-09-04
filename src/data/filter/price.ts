export interface PriceRange {
  name: string;
  min: number;
  max: number;
}

export interface PriceGroup {
  label: string;
  ranges: PriceRange[];
}

export const priceFilters: PriceGroup[] = [
  {
    label: "Budget",
    ranges: [
      { name: "Under ₹500", min: 0, max: 500 },
      { name: "₹500 - ₹1000", min: 500, max: 1000 },
      { name: "₹1000 - ₹2000", min: 1000, max: 2000 },
    ],
  },
  {
    label: "Mid Range",
    ranges: [
      { name: "₹2000 - ₹3000", min: 2000, max: 3000 },
      { name: "₹3000 - ₹5000", min: 3000, max: 5000 },
    ],
  },
  {
    label: "Premium",
    ranges: [
      { name: "₹5000 - ₹8000", min: 5000, max: 8000 },
      { name: "₹8000 - ₹12000", min: 8000, max: 12000 },
    ],
  },
  {
    label: "Luxury",
    ranges: [
      { name: "₹12000 - ₹20000", min: 12000, max: 20000 },
      { name: "₹20000 & Above", min: 20000, max: Infinity },
    ],
  },
];