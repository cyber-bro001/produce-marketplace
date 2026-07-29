import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/useTheme";
import { styles } from "./styles";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerOrders from "./pages/BuyerOrders";
import SellerOrders from "./pages/SellerOrders";
import CreateProduct from "./pages/CreateProduct";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  useTheme();

  return (
    <div
      className={styles.layout.page}
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/dashboard" element={<SellerDashboard />} />

          <Route path="/create-product" element={<CreateProduct />} />

          <Route path="/buyer/orders" element={<BuyerOrders />} />

          <Route path="/seller/orders" element={<SellerOrders />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
