import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ClipboardList, Clock, PlusCircle } from "lucide-react";
import { getMyProducts } from "../api/product";
import { getSellerOrders } from "../api/order";
import type { Product } from "../types/product";
import type { Order } from "../types/order";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div
      className="rounded-[var(--radius-lg)] border p-6"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="mb-3" style={{ color: "var(--primary)" }}>
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
        {label}
      </p>
    </div>
  );
}

function SellerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyProducts(), getSellerOrders()])
      .then(([p, o]) => {
        setProducts(p);
        setOrders(o);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner fullPage />;

  const pendingOrders = orders.filter((o) => o.status === "Pending").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Welcome back, {user?.name}.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Package size={24} />}
          label="Total Products"
          value={products.length}
        />
        <StatCard
          icon={<ClipboardList size={24} />}
          label="Total Orders"
          value={orders.length}
        />
        <StatCard
          icon={<Clock size={24} />}
          label="Pending Orders"
          value={pendingOrders}
        />
      </div>

      {/* Quick actions */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/create-product"
          className="flex items-center gap-3 rounded-[var(--radius-lg)] border p-5 font-medium hover:shadow-md transition-shadow"
          style={{
            background: "var(--surface)",
            borderColor: "var(--primary)",
            color: "var(--primary)",
          }}
        >
          <PlusCircle size={22} />
          Add New Product
        </Link>

        <Link
          to="/seller/orders"
          className="flex items-center gap-3 rounded-[var(--radius-lg)] border p-5 font-medium hover:shadow-md transition-shadow"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          <ClipboardList size={22} />
          View All Orders
          {pendingOrders > 0 && (
            <span
              className="ml-auto rounded-full px-2 py-0.5 text-xs font-bold text-white"
              style={{ background: "var(--danger)" }}
            >
              {pendingOrders}
            </span>
          )}
        </Link>
      </div>

      {/* Recent orders */}
      {orders.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link
              to="/seller/orders"
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--primary)" }}
            >
              View all
            </Link>
          </div>

          <div
            className="overflow-hidden rounded-[var(--radius-lg)] border"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--background)" }}>
                    <th className="px-5 py-3 text-left font-medium" style={{ color: "var(--muted)" }}>Product</th>
                    <th className="px-5 py-3 text-left font-medium" style={{ color: "var(--muted)" }}>Buyer</th>
                    <th className="px-5 py-3 text-left font-medium" style={{ color: "var(--muted)" }}>Qty</th>
                    <th className="px-5 py-3 text-left font-medium" style={{ color: "var(--muted)" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr
                      key={order._id}
                      className="border-t"
                      style={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <td className="px-5 py-3 font-medium">{order.product?.name}</td>
                      <td className="px-5 py-3" style={{ color: "var(--muted)" }}>{order.buyer?.name}</td>
                      <td className="px-5 py-3">{order.quantity}</td>
                      <td className="px-5 py-3">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            background: order.status === "Pending" ? "#FEF9C3" : order.status === "Confirmed" ? "#DBEAFE" : order.status === "Completed" ? "#DCFCE7" : "#FEE2E2",
                            color: order.status === "Pending" ? "#854D0E" : order.status === "Confirmed" ? "#1E40AF" : order.status === "Completed" ? "#166534" : "#B91C1C",
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;
