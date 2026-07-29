import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../api/product";
import type { Product } from "../types/product";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products],
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Fresh Produce</h1>
        <p className="mt-1 text-sm sm:text-base" style={{ color: "var(--muted)" }}>
          Buy fresh farm produce directly from trusted sellers.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        <SearchBar value={search} onChange={setSearch} />
        {!loading && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={setCategory}
          />
        )}
      </div>

      {/* Results count */}
      {!loading && !error && (
        <p className="mb-4 text-sm" style={{ color: "var(--muted)" }}>
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>
      )}

      <ProductGrid products={filtered} loading={loading} error={error} />
    </div>
  );
}

export default Home;
