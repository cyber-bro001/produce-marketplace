import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { getProduct } from "../api/product";

import type { Product } from "../types/product";

import Button from "../components/ui/Button";
import ThemeToggle from "../components/ThemeToggle";

import { Package, ArrowLeft } from "lucide-react";

import { styles } from "../styles";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      try {
        const data = await getProduct(id);

        setProduct(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? "Unable to load product.");
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        {error || "Product not found."}
      </main>
    );
  }

  return (
    <main
      className={styles.layout.page}
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="w-auto px-6"
          >
            <ArrowLeft size={18} />
          </Button>

          <ThemeToggle />
        </div>

        <div
          className="grid gap-10 rounded-[var(--radius-lg)] border p-8 lg:grid-cols-2"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package size={80} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className={styles.typography.h1}>{product.name}</h1>

              <p
                style={{
                  color: "var(--muted)",
                }}
              >
                {product.category}
              </p>
            </div>

            <h2
              className="text-4xl font-bold"
              style={{
                color: "var(--primary)",
              }}
            >
              ₦{product.price.toLocaleString()}
            </h2>

            <p>
              <strong>Unit:</strong> {product.unit}
            </p>

            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>

            <p>
              <strong>Seller:</strong> {product.seller.name}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {product.availability ? "Available" : "Unavailable"}
            </p>

            <div>
              <h2 className={`${styles.typography.h2} mb-3`}>Description</h2>

              <p
                style={{
                  color: "var(--muted)",
                }}
              >
                {product.description}
              </p>
            </div>

            <Button>Order Now</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
