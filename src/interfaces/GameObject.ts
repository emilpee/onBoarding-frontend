export interface GameObject {
  id: string;
  categories: Category[];
  description: string;
  description_preview: string;
  image_url: string;
  name: string;
  names: string[];
  year_published: number;
}

interface Category {
  id: number;
}
