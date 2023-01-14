interface Product {
  id: string;
  productName: string;
  imgUrl: string;
  category: string;
  price: number;
  shortDesc: string;
  description: string;
  reviews: {
    rating: number;
    text: string;
  }[];
  avgRating: number;
}
export type { Product };
