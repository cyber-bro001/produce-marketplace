interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  const all = ["All", ...categories];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {all.map((cat) => {
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="flex-shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
            style={{
              background: isActive ? "var(--primary)" : "var(--surface)",
              borderColor: isActive ? "var(--primary)" : "var(--border)",
              color: isActive ? "#fff" : "var(--foreground)",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
