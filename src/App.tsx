import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import "./App.scss";

const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#303030",
        paper: "#383838",
      },
      primary: {
        main: "#f2800a",
      },
      secondary: {
        main: "#f2800a",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

    </ThemeProvider>
  );
};

export default App;
