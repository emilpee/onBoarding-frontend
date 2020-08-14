export interface GameObject {
  id: string;
  name: string;
  names: string[];
  description: string;
  categories: Category[];
  year_published: number;
}

interface Category {
  id: number;
}
