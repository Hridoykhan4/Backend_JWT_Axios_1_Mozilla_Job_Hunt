import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router.jsx";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider outerProvider router={Router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
