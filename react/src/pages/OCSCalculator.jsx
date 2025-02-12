import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OCSCalculator() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        clientName: "",
        project: "BEESCAPES",
        phoneNumber: "",
        reservationDate: "",
        blockLot: "",
        pricePerSqm: "",
        lotArea: "",
        paymentType: "SPOTCASH",
        installmentYears: "2",
        paymentMonth: "",
        paymentYear: "",
    });

    const [calculations, setCalculations] = useState({
        totalPrice: 0,
        downPayment: 0,
        monthlyPayment: 0,
        balancePayment: 0,
    });

    // Handle all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Calculate all prices
    useEffect(() => {
        if (formData.pricePerSqm && formData.lotArea) {
            let basePrice =
                parseFloat(formData.pricePerSqm) * parseFloat(formData.lotArea);
            let downPayment = 0;
            let balance = 0;
            let monthlyPayment = 0;

            if (formData.paymentType === "INSTALLMENT") {
                // Add 10% to base price for installment
                basePrice = basePrice * 1.1;

                // Calculate down payment (20% of total)
                downPayment = basePrice * 0.2;

                // Calculate balance
                balance = basePrice - downPayment;

                // Calculate monthly payment based on years
                const months = parseInt(formData.installmentYears) * 12;
                monthlyPayment = balance / months;
            }

            setCalculations({
                totalPrice: basePrice,
                downPayment,
                monthlyPayment,
                balancePayment: balance,
            });
        }
    }, [
        formData.pricePerSqm,
        formData.lotArea,
        formData.paymentType,
        formData.installmentYears,
    ]);

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">
                Evergreen Realty OCS
            </h1>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1">Client Name</label>
                    <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter client name"
                    />
                </div>

                <div>
                    <label className="block mb-1">Project</label>
                    <input
                        type="text"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Contact Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter contact number"
                    />
                </div>

                <div>
                    <label className="block mb-1">Reservation Date</label>
                    <input
                        type="date"
                        name="reservationDate"
                        value={formData.reservationDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Block and Lot Number</label>
                    <input
                        type="text"
                        name="blockLot"
                        value={formData.blockLot}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter Block and Lot"
                    />
                </div>

                <div>
                    <label className="block mb-1">Price per sq.m.</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2">₱</span>
                        <input
                            type="number"
                            name="pricePerSqm"
                            value={formData.pricePerSqm}
                            onChange={handleChange}
                            className="w-full p-2 pl-7 border rounded"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Lot Area (sq.m.)</label>
                    <input
                        type="number"
                        name="lotArea"
                        value={formData.lotArea}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter lot area"
                    />
                </div>

                <div>
                    <label className="block mb-1">Payment Type</label>
                    <select
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="SPOTCASH">Spot Cash</option>
                        <option value="INSTALLMENT">Installment</option>
                    </select>
                </div>

                {formData.paymentType === "INSTALLMENT" && (
                    <div>
                        <label className="block mb-1">Installment Period</label>
                        <select
                            name="installmentYears"
                            value={formData.installmentYears}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="2">2 Years (24 months)</option>
                            <option value="3">3 Years (36 months)</option>
                            <option value="4">4 Years (48 months)</option>
                            <option value="5">5 Years (60 months)</option>
                            <option value="6">6 Years (72 months)</option>
                        </select>
                    </div>
                )}

                {calculations.totalPrice > 0 && (
                    <>
                        <h2 className="text-green-600 text-xl font-bold mt-8 mb-4">
                            BREAKDOWN OF PAYMENT
                        </h2>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-6">
                                {formData.paymentType === "SPOTCASH"
                                    ? "SPOTCASH PAYMENT"
                                    : "INSTALLMENT BREAKDOWN"}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-green-600 font-medium">
                                        Total Contract Price:
                                    </span>
                                    <span className="text-coral-red text-lg">
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
                                        <div className="flex flex-col">
                                            <span className="text-green-600 font-medium">
                                                Down Payment (20%):
                                            </span>
                                            <span className="text-coral-red text-lg">
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

                                        <div className="flex flex-col">
                                            <span className="text-green-600 font-medium">
                                                Balance:
                                            </span>
                                            <span className="text-coral-red text-lg">
                                                ₱{" "}
                                                {calculations.balancePayment.toLocaleString(
                                                    undefined,
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-green-600 font-medium">
                                                Monthly Payment:
                                            </span>
                                            <span className="text-coral-red text-lg">
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

                                        <div className="text-gray-600 mt-4">
                                            Terms: {formData.installmentYears}{" "}
                                            years (
                                            {parseInt(
                                                formData.installmentYears
                                            ) * 12}{" "}
                                            months)
                                            <br />
                                            Reservation fee ₱20,000.00 is
                                            deductible from down payment.
                                        </div>
                                    </>
                                )}

                                {formData.paymentType === "SPOTCASH" && (
                                    <div className="text-gray-600 mt-4">
                                        Shall be payable within a month.
                                        <br />
                                        Reservation fee ₱20,000.00 is
                                        deductible.
                                    </div>
                                )}
                            </div>
                        </div>

                        <h3 className="text-green-600 font-medium mt-6 mb-2">
                            Date of Payment
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-green-600">
                                    Month
                                </label>
                                <input
                                    type="text"
                                    name="paymentMonth"
                                    value={formData.paymentMonth}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-50 border rounded"
                                    placeholder="Month"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-green-600">
                                    Year
                                </label>
                                <input
                                    type="text"
                                    name="paymentYear"
                                    value={formData.paymentYear}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-50 border rounded"
                                    placeholder="YYYY"
                                    maxLength={4}
                                />
                            </div>
                        </div>
                    </>
                )}

                <button
                    onClick={() =>
                        navigate("/OCSResult", {
                            state: {
                                formData,
                                calculations,
                            },
                        })
                    }
                    className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Create OCS
                </button>
            </div>
        </div>
    );
}
