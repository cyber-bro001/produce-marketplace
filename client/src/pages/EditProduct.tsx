import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getProduct, updateProduct } from "../api/product";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LoadingSpinner from "../components/LoadingSpinner";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unit: "",
    quantity: "",
    availability: true,
    image: null as File | null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then((product) => {
        setFormData({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price.toString(),
          unit: product.unit,
          quantity: product.quantity.toString(),
          availability: product.availability,
          image: null,
        });
        setExistingImage(product.image);
      })
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));
  }, [id]);

  const imagePreview = useMemo(() => {
    if (formData.image) return URL.createObjectURL(formData.image);
    return existingImage;
  }, [formData.image, existingImage]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFormData((prev) => ({ ...prev, image: file }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setError("");
    setSaving(true);
    try {
      await updateProduct(id, {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        unit: formData.unit,
        quantity: Number(formData.quantity),
        availability: formData.availability,
        image: formData.image ?? undefined,
      });
      navigate("/seller/products");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        setError(data?.errors?.[0]?.message ?? data?.message ?? "Update failed.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Update your product listing.
        </p>
      </div>

      <div
        className="rounded-[var(--radius-lg)] border p-6 sm:p-8"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} />

          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="h-auto w-full rounded-[var(--radius-md)] border px-5 py-3 text-sm outline-none"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground)" }}
            />
          </div>

          <Input label="Category" name="category" value={formData.category} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (₦)" type="number" name="price" value={formData.price} onChange={handleChange} min="0" />
            <Input label="Unit" name="unit" value={formData.unit} onChange={handleChange} />
          </div>

          <Input label="Quantity" type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="availability"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            <label htmlFor="availability" className="text-sm font-medium">
              Mark as available
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              Product Image
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 h-48 w-full rounded-xl object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
            )}
          </div>

          {error && (
            <p className="text-sm" style={{ color: "var(--danger)" }}>{error}</p>
          )}

          <div className="flex gap-3">
            <Button type="submit" loading={saving}>Save Changes</Button>
            <button
              type="button"
              onClick={() => navigate("/seller/products")}
              className="flex h-14 flex-1 items-center justify-center rounded-[var(--radius-md)] border text-sm font-medium"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
