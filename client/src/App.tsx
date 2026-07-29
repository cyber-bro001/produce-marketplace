import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BuyerOrders from "./pages/BuyerOrders";
import Profile from "./pages/Profile";
import SellerDashboard from "./pages/SellerDashboard";
import MyProducts from "./pages/MyProducts";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import SellerOrders from "./pages/SellerOrders";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth pages — no navbar/footer */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* All other pages use MainLayout (Navbar + Footer) */}
              <Route element={<MainLayout />}>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />

                {/* Any authenticated user */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Buyer only */}
                <Route element={<ProtectedRoute role="buyer" />}>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/buyer/orders" element={<BuyerOrders />} />
                </Route>

                {/* Seller only */}
                <Route element={<ProtectedRoute role="seller" />}>
                  <Route path="/dashboard" element={<SellerDashboard />} />
                  <Route path="/seller/products" element={<MyProducts />} />
                  <Route path="/create-product" element={<CreateProduct />} />
                  <Route
                    path="/seller/products/:id/edit"
                    element={<EditProduct />}
                  />
                  <Route path="/seller/orders" element={<SellerOrders />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
