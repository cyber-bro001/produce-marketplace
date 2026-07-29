import type { ButtonHTMLAttributes } from "react";
import { styles } from "../../styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

function Button({
  children,
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.components.button} ${className}`}
      disabled={loading || disabled}
      style={{
        background: "var(--primary)",
        color: "#fff",
      }}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;
