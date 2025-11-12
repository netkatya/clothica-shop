import { Category } from './category';
import { Gender, Size } from './good';

export interface AllFiltersState {
  category: string; 
  sizes: Size[];
  priceRange: number[];
  colors: string[];
  status: Gender | 'Всі';
}

export interface FilterContentProps {
  currentFilters: AllFiltersState;
  onFilterChange: React.Dispatch<React.SetStateAction<AllFiltersState>>;
  categories: Category[];
  isLoadingCategories: boolean;
}


export interface FilterContainerProps extends FilterContentProps {
  onClearAll: () => void;
    total: number;
  shown: number;
}

export interface PriceFilterProps {
  values: number[];
  onChange: (newValues: number[]) => void;
}
