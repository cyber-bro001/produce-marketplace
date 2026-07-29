import { useEffect, useState } from "react";
import axios from "axios";
import { getMyOrders, cancelOrder } from "../api/order";
import type { Order } from "../types/order";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { formatPrice, formatDate, ORDER_STATUS_STYLES } from "../utils/format";

function BuyerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => setError("Failed to load orders."))
      .finally(() => setLoading(false));
  }, []);

  async function handleCancel(orderId: string) {
    setCancelling(orderId);
    try {
      const updated = await cancelOrder(orderId);
      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o)),
      );
    } catch (err) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message
        : "Failed to cancel.";
      alert(msg);
    } finally {
      setCancelling(null);
    }
  }

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Track your purchases and manage active orders.
        </p>
      </div>

      {error && (
        <p className="mb-4 text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          message="Place your first order from the marketplace."
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusStyle =
              ORDER_STATUS_STYLES[order.status] ?? ORDER_STATUS_STYLES.Pending;

            return (
              <div
                key={order._id}
                className="rounded-[var(--radius-lg)] border p-5"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      {order.product?.name ?? "Product"}
                    </p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {order.quantity} × {order.product?.unit} · Seller:{" "}
                      {order.seller?.name}
                    </p>
                    {order.createdAt && (
                      <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                        Placed {formatDate(order.createdAt)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}
                    >
                      {order.status}
                    </span>
                    <p className="font-bold" style={{ color: "var(--primary)" }}>
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                </div>

                {order.status === "Pending" && (
                  <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                    <button
                      onClick={() => handleCancel(order._id)}
                      disabled={cancelling === order._id}
                      className="text-sm font-medium hover:underline disabled:opacity-50"
                      style={{ color: "var(--danger)" }}
                    >
                      {cancelling === order._id ? "Cancelling..." : "Cancel Order"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BuyerOrders;
