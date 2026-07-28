import api from "./axios";

export const register = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "buyer" | "seller";
}) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};