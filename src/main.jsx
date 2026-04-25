import "./index.css";
import "./i18n";

import { GlobalProvider } from "./shared/context/GlobalContext";
import { RouterProvider } from "react-router/dom";
import { StrictMode } from "react";
import { ThemeProvider } from "./shared/context/ThemeContext";
import { createRoot } from "react-dom/client";
import router from "./app/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </GlobalProvider>
  </StrictMode>,
);
