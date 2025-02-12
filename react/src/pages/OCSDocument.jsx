import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: "white",
    },
    header: {
        marginBottom: 20,
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
        color: "#228B22",
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 15,
        color: "#228B22",
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 10,
        color: "#FF9F87",
        paddingBottom: 5,
    },
    // New grid styles
    gridContainer: {
        borderTop: 1,
        borderLeft: 1,
        borderColor: "#E5E7EB",
    },
    row: {
        flexDirection: "row",
        borderBottom: 1,
        borderColor: "#E5E7EB",
        minHeight: 30,
        alignItems: "center",
    },
    cell: {
        flex: 1,
        padding: 8,
        borderRight: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
    },
    label: {
        fontSize: 10,
        color: "#707070",
    },
    value: {
        fontSize: 10,
        color: "#228B22",
    },
    paymentInfo: {
        backgroundColor: "#FFF8F7",
        marginBottom: 10,
    },
    signatureSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
    },
    signatureBox: {
        width: "45%",
        textAlign: "center",
    },
    signatureLine: {
        borderBottom: 1,
        borderColor: "#FF9F87",
        marginBottom: 5,
    },
    breakdownHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4CAF50", // Green background
        padding: 10,
        marginBottom: 0,
    },
    breakdownHeader: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    breakdownTitle: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold",
    },
    sectionHeader: {
        backgroundColor: "#FFE5E0", // Light salmon color for section headers
        padding: 8,
    },
    highlightedAmount: {
        backgroundColor: "#FFFF00", // Keeping yellow highlight for monthly payment
        padding: 8,
    },
    amountText: {
        textAlign: "right",
        fontSize: 10,
        color: "#228B22", // Green for amount text
    },
    italicText: {
        fontStyle: "italic",
        color: "#228B22", // Green for italic text
        fontSize: 10,
    },
    rightAlignedCell: {
        flex: 1,
        padding: 8,
        borderRight: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "flex-end",
    },
});

const OCSDocument = ({ formData, calculations }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const calculateEndDate = () => {
        if (formData.paymentMonth && formData.paymentYear) {
            const startDate = new Date(
                `${formData.paymentMonth} 30, ${formData.paymentYear}`
            );
            const endDate = new Date(startDate);
            endDate.setFullYear(
                endDate.getFullYear() + parseInt(formData.installmentYears)
            );
            endDate.setMonth(endDate.getMonth() - 1); // Subtract one month for end date
            return endDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        }
        return "Not specified";
    };
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Evergreen Realty Philippines
                    </Text>
                    <Text style={styles.subtitle}>
                        Official Computation Sheet (OCS)
                    </Text>
                </View>

                {/* Client Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Client Information</Text>
                    <View style={styles.gridContainer}>
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Client Name:</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.value}>
                                    {formData.clientName}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.label}>
                                    Contact Number:
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.value}>
                                    {formData.phoneNumber}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>
                                    Reservation Date:
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.value}>
                                    {formatDate(formData.reservationDate)}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.label}>
                                    Block and Lot Number:
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.value}>
                                    {formData.blockLot}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Property Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Property Details</Text>
                    <View style={styles.gridContainer}>
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Project:</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.value}>
                                    {formData.project}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Lot Area:</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.value}>
                                    {formData.lotArea} sq.m.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.label}>
                                    Price per sq.m.:
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.value}>
                                    P{" "}
                                    {parseFloat(
                                        formData.pricePerSqm
                                    ).toLocaleString()}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.label}>Type:</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.value}>Agricultural</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Payment Information */}
                <View style={styles.section}>
                    <View style={styles.gridContainer}>
                        {formData.paymentType === "INSTALLMENT" ? (
                            <>
                                <View style={styles.section}>
                                    <View
                                        style={styles.breakdownHeaderContainer}
                                    >
                                        <Text style={styles.breakdownHeader}>
                                            BREAKDOWN OF PAYMENT
                                        </Text>
                                    </View>
                                    <View style={styles.gridContainer}>
                                        {/* Downpayment Section */}
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    styles.sectionHeader,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.label}>
                                                    DOWNPAYMENT
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.rightAlignedCell}
                                            >
                                                <Text style={styles.amountText}>
                                                    P{" "}
                                                    {calculations.downPayment.toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.label}>
                                                    Reservation Fee
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.rightAlignedCell}
                                            >
                                                <Text style={styles.amountText}>
                                                    P 20,000.00
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.label}>
                                                    Down Payment
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.rightAlignedCell}
                                            >
                                                <Text style={styles.amountText}>
                                                    P{" "}
                                                    {(
                                                        calculations.downPayment -
                                                        20000
                                                    ).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.label}>
                                                    Due Date
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.rightAlignedCell}
                                            >
                                                <Text style={styles.italicText}>
                                                    {formData.paymentMonth}{" "}
                                                    {formData.paymentYear}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Balance Payment Section */}
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    styles.sectionHeader,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.label}>
                                                    BALANCE PAYMENT
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.rightAlignedCell}
                                            >
                                                <Text style={styles.amountText}>
                                                    P{" "}
                                                    {calculations.balancePayment.toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.italicText}>
                                                    {formData.installmentYears}{" "}
                                                    years
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.rightAlignedCell}
                                            >
                                                <Text style={styles.label}>
                                                    Monthly Installment
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.italicText}>
                                                    Every 30th of the month
                                                </Text>
                                            </View>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    styles.highlightedAmount,
                                                ]}
                                            >
                                                <Text style={styles.amountText}>
                                                    P{" "}
                                                    {calculations.monthlyPayment.toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.italicText}>
                                                    {parseInt(
                                                        formData.installmentYears
                                                    ) * 12}{" "}
                                                    months
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.label}>
                                                    Date Start
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.rightAlignedCell}
                                            >
                                                <Text style={styles.italicText}>
                                                    {formData.paymentMonth} 30,{" "}
                                                    {formData.paymentYear}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View
                                                style={[
                                                    styles.cell,
                                                    { flex: 2 },
                                                ]}
                                            >
                                                <Text style={styles.label}>
                                                    Date End
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.rightAlignedCell}
                                            >
                                                <Text style={styles.italicText}>
                                                    {calculateEndDate()}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View style={styles.section}>
                                <View style={styles.breakdownHeaderContainer}>
                                    <Text style={styles.breakdownHeader}>
                                        BREAKDOWN OF PAYMENT
                                    </Text>
                                </View>
                                <View style={styles.gridContainer}>
                                    <View style={styles.row}>
                                        <View
                                            style={[
                                                styles.cell,
                                                styles.sectionHeader,
                                                { flex: 2 },
                                            ]}
                                        >
                                            <Text style={styles.label}>
                                                SPOTCASH
                                            </Text>
                                        </View>
                                        <View style={styles.rightAlignedCell}>
                                            <Text style={styles.amountText}>
                                                P{" "}
                                                {calculations.totalPrice.toLocaleString(
                                                    undefined,
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View
                                            style={[styles.cell, { flex: 2 }]}
                                        >
                                            <Text
                                                style={[
                                                    styles.label,
                                                    {
                                                        color: "red",
                                                        fontStyle: "italic",
                                                    },
                                                ]}
                                            >
                                                Shall be payable within a month,
                                                reservation fee
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View
                                            style={[styles.cell, { flex: 2 }]}
                                        >
                                            <Text
                                                style={[
                                                    styles.label,
                                                    {
                                                        color: "red",
                                                        fontStyle: "italic",
                                                    },
                                                ]}
                                            >
                                                P 20,000.00 is deductible.
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View
                                            style={[styles.cell, { flex: 2 }]}
                                        >
                                            <Text style={styles.label}>
                                                Due Date
                                            </Text>
                                        </View>
                                        <View style={styles.rightAlignedCell}>
                                            <Text style={styles.italicText}>
                                                {formData.paymentMonth}{" "}
                                                {formData.paymentYear}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View
                                            style={[styles.cell, { flex: 2 }]}
                                        >
                                            <Text style={styles.label}>
                                                Total Amount
                                            </Text>
                                        </View>
                                        <View style={styles.rightAlignedCell}>
                                            <Text style={styles.amountText}>
                                                P{" "}
                                                {calculations.totalPrice.toLocaleString(
                                                    undefined,
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default OCSDocument;
