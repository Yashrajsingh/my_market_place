export type HomeCategorySection =
  | "GRID"
  | "SHOP_BY_CATEGORIES"
  | "ELECTRIC_CATEGORIES"
  | "DEALS";

export interface HomeCategory {
  id: number;
  name: string;
  image: string;
  categoryId: string;
  Section: HomeCategorySection;
}

export interface Deal {
  id: number;
  discount: number;
  category: HomeCategory;
}

export interface Home {
  grid: HomeCategory[];
  shopByCategories: HomeCategory[];
  electricCategories: HomeCategory[];
  dealCategories: HomeCategory[];
  deals: Deal[];
}
