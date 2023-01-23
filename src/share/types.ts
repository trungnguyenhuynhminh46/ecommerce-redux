import { Timestamp } from "firebase/firestore";

interface Category {
  id: string;
  categoryName: string;
  createdAt: Timestamp;
}
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

interface CartItem {
  id: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
}
export type { Product, CartItem, Category };
