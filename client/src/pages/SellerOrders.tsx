import { useEffect, useState } from "react";
import axios from "axios";
import { getSellerOrders, updateOrderStatus } from "../api/order";
import type { Order } from "../types/order";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { formatPrice, formatDate, ORDER_STATUS_STYLES } from "../utils/format";

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;

function SellerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    getSellerOrders()
      .then(setOrders)
      .catch(() => setError("Failed to load orders."))
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(orderId: string, status: string) {
    setUpdating(orderId);
    try {
      const updated = await updateOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
    } catch (err) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message
        : "Update failed.";
      alert(msg);
    } finally {
      setUpdating(null);
    }
  }

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Seller Orders</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Manage orders placed on your products.
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
          message="Orders will appear here when buyers purchase your products."
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
                <div className="flex flex-wrap items-start justify-between gap-4">
                  {/* Order info */}
                  <div className="space-y-1">
                    <p className="font-semibold">{order.product?.name ?? "Product"}</p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {order.quantity} × {order.product?.unit ?? "unit"}
                    </p>
                    <p className="font-bold" style={{ color: "var(--primary)" }}>
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>

                  {/* Buyer info */}
                  <div className="text-sm space-y-0.5" style={{ color: "var(--muted)" }}>
                    <p className="font-medium" style={{ color: "var(--foreground)" }}>
                      {order.buyer?.name}
                    </p>
                    <p>{order.buyer?.phone}</p>
                    <p>{order.buyer?.email}</p>
                    {order.createdAt && (
                      <p className="text-xs">{formatDate(order.createdAt)}</p>
                    )}
                  </div>

                  {/* Status + update */}
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

                    {order.status !== "Completed" &&
                      order.status !== "Cancelled" && (
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          disabled={updating === order._id}
                          className="rounded-lg border px-3 py-1.5 text-xs outline-none disabled:opacity-50"
                          style={{
                            background: "var(--surface)",
                            borderColor: "var(--border)",
                            color: "var(--foreground)",
                          }}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {updating === order._id ? "Updating..." : s}
                            </option>
                          ))}
                        </select>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SellerOrders;
