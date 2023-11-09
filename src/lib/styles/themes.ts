type ThemeType = "color" | "size" | "text";

export const themes: Record<ThemeType, Record<string, string>> = {
  color: {
    white: "#f2f2f2",
    black: "#000",
    brown: "#DFBB9D",
    beige: "#F7E2D6",
    teal: "#9DD6DF",
    purple: "#A084CF"
  },
  size: {
    md: "16px",
    sm: "14px",
    lg: "18px"
  },
  text: {
    default: "#fff",
    black: "#000",
  }
};