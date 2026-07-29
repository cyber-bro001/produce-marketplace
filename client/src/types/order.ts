import type { Product } from "./product";
import type { User } from "./user";

export interface Order {
  _id: string;
  buyer: User;
  seller: User;
  product: Product;
  quantity: number;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}
