import api from "./axios";
import type { Order } from "../types/order";

export async function createOrder(
  productId: string,
  quantity: number,
): Promise<Order> {
  const response = await api.post("/orders", { productId, quantity });
  return response.data.order;
}

export async function getMyOrders(): Promise<Order[]> {
  const response = await api.get("/orders/my-orders");
  return response.data.orders;
}

export async function getSellerOrders(): Promise<Order[]> {
  const response = await api.get("/orders/seller-orders");
  return response.data.orders;
}

export async function updateOrderStatus(
  id: string,
  status: string,
): Promise<Order> {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data.order;
}

export async function cancelOrder(id: string): Promise<Order> {
  const response = await api.put(`/orders/${id}/cancel`);
  return response.data.order;
}
