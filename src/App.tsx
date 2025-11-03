import React from "react";
import { AppRouter } from "./router";
import ThemeProvider from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
