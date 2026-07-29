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