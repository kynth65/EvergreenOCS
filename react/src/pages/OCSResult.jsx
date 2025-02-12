import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OCSResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, calculations } = location.state || {};

    // If no data is passed, redirect back to calculator
    if (!formData || !calculations) {
        return navigate("/OCSCalculator");
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-green-600 text-white px-6 py-4">
                    <h1 className="text-2xl font-bold text-center">
                        Evergreen Realty
                    </h1>
                    <p className="text-center">Order Confirmation Slip (OCS)</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Client Information */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-green-600 border-b pb-2">
                            Client Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Client Name:</p>
                                <p className="font-medium">
                                    {formData.clientName}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Contact Number:</p>
                                <p className="font-medium">
                                    {formData.phoneNumber}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    Reservation Date:
                                </p>
                                <p className="font-medium">
                                    {formatDate(formData.reservationDate)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    Block and Lot Number:
                                </p>
                                <p className="font-medium">
                                    {formData.blockLot}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Property Details */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-green-600 border-b pb-2">
                            Property Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Project:</p>
                                <p className="font-medium">
                                    {formData.project}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Lot Area:</p>
                                <p className="font-medium">
                                    {formData.lotArea} sq.m.
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    Price per sq.m.:
                                </p>
                                <p className="font-medium">
                                    ₱{" "}
                                    {parseFloat(
                                        formData.pricePerSqm
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Payment Details */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-green-600 border-b pb-2">
                            Payment Information
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Payment Type:
                                    </span>
                                    <span className="font-semibold">
                                        {formData.paymentType}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Total Contract Price:
                                    </span>
                                    <span className="font-semibold">
                                        ₱{" "}
                                        {calculations.totalPrice.toLocaleString(
                                            undefined,
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
                                    </span>
                                </div>

                                {formData.paymentType === "INSTALLMENT" && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Down Payment (20%):
                                            </span>
                                            <span className="font-semibold">
                                                ₱{" "}
                                                {calculations.downPayment.toLocaleString(
                                                    undefined,
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Monthly Payment:
                                            </span>
                                            <span className="font-semibold">
                                                ₱{" "}
                                                {calculations.monthlyPayment.toLocaleString(
                                                    undefined,
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Terms:
                                            </span>
                                            <span className="font-semibold">
                                                {formData.installmentYears}{" "}
                                                years (
                                                {parseInt(
                                                    formData.installmentYears
                                                ) * 12}{" "}
                                                months)
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-4 text-sm text-gray-600">
                                {formData.paymentType === "SPOTCASH"
                                    ? "Reservation fee ₱20,000.00 is deductible."
                                    : "Reservation fee ₱20,000.00 is deductible from down payment."}
                            </div>
                        </div>
                    </section>

                    {/* Payment Schedule */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-green-600 border-b pb-2">
                            Payment Schedule
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Start Month:</p>
                                <p className="font-medium">
                                    {formData.paymentMonth}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Start Year:</p>
                                <p className="font-medium">
                                    {formData.paymentYear}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Signatures */}
                    <section className="mt-8 pt-8 border-t grid grid-cols-2 gap-8">
                        <div className="text-center">
                            <div className="border-b border-black mb-2 h-8"></div>
                            <p className="text-gray-600">Client's Signature</p>
                            <p className="font-medium">{formData.clientName}</p>
                        </div>
                        <div className="text-center">
                            <div className="border-b border-black mb-2 h-8"></div>
                            <p className="text-gray-600">Agent's Signature</p>
                            <p className="font-medium">
                                Authorized Representative
                            </p>
                        </div>
                    </section>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4">
                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Print OCS
                    </button>
                    <button
                        onClick={() => navigate("/OCSCalculator")}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Back to Calculator
                    </button>
                </div>
            </div>
        </div>
    );
}
