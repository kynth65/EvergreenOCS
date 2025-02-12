import { createBrowserRouter, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import GuestLayout from "./layouts/GuestLayout";
import OCSCalculator from "./pages/OCSCalculator";
import OCSResult from "./pages/OCSResult";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <GuestLayout />
            </AuthProvider>
        ),
        children: [
            {
                path: "",
                element: <Homepage />,
            },
            {
                path: "/OCSCalculator",
                element: (
                    <ProtectedRoute>
                        <OCSCalculator />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/OCSResult",
                element: (
                    <ProtectedRoute>
                        <OCSResult />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default router;
