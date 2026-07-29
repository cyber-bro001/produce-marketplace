import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Package, ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { getProduct } from "../api/product";
import type { Product } from "../types/product";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatPrice } from "../utils/format";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const SERVER_URL = API_URL.replace(/\/api$/, "");

function getImageUrl(path: string) {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${SERVER_URL}${path}`;
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then(setProduct)
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? "Unable to load product.");
        } else {
          setError("Something went wrong.");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner fullPage />;

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p style={{ color: "var(--muted)" }}>{error || "Product not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Go back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isBuyer = isAuthenticated && user?.role === "buyer";
  const maxQty = product.quantity;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm font-medium hover:underline"
        style={{ color: "var(--muted)" }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div
        className="grid gap-8 rounded-[var(--radius-lg)] border p-6 lg:grid-cols-2 lg:p-10"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-[var(--radius-md)] bg-gray-100 dark:bg-gray-800">
          {product.image ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package size={80} style={{ color: "var(--muted)" }} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div>
            <span
              className="mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium"
              style={{ background: "var(--background)", color: "var(--muted)" }}
            >
              {product.category}
            </span>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          <div>
            <p
              className="text-4xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              {formatPrice(product.price)}
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              per {product.unit}
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <p>
              <span style={{ color: "var(--muted)" }}>Stock: </span>
              <span className="font-medium">
                {product.quantity} {product.unit}(s) available
              </span>
            </p>
            <p>
              <span style={{ color: "var(--muted)" }}>Seller: </span>
              <span className="font-medium">{product.seller?.name}</span>
            </p>
            <p>
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  background: product.availability ? "#DCFCE7" : "#FEE2E2",
                  color: product.availability ? "#166534" : "#B91C1C",
                }}
              >
                {product.availability ? "Available" : "Out of Stock"}
              </span>
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-semibold">Description</h2>
            <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
              {product.description}
            </p>
          </div>

          {/* Add to cart */}
          {isBuyer && product.availability && (
            <div className="mt-auto space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Plus size={16} />
                </button>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  Total: {formatPrice(product.price * quantity)}
                </span>
              </div>

              <Button onClick={handleAddToCart} className="gap-2">
                <ShoppingCart size={18} />
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </Button>
            </div>
          )}

          {!isAuthenticated && (
            <Link
              to="/login"
              className="flex h-14 items-center justify-center rounded-[var(--radius-md)] font-medium text-white"
              style={{ background: "var(--primary)" }}
            >
              Login to Order
            </Link>
          )}

          {isAuthenticated && !product.availability && (
            <p
              className="text-sm font-medium"
              style={{ color: "var(--danger)" }}
            >
              This product is currently out of stock.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
