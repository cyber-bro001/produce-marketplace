export const styles = {
  layout: {
    page: "min-h-screen",
    container: "mx-auto w-full max-w-7xl px-6",
  },

  typography: {
    h1: "text-4xl font-semibold tracking-tight",
    h2: "text-2xl font-semibold tracking-tight",
    body: "text-base leading-7",
    small: "text-sm",
    label: "text-sm font-medium",
  },

  components: {
    card: "rounded-[var(--radius-lg)] border p-8",

    input:
      "h-14 w-full rounded-[var(--radius-md)] border px-5 outline-none",

    button:
      "flex h-14 w-full items-center justify-center rounded-[var(--radius-md)] font-medium",

    link: "font-medium hover:underline",

    alert: "rounded-[var(--radius-md)] border px-4 py-3",
  },
};