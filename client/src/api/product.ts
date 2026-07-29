import api from "./axios";
import type {
  Product,
  CreateProductData,
} from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const response = await api.get("/products");

  return response.data.products;
}

export async function getProduct(
  id: string
): Promise<Product> {
  const response = await api.get(`/products/${id}`);

  return response.data.product;
}

export async function createProduct(
  product: CreateProductData
) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("name", product.name);
  formData.append(
    "description",
    product.description
  );
  formData.append("category", product.category);
  formData.append(
    "price",
    product.price.toString()
  );
  formData.append("unit", product.unit);
  formData.append(
    "quantity",
    product.quantity.toString()
  );

  if (product.image) {
    formData.append("image", product.image);
  }

  const response = await api.post(
    "/products",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}