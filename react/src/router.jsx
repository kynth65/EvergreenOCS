import { createBrowserRouter, Navigate } from "react-router-dom";

import Homepage from "./pages/HomePage";
import GuestLayout from "./layouts/GuestLayout";
import OCSCalculator from "./pages/OCSCalculator";
import OCSResult from "./pages/OCSResult";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "", // This is correct for home page
                element: <Homepage />,
            },
            {
                path: "/OCSCalculator",
                element: <OCSCalculator />,
            },
            {
                path: "/OCSResult",
                element: <OCSResult />,
            },
        ],
    },
]);

export default router;
