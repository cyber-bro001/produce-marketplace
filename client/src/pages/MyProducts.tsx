import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Pencil, Trash2, Package } from "lucide-react";
import axios from "axios";
import { getMyProducts, deleteProduct } from "../api/product";
import type { Product } from "../types/product";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { formatPrice } from "../utils/format";

function MyProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    getMyProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeleting(product._id);
    try {
      await deleteProduct(product._id);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message
        : "Delete failed.";
      alert(msg);
    } finally {
      setDeleting(null);
    }
  }

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Products</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Manage your listings.
          </p>
        </div>

        <Link
          to="/create-product"
          className="flex items-center gap-2 rounded-[var(--radius-md)] px-5 py-2.5 text-sm font-medium text-white"
          style={{ background: "var(--primary)" }}
        >
          <PlusCircle size={16} />
          Add Product
        </Link>
      </div>

      {error && (
        <p className="mb-4 text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}

      {products.length === 0 ? (
        <EmptyState
          icon={<Package size={48} strokeWidth={1.5} />}
          title="No products yet"
          message="Start listing your produce for buyers to discover."
          actionLabel="Add First Product"
          onAction={() => navigate("/create-product")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-[var(--radius-lg)] border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package size={32} style={{ color: "var(--muted)" }} />
                  </div>
                )}
              </div>

              <div className="p-4">
                <p className="font-semibold line-clamp-1">{product.name}</p>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {product.category}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-bold" style={{ color: "var(--primary)" }}>
                    {formatPrice(product.price)}
                  </p>
                  <span
                    className="text-xs rounded-full px-2 py-0.5"
                    style={{
                      background: product.availability ? "#DCFCE7" : "#FEE2E2",
                      color: product.availability ? "#166534" : "#B91C1C",
                    }}
                  >
                    {product.availability ? "Available" : "Out of Stock"}
                  </span>
                </div>
                <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                  {product.quantity} {product.unit}(s) left
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/seller/products/${product._id}/edit`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium hover:bg-[var(--background)]"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  >
                    <Pencil size={13} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product)}
                    disabled={deleting === product._id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
                    style={{ borderColor: "var(--border)", color: "var(--danger)" }}
                  >
                    <Trash2 size={13} />
                    {deleting === product._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
