export const theme = {
  layout: {
    page: "min-h-screen bg-background text-foreground",

    container: "mx-auto w-full max-w-7xl px-6",
  },

  typography: {
    h1: "text-4xl font-semibold tracking-tight",

    h2: "text-2xl font-semibold",

    body: "text-base",

    small: "text-sm",

    label: "text-sm font-medium",
  },

  components: {
    card:
      "rounded-lg border border-border bg-surface shadow-md",

    input:
      "h-14 w-full rounded-md border border-border bg-surface px-5 outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-green-100",

    button:
      "flex h-14 w-full items-center justify-center rounded-md bg-primary font-medium text-white transition-all duration-200 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60",

    link:
      "font-medium text-primary hover:underline",

    alert:
      "rounded-md border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger",
  },
};