export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  availability: boolean;
  seller: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  image: File | null;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  unit?: string;
  quantity?: number;
  availability?: boolean;
  image?: File | null;
}
