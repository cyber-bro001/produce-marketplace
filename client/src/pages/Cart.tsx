import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import Button from "../components/ui/Button";
import EmptyState from "../components/EmptyState";
import { formatPrice } from "../utils/format";

function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
        <EmptyState
          title="Your cart is empty"
          message="Browse the marketplace and add some fresh produce."
          actionLabel="Browse Products"
          onAction={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Items list */}
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="flex items-center gap-4 rounded-[var(--radius-md)] border p-4"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              {/* Image */}
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs" style={{ color: "var(--muted)" }}>
                    —
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${product._id}`}
                  className="font-semibold hover:underline line-clamp-1"
                >
                  {product.name}
                </Link>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {formatPrice(product.price)} / {product.unit}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product._id, quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(
                      product._id,
                      Math.min(product.quantity, quantity + 1),
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Subtotal */}
              <p className="w-24 text-right font-semibold">
                {formatPrice(product.price * quantity)}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeItem(product._id)}
                className="ml-2 rounded-lg p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20"
                style={{ color: "var(--danger)" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className="h-fit rounded-[var(--radius-lg)] border p-6"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

          <div className="space-y-2 text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product._id} className="flex justify-between">
                <span style={{ color: "var(--muted)" }}>
                  {product.name} × {quantity}
                </span>
                <span>{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
          </div>

          <div
            className="my-4 border-t"
            style={{ borderColor: "var(--border)" }}
          />

          <div className="mb-6 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span style={{ color: "var(--primary)" }}>{formatPrice(totalPrice)}</span>
          </div>

          {isAuthenticated ? (
            <Button onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </Button>
          ) : (
            <Link
              to="/login"
              className="flex h-14 items-center justify-center rounded-[var(--radius-md)] font-medium text-white"
              style={{ background: "var(--primary)" }}
            >
              Login to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
