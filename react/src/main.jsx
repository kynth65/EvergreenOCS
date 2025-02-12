import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";
import { AuthProvider } from "./context/AuthContext"; // Add this import

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </AuthProvider>
    </StrictMode>
);
