import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  grey: {
    grey1: "#1E1E20",
    grey2: "#38383C",
    grey3: "#5A595C",
    grey4: "#828282",
  },
  gray: {
    // same as grey1, to override global styles
    800: "#1E1E20",
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1.0625rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

const customTheme = {
  config,
  fontSizes,
  colors,
};

const theme = extendTheme(customTheme);

export default theme;
