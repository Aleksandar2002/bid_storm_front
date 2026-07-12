import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/tailwind.css";
import "./assets/styles/global.scss";
import { RouterProvider } from "react-router/dom";
import router from "./app/router.ts";
import "./shared/icons/icons.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HubsProvider } from "./shared/hubs/hubsContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HubsProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HubsProvider>
  </StrictMode>,
);
