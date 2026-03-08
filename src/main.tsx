import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/tailwind.css";
import "./assets/styles/global.scss";
import { RouterProvider } from "react-router/dom";
import router from "./app/router.ts";
import { UserProvider } from "./context/UserContext.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import "./shared/icons/icons.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoaderProvider>
      <ToastProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ToastProvider>
    </LoaderProvider>
  </StrictMode>,
);
