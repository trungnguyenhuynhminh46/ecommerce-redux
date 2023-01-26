import { Timestamp } from "firebase/firestore";

interface Category {
  id: string;
  categoryName: string;
  createdAt: Timestamp;
}
interface Product {
  id: string;
  productName: string;
  imgURL: string;
  category: {
    id: string;
    categoryName: string;
    createdAt: Timestamp;
  };
  price: number;
  shortDesc: string;
  description: string;
  reviews?: {
    name: string;
    rating: number;
    text: string;
  }[];
  avgRating: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
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
