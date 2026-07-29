import { useEffect, useState } from "react";
import axios from "axios";

import { getProducts } from "../api/product";

import ProductCard from "../components/ProductCard";
import ThemeToggle from "../components/ThemeToggle";

import type { Product } from "../types/product";

import { styles } from "../styles";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ??
              "Failed to fetch products."
          );
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main
        className={`${styles.layout.page} flex items-center justify-center`}
      >
        Loading products...
      </main>
    );
  }

  if (error) {
    return (
      <main
        className={`${styles.layout.page} flex items-center justify-center`}
      >
        {error}
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
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className={styles.typography.h1}>
              Produce Marketplace
            </h1>

            <p
              style={{
                color: "var(--muted)",
              }}
            >
              Buy fresh farm produce directly from trusted sellers.
            </p>

          </div>

          <ThemeToggle />

        </div>

        {products.length === 0 ? (
          <div
            className="rounded-[var(--radius-lg)] border p-12 text-center"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            No products available.
          </div>
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;