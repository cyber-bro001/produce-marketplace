import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { createOrder } from "../api/order";
import Button from "../components/ui/Button";
import EmptyState from "../components/EmptyState";
import { formatPrice } from "../utils/format";

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (items.length === 0 && !success) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <EmptyState
          title="Nothing to check out"
          message="Add items to your cart first."
          actionLabel="Browse Products"
          onAction={() => navigate("/")}
        />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
        <CheckCircle size={64} style={{ color: "var(--success)" }} />
        <h2 className="text-2xl font-bold">Order Placed!</h2>
        <p style={{ color: "var(--muted)" }}>
          Your orders have been sent to the sellers.
        </p>
        <Button onClick={() => navigate("/buyer/orders")} className="w-auto px-8">
          View My Orders
        </Button>
      </div>
    );
  }

  async function handlePlaceOrder() {
    setError("");
    setLoading(true);
    const failed: string[] = [];

    for (const { product, quantity } of items) {
      try {
        await createOrder(product._id, quantity);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          failed.push(
            `${product.name}: ${err.response?.data?.message ?? "failed"}`,
          );
        } else {
          failed.push(`${product.name}: unexpected error`);
        }
      }
    }

    setLoading(false);

    if (failed.length > 0) {
      setError(`Some orders failed:\n${failed.join("\n")}`);
    } else {
      clearCart();
      setSuccess(true);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      {/* Buyer info */}
      <div
        className="mb-6 rounded-[var(--radius-lg)] border p-6"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <h2 className="mb-4 font-semibold">Delivery Contact</h2>
        <div className="space-y-1 text-sm">
          <p>
            <span style={{ color: "var(--muted)" }}>Name: </span>
            <span className="font-medium">{user?.name}</span>
          </p>
          <p>
            <span style={{ color: "var(--muted)" }}>Phone: </span>
            <span className="font-medium">{user?.phone ?? "—"}</span>
          </p>
          <p>
            <span style={{ color: "var(--muted)" }}>Email: </span>
            <span className="font-medium">{user?.email}</span>
          </p>
        </div>
      </div>

      {/* Order items */}
      <div
        className="mb-6 rounded-[var(--radius-lg)] border"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="border-b px-6 py-4" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-semibold">Order Items ({items.length})</h2>
        </div>

        {items.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex items-center justify-between border-b px-6 py-4 last:border-b-0 text-sm"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p style={{ color: "var(--muted)" }}>
                {quantity} × {product.unit} @ {formatPrice(product.price)}
              </p>
            </div>
            <p className="font-semibold">
              {formatPrice(product.price * quantity)}
            </p>
          </div>
        ))}

        <div className="flex justify-between px-6 py-4 text-base font-bold">
          <span>Total</span>
          <span style={{ color: "var(--primary)" }}>{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {error && (
        <div
          className="mb-4 rounded-[var(--radius-md)] border px-4 py-3 text-sm whitespace-pre-line"
          style={{ borderColor: "var(--danger)", color: "var(--danger)" }}
        >
          {error}
        </div>
      )}

      <Button loading={loading} onClick={handlePlaceOrder}>
        Place Order
      </Button>

      <button
        onClick={() => navigate("/cart")}
        className="mt-3 w-full text-sm hover:underline"
        style={{ color: "var(--muted)" }}
      >
        Back to Cart
      </button>
    </div>
  );
}

export default Checkout;
