import api from "./axios";
import type { Product, CreateProductData, UpdateProductData } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const response = await api.get("/products");
  return response.data.products;
}

export async function getProduct(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`);
  return response.data.product;
}

export async function getMyProducts(): Promise<Product[]> {
  const response = await api.get("/products/my-products");
  return response.data.products;
}

export async function createProduct(product: CreateProductData) {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("category", product.category);
  formData.append("price", product.price.toString());
  formData.append("unit", product.unit);
  formData.append("quantity", product.quantity.toString());
  if (product.image) formData.append("image", product.image);

  const response = await api.post("/products", formData);
  return response.data;
}

export async function updateProduct(id: string, product: UpdateProductData) {
  const formData = new FormData();
  if (product.name !== undefined) formData.append("name", product.name);
  if (product.description !== undefined) formData.append("description", product.description);
  if (product.category !== undefined) formData.append("category", product.category);
  if (product.price !== undefined) formData.append("price", product.price.toString());
  if (product.unit !== undefined) formData.append("unit", product.unit);
  if (product.quantity !== undefined) formData.append("quantity", product.quantity.toString());
  if (product.availability !== undefined) formData.append("availability", product.availability.toString());
  if (product.image) formData.append("image", product.image);

  const response = await api.put(`/products/${id}`, formData);
  return response.data;
}

export async function deleteProduct(id: string) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}
