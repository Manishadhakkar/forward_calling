import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#4d2920",
          200: "#1f191f",
          300: "#1e1b1f",
          400: "#201a1a87",
          500: "#272427",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
        blue: {
          100: "#caf0f8",
          200: "#ade8f4",
          300: "#90e0ef",
          400: "#48cae4",
          500: "#00b4d8",
          600: "#0096c7",
          700: "#0077b6",
          800: "#023e8a",
          900: "#03045e",
        },
        green: {
          100: "#46F057",
          200: "#27ED3B",
          300: "#10C222",
          400: "#0DA31C",
        },
        textColor: {
          100: "#46F057",
          200: "#27ED3B",
          300: "#10C222",
          400: "#0DA31C",
        },
        switchColor: {
          100: "#50ee58",
          200: "#1976d2",
        },
        form: {
          100: "#F1EFEF",
          200: "#CCC8AA",
          300: "#7D7C7C",
          400: "#526D82",
        },
        btn: {
          100: "#FAF0E6",
          200: "#352F44",
        },
        layoutColor: {
          100: "#000000",
          200: "#e0e0e0",
        },
        borderColor: {
          100: "#30826d",
          200: "#696969",
        },
        container: {
          100: "#141b2d",
          200: "#fcfcfc",
        },
        tableRow: {
          100: "#2a1814",
          200: "#1f191f",
        },
      }
    : {
        tableRow: {
          100: "#1f191f",
          200: "#2a1814",
        },
        container: {
          100: "#fcfcfc",
          200: "#141b2d",
        },
        borderColor: {
          100: "#a9a9a9",
          200: "#696969",
        },
        layoutColor: {
          100: "#e0e0e0",
          200: "#000000",
        },
        btn: {
          100: "#352F44",
          200: "#FAF0E6",
        },
        form: {
          100: "#526D82",
          200: "#7D7C7C",
          300: "#CCC8AA",
          400: "#F1EFEF",
        },
        switchColor: {
          100: "#1976d2",
          200: "#50ee58",
        },
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#3949AB", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
        blue: {
          100: "#03045e",
          200: "#023e8a",
          300: "#0077b6",
          400: "#0096c7",
          500: "#00b4d8",
          600: "#48cae4",
          700: "#90e0ef",
          800: "#ade8f4",
          900: "#caf0f8",
        },
        green: {
          100: "#0DA31C",
          200: "#10C222",
          300: "#27ED3B",
          400: "#46F057",
        },
        textColor: {
          400: "#46F057",
          300: "#27ED3B",
          200: "#10C222",
          100: "#46F057",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
export const LoaderModeContext = createContext({
  loadingMode: (val) => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark")),
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
