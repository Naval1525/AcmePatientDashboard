// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
// Combine class names with tailwind
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
// Format date to readable string
export function formatDate(date, formatString = "MMM d, yyyy") {
    if (!date)
        return "N/A";
    try {
        const dateObj = typeof date === "string" ? parseISO(date) : date;
        return format(dateObj, formatString);
    }
    catch (error) {
        console.error("Date formatting error:", error);
        return "Invalid date";
    }
}
// Calculate BMI
export function calculateBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm)
        return 0;
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
}
// Get BMI category
export function getBMICategory(bmi) {
    if (bmi < 18.5)
        return "Underweight";
    if (bmi < 25)
        return "Normal weight";
    if (bmi < 30)
        return "Overweight";
    return "Obesity";
}
// Format shipment status with colors
export function getShipmentStatusColor(status) {
    switch (status.toLowerCase()) {
        case "delivered":
            return "bg-green-100 text-green-800";
        case "shipped":
            return "bg-blue-100 text-blue-800";
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}
// Calculate weight change percentage
export function calculateWeightChangePercentage(startWeight, currentWeight) {
    if (!startWeight || !currentWeight)
        return 0;
    const change = ((startWeight - currentWeight) / startWeight) * 100;
    return parseFloat(change.toFixed(1));
}
