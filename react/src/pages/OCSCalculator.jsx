import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EvergreenLogo from "../assets/Evergreen Logo .png";

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
        <>
            <div className="min-h-screen bg-red-100">
                <div className="p-2 sm:p-4 max-w-2xl mx-auto">
                    <div className="space-y-4 sm:space-y-6 bg-[#FFF8F7] p-3 sm:p-6 rounded-lg shadow-lg">
                        <div className="flex justify-center">
                            {" "}
                            <img
                                src={EvergreenLogo}
                                className="w-32 h-32 sm:w-40 sm:h-40"
                                alt=""
                            />
                        </div>

                        <h1 className="hidden sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-[#299b38]">
                            Evergreen Realty PH OCS
                        </h1>

                        <div>
                            <label className="block mb-2 text-[#299b38] font-medium">
                                Client Name
                            </label>
                            <input
                                type="text"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors"
                                placeholder="Enter client name"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-[#299b38] font-medium">
                                Project
                            </label>
                            <input
                                type="text"
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors bg-white"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-[#299b38] font-medium">
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors"
                                placeholder="Enter contact number"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-[#299b38] font-medium">
                                Reservation Date
                            </label>
                            <input
                                type="date"
                                name="reservationDate"
                                value={formData.reservationDate}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-[#299b38] font-medium">
                                Block and Lot Number
                            </label>
                            <input
                                type="text"
                                name="blockLot"
                                value={formData.blockLot}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors"
                                placeholder="Enter Block and Lot"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-[#299b38] font-medium">
                                Price per sq.m.
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500">
                                    ₱
                                </span>
                                <input
                                    type="number"
                                    name="pricePerSqm"
                                    value={formData.pricePerSqm}
                                    onChange={handleChange}
                                    className="w-full p-3 pl-8 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-[#299b38] font-medium">
                                Lot Area (sq.m.)
                            </label>
                            <input
                                type="number"
                                name="lotArea"
                                value={formData.lotArea}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors"
                                placeholder="Enter lot area"
                            />
                        </div>
                        <h3 className="text-[#299b38] font-lg font-bold mt-6 mb-2">
                            Date of Payment
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 sm:mb-2 text-[#299b38] font-medium text-sm sm:text-base">
                                    Month
                                </label>
                                <input
                                    type="text"
                                    name="paymentMonth"
                                    value={formData.paymentMonth}
                                    onChange={handleChange}
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors"
                                    placeholder="Month"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 sm:mb-2 text-[#299b38] font-medium text-sm sm:text-base">
                                    Year
                                </label>
                                <input
                                    type="text"
                                    name="paymentYear"
                                    value={formData.paymentYear}
                                    onChange={handleChange}
                                    className="w-full p-2 sm:p-3 text-sm sm:text-base border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors"
                                    placeholder="YYYY"
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-[#299b38] font-medium">
                                Payment Type
                            </label>
                            <select
                                name="paymentType"
                                value={formData.paymentType}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors bg-white"
                            >
                                <option value="SPOTCASH">Spot Cash</option>
                                <option value="INSTALLMENT">Installment</option>
                            </select>
                        </div>

                        {formData.paymentType === "INSTALLMENT" && (
                            <div>
                                <label className="block mb-2 text-[#299b38] font-medium">
                                    Installment Period
                                </label>
                                <select
                                    name="installmentYears"
                                    value={formData.installmentYears}
                                    onChange={handleChange}
                                    className="w-full p-3 border-2 border-[#FFE5E0] rounded-lg focus:border-[#FF9F87] focus:outline-none transition-colors bg-white"
                                >
                                    <option value="2">
                                        2 Years (24 months)
                                    </option>
                                    <option value="3">
                                        3 Years (36 months)
                                    </option>
                                    <option value="4">
                                        4 Years (48 months)
                                    </option>
                                    <option value="5">
                                        5 Years (60 months)
                                    </option>
                                    <option value="6">
                                        6 Years (72 months)
                                    </option>
                                </select>
                            </div>
                        )}

                        {calculations.totalPrice > 0 && (
                            <>
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#299b38]">
                                    BREAKDOWN OF PAYMENT
                                </h2>

                                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md border-2 border-[#FFE5E0]">
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#299b38]">
                                        {formData.paymentType === "SPOTCASH"
                                            ? "SPOTCASH PAYMENT"
                                            : "INSTALLMENT BREAKDOWN"}
                                    </h3>

                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex flex-col">
                                            <span className="text-[#299b38] font-medium text-sm sm:text-base">
                                                Total Contract Price:
                                            </span>
                                            <span className="text-[#FF9F87] font-bold text-xl sm:text-2xl">
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

                                        {formData.paymentType ===
                                            "INSTALLMENT" && (
                                            <>
                                                <div className="flex flex-col">
                                                    <span className="text-[#299b38] font-medium">
                                                        Down Payment (20%):
                                                    </span>
                                                    <span className="text-[#FF9F87] text-lg">
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
                                                    <span className="text-[#299b38] font-medium">
                                                        Balance:
                                                    </span>
                                                    <span className="text-[#FF9F87] text-lg">
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
                                                    <span className="text-[#299b38] font-medium">
                                                        Monthly Payment:
                                                    </span>
                                                    <span className="text-[#FF9F87] text-lg">
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
                                                    Terms:{" "}
                                                    {formData.installmentYears}{" "}
                                                    years (
                                                    {parseInt(
                                                        formData.installmentYears
                                                    ) * 12}{" "}
                                                    months)
                                                    <br />
                                                    Reservation fee ₱20,000.00
                                                    is deductible from down
                                                    payment.
                                                </div>
                                            </>
                                        )}

                                        {formData.paymentType ===
                                            "SPOTCASH" && (
                                            <div className="text-gray-600 mt-4">
                                                Shall be payable within a month.
                                                <br />
                                                Reservation fee ₱20,000.00 is
                                                deductible.
                                            </div>
                                        )}
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
                            className="w-full p-2 sm:p-3 bg-[#FF9F87] text-white rounded-lg hover:bg-[#ff8a6d] transition-colors mt-6 sm:mt-8 font-medium shadow-md text-sm sm:text-base"
                        >
                            Create OCS
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
