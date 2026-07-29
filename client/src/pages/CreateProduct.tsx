import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { createProduct } from "../api/product";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import ThemeToggle from "../components/ThemeToggle";

import { styles } from "../styles";

function CreateProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unit: "",
    quantity: "",
    image: null as File | null,
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const imagePreview = useMemo(() => {
    if (!formData.image) return "";

    return URL.createObjectURL(formData.image);
  }, [formData.image]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const { name, description, category, price, unit, quantity, image } =
      formData;

    if (!name || !description || !category || !price || !unit || !quantity) {
      setError("Please fill in every required field.");

      return;
    }

    try {
      setLoading(true);

      await createProduct({
        name,
        description,
        category,
        price: Number(price),
        unit,
        quantity: Number(quantity),
        image,
      });

      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Failed to create product.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={styles.layout.page}
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className={styles.typography.h1}>Create Product</h1>

            <p style={{ color: "var(--muted)" }}>
              Add a new product to your marketplace.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[var(--radius-lg)] border p-8"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <label className={styles.typography.label}>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={styles.components.input}
              style={{
                background: "var(--surface)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <Input
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <div className="space-y-3">
            <label className={styles.typography.label}>Product Image</label>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-56 w-full rounded-xl object-cover"
              />
            )}
          </div>

          {error && (
            <div
              className={styles.components.alert}
              style={{
                borderColor: "var(--danger)",
                color: "var(--danger)",
              }}
            >
              {error}
            </div>
          )}

          <Button type="submit" loading={loading}>
            Create Product
          </Button>
        </form>
      </section>
    </main>
  );
}

export default CreateProduct;
