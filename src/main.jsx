import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { router } from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </SkeletonTheme>
  </StrictMode>
);
