import { Link } from "react-router-dom";
import { Package } from "lucide-react";

import type { Product } from "../types/product";
import Button from "./ui/Button";

interface ProductCardProps {
  product: Product;
}

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

function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="overflow-hidden rounded-[var(--radius-lg)] border"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.image ? (
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";

              const placeholder =
                e.currentTarget.parentElement?.querySelector(
                  ".image-placeholder"
                );

              if (placeholder) {
                placeholder.classList.remove("hidden");
              }
            }}
          />
        ) : null}

        <div
          className={`image-placeholder flex h-full items-center justify-center ${
            product.image ? "hidden" : ""
          }`}
        >
          <Package
            size={48}
            style={{
              color: "var(--muted)",
            }}
          />
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">
            {product.name}
          </h3>

          <p
            className="text-sm"
            style={{
              color: "var(--muted)",
            }}
          >
            {product.category}
          </p>
        </div>

        <p className="line-clamp-2 text-sm">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-2xl font-bold"
              style={{
                color: "var(--primary)",
              }}
            >
              ₦{product.price.toLocaleString()}
            </p>

            <p
              className="text-sm"
              style={{
                color: "var(--muted)",
              }}
            >
              per {product.unit}
            </p>
          </div>

          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: product.availability
                ? "#DCFCE7"
                : "#FEE2E2",
              color: product.availability
                ? "#166534"
                : "#B91C1C",
            }}
          >
            {product.availability
              ? "Available"
              : "Unavailable"}
          </span>
        </div>

        <div
          className="text-sm"
          style={{
            color: "var(--muted)",
          }}
        >
          Seller: {product.seller?.name}
        </div>

        <Link to={`/products/${product._id}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;