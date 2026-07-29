interface LoadingSpinnerProps {
  fullPage?: boolean;
  size?: number;
}

function LoadingSpinner({ fullPage = false, size = 40 }: LoadingSpinnerProps) {
  const spinner = (
    <div
      style={{
        width: size,
        height: size,
        border: `3px solid var(--border)`,
        borderTopColor: "var(--primary)",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );

  if (fullPage) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-16">{spinner}</div>
  );
}

export default LoadingSpinner;
