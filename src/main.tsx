import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/tailwind.css";
import "./assets/styles/global.scss";
import { RouterProvider } from "react-router/dom";
import router from "./app/router.ts";
import "./shared/icons/icons.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
