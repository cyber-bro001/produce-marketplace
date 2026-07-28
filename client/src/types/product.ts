import type { User } from "./user";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  image?: string;
  seller: User;
}