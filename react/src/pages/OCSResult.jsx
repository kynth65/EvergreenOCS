import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import OCSDocument from "./OCSDocument";
import { Monitor, Smartphone } from "lucide-react";

export default function OCSResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, calculations } = location.state || {};
    const [isClient, setIsClient] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // If no data is passed, redirect back to calculator
    if (!formData || !calculations) {
        return navigate("/OCSCalculator");
    }

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-lg shadow-sm border-b p-3 sm:p-4 mb-2 sm:mb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Official Computation Sheet Preview
                        </h1>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            {isClient && (
                                <PDFDownloadLink
                                    document={
                                        <OCSDocument
                                            formData={formData}
                                            calculations={calculations}
                                        />
                                    }
                                    fileName={`OCS-${formData.clientName.replace(
                                        /\s+/g,
                                        "-"
                                    )}.pdf`}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center text-sm sm:text-base"
                                >
                                    {({ loading }) => (
                                        <div className="flex items-center justify-center space-x-2">
                                            <span>
                                                {loading
                                                    ? "Generating..."
                                                    : "Download PDF"}
                                            </span>
                                        </div>
                                    )}
                                </PDFDownloadLink>
                            )}
                            <button
                                onClick={() => navigate("/OCSCalculator")}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm sm:text-base"
                            >
                                Back to Calculator
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Message */}
                {isMobile && (
                    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
                        <div className="flex items-center justify-center space-x-2 text-amber-600 mb-3">
                            <Smartphone className="w-5 h-5" />
                            <span className="font-medium">
                                Mobile Device Detected
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm text-center">
                            PDF preview is not available on mobile devices for
                            better performance. Please use the Download button
                            above to view the PDF.
                        </p>
                    </div>
                )}

                {/* PDF Viewer - Only show on desktop */}
                {!isMobile && (
                    <div className="bg-white rounded-lg shadow-sm border h-[600px] sm:h-[800px]">
                        {isClient && (
                            <PDFViewer
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                            >
                                <OCSDocument
                                    formData={formData}
                                    calculations={calculations}
                                />
                            </PDFViewer>
                        )}
                    </div>
                )}

                {/* Mobile Summary View */}
                {isMobile && (
                    <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Client Name
                                </h3>
                                <p className="text-base font-medium">
                                    {formData.clientName}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Project
                                </h3>
                                <p className="text-base font-medium">
                                    {formData.project}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Total Contract Price
                                </h3>
                                <p className="text-base font-medium">
                                    ₱{" "}
                                    {calculations.totalPrice.toLocaleString(
                                        undefined,
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }
                                    )}
                                </p>
                            </div>
                            {formData.paymentType === "INSTALLMENT" && (
                                <>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Down Payment
                                        </h3>
                                        <p className="text-base font-medium">
                                            ₱{" "}
                                            {calculations.downPayment.toLocaleString(
                                                undefined,
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Monthly Payment
                                        </h3>
                                        <p className="text-base font-medium">
                                            ₱{" "}
                                            {calculations.monthlyPayment.toLocaleString(
                                                undefined,
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
