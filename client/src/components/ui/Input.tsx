import type { InputHTMLAttributes, ReactNode } from "react";
import { styles } from "../../styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  rightIcon?: ReactNode;
}

function Input({
  label,
  error,
  helperText,
  rightIcon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label
        className={styles.typography.label}
        style={{ color: "var(--foreground)" }}
      >
        {label}
      </label>

      <div className="relative">
        <input
          className={`${styles.components.input} ${
            rightIcon ? "pr-12" : ""
          } ${className}`}
          style={{
            background: "var(--surface)",
            borderColor: error ? "var(--danger)" : "var(--border)",
            color: "var(--foreground)",
          }}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
