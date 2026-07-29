export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const ORDER_STATUS_STYLES: Record<
  string,
  { bg: string; color: string }
> = {
  Pending: { bg: "#FEF9C3", color: "#854D0E" },
  Confirmed: { bg: "#DBEAFE", color: "#1E40AF" },
  Completed: { bg: "#DCFCE7", color: "#166534" },
  Cancelled: { bg: "#FEE2E2", color: "#B91C1C" },
};
