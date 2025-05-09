import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// // src/components/dashboard/WeightProgress.tsx
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { WeightEntry } from "../../types/index";
// import { weightAPI } from "../../lib/api";
// import { calculateWeightChangePercentage, formatDate } from "../../lib/utils";
// export default function WeightProgress() {
//   const [entries, setEntries] = useState<WeightEntry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [newEntry, setNewEntry] = useState({
//     weight: "",
//     date: new Date().toISOString().split("T")[0],
//     notes: "",
//   });
//   const [addingEntry, setAddingEntry] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   useEffect(() => {
//     fetchWeightEntries();
//   }, []);
//   const fetchWeightEntries = async () => {
//     try {
//       setLoading(true);
//       const data = await weightAPI.getAll();
//       // Sort by date ascending
//       const sortedData = [...data].sort(
//         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//       );
//       setEntries(sortedData);
//     } catch (err) {
//       console.error("Failed to fetch weight entries:", err);
//       setError("Failed to load weight data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleAddEntry = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const weightValue = parseFloat(newEntry.weight);
//       if (isNaN(weightValue)) {
//         throw new Error("Weight must be a valid number");
//       }
//       await weightAPI.add(weightValue, newEntry.date, newEntry.notes);
//       // Reset form and refresh data
//       setNewEntry({
//         weight: "",
//         date: new Date().toISOString().split("T")[0],
//         notes: "",
//       });
//       setAddingEntry(false);
//       await fetchWeightEntries();
//     } catch (err: any) {
//       setError(err.message || "Failed to add weight entry");
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   const getWeightChange = () => {
//     if (entries.length < 2) return null;
//     const oldestWeight = entries[0].weight;
//     const latestWeight = entries[entries.length - 1].weight;
//     return {
//       absolute: latestWeight - oldestWeight,
//       percentage: calculateWeightChangePercentage(oldestWeight, latestWeight),
//     };
//   };
//   const weightChange = getWeightChange();
//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
//       </div>
//     );
//   }
//   const chartData = entries.map((entry) => ({
//     date: formatDate(entry.date, "MMM d"),
//     weight: entry.weight,
//   }));
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Weight Progress</h2>
//         <Button
//           onClick={() => setAddingEntry(!addingEntry)}
//           variant={addingEntry ? "outline" : "default"}
//         >
//           {addingEntry ? "Cancel" : "Add Entry"}
//         </Button>
//       </div>
//       {error && (
//         <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-6">
//           <p className="text-red-600">{error}</p>
//         </div>
//       )}
//       {addingEntry && (
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle className="text-lg">Add Weight Entry</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleAddEntry} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label htmlFor="weight" className="text-sm font-medium">
//                     Weight (kg)
//                   </label>
//                   <Input
//                     id="weight"
//                     type="number"
//                     step="0.1"
//                     value={newEntry.weight}
//                     onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
//                     required
//                     placeholder="75.5"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label htmlFor="date" className="text-sm font-medium">
//                     Date
//                   </label>
//                   <Input
//                     id="date"
//                     type="date"
//                     value={newEntry.date}
//                     onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="notes" className="text-sm font-medium">
//                   Notes (optional)
//                 </label>
//                 <Input
//                   id="notes"
//                   value={newEntry.notes}
//                   onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
//                   placeholder="Any observations..."
//                 />
//               </div>
//               <Button type="submit" disabled={submitting}>
//                 {submitting ? "Saving..." : "Save Entry"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       )}
//       {entries.length === 0 ? (
//         <Card>
//           <CardContent className="py-8">
//             <div className="text-center">
//               <p className="text-gray-500 mb-4">No weight entries yet</p>
//               <Button onClick={() => setAddingEntry(true)}>Add Your First Entry</Button>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <>
//           <Card className="mb-6">
//             <CardHeader>
//               <CardTitle className="text-lg">Weight Trend</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis domain={['auto', 'auto']} />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="weight"
//                       stroke="#3b82f6"
//                       strokeWidth={2}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//               {weightChange && (
//                 <div className="mt-4 text-center">
//                   <p className="text-sm text-gray-600">
//                     {weightChange.absolute < 0 ? "Lost" : "Gained"}{" "}
//                     <span className={weightChange.absolute < 0 ? "text-green-600" : "text-red-600"}>
//                       {Math.abs(weightChange.absolute).toFixed(1)} kg
//                     </span>{" "}
//                     ({Math.abs(weightChange.percentage)}%) since first entry
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg">Weight History</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="px-4 py-2 text-left">Date</th>
//                       <th className="px-4 py-2 text-left">Weight (kg)</th>
//                       <th className="px-4 py-2 text-left">Notes</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[...entries].reverse().map((entry) => (
//                       <tr key={entry.id} className="border-b">
//                         <td className="px-4 py-3">{formatDate(entry.date)}</td>
//                         <td className="px-4 py-3">{entry.weight}</td>
//                         <td className="px-4 py-3 text-gray-600">{entry.notes || "-"}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }
// src/components/dashboard/WeightProgress.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, } from "recharts";
import { weightAPI } from "../../lib/api";
import { calculateWeightChangePercentage, formatDate } from "../../lib/utils";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
export default function WeightProgress() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newEntry, setNewEntry] = useState({
        weight: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
    });
    const [addingEntry, setAddingEntry] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        fetchWeightEntries();
    }, []);
    const fetchWeightEntries = async () => {
        try {
            setLoading(true);
            const data = await weightAPI.getAll();
            // Sort by date ascending
            const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setEntries(sortedData);
        }
        catch (err) {
            console.error("Failed to fetch weight entries:", err);
            setError("Failed to load weight data. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleAddEntry = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const weightValue = parseFloat(newEntry.weight);
            if (isNaN(weightValue)) {
                throw new Error("Weight must be a valid number");
            }
            await weightAPI.add(weightValue, newEntry.date, newEntry.notes);
            // Reset form and refresh data
            setNewEntry({
                weight: "",
                date: new Date().toISOString().split("T")[0],
                notes: "",
            });
            setAddingEntry(false);
            await fetchWeightEntries();
        }
        catch (err) {
            setError(err.message || "Failed to add weight entry");
        }
        finally {
            setSubmitting(false);
        }
    };
    const getWeightChange = () => {
        if (entries.length < 2)
            return null;
        const oldestWeight = entries[0].weight;
        const latestWeight = entries[entries.length - 1].weight;
        return {
            absolute: latestWeight - oldestWeight,
            percentage: calculateWeightChangePercentage(oldestWeight, latestWeight),
        };
    };
    const weightChange = getWeightChange();
    if (loading) {
        return (_jsx("div", { className: "p-6", children: _jsx("div", { className: "h-64 bg-gray-100 rounded-lg animate-pulse" }) }));
    }
    const chartData = entries.map((entry) => ({
        date: formatDate(entry.date, "MMM d"),
        weight: entry.weight,
    }));
    // Calculate the min and max weight values for the chart
    const minWeight = entries.length > 0
        ? Math.min(...entries.map(e => e.weight)) - 2
        : 0;
    const maxWeight = entries.length > 0
        ? Math.max(...entries.map(e => e.weight)) + 2
        : 100;
    return (_jsxs("div", { className: "p-6 bg-white rounded-xl shadow-sm", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Weight Progress" }), entries.length > 0 && (_jsxs("p", { className: "text-sm text-gray-500 mt-1", children: ["Tracking since ", formatDate(entries[0].date)] }))] }), _jsx(Button, { onClick: () => setAddingEntry(!addingEntry), variant: addingEntry ? "outline" : "default", className: `flex items-center gap-2 ${addingEntry ? "border-red-300 hover:bg-red-50" : "bg-blue-600 text-white hover:bg-blue-700"}`, children: addingEntry ? (_jsxs(_Fragment, { children: [_jsx(X, { size: 16 }), " Cancel"] })) : (_jsxs(_Fragment, { children: [_jsx(Plus, { size: 16 }), " Add Entry"] })) })] }), error && (_jsx("div", { className: "bg-red-50 p-4 rounded-md border border-red-200 mb-6 animate-pulse", children: _jsx("p", { className: "text-red-600 font-medium", children: error }) })), addingEntry && (_jsxs(Card, { className: "mb-6 border-2 border-blue-100 shadow-md overflow-hidden", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-blue-50 to-indigo-50 pb-2", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Plus, { size: 18, className: "text-blue-500" }), "Add Weight Entry"] }) }), _jsx(CardContent, { className: "pt-4", children: _jsxs("form", { onSubmit: handleAddEntry, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "weight", className: "text-sm font-medium text-gray-700", children: "Weight (kg)" }), _jsx(Input, { id: "weight", type: "number", step: "0.1", value: newEntry.weight, onChange: (e) => setNewEntry({ ...newEntry, weight: e.target.value }), required: true, placeholder: "75.5", className: "border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "date", className: "text-sm font-medium text-gray-700", children: "Date" }), _jsx(Input, { id: "date", type: "date", value: newEntry.date, onChange: (e) => setNewEntry({ ...newEntry, date: e.target.value }), required: true, className: "border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "notes", className: "text-sm font-medium text-gray-700", children: "Notes (optional)" }), _jsx(Input, { id: "notes", value: newEntry.notes, onChange: (e) => setNewEntry({ ...newEntry, notes: e.target.value }), placeholder: "Any observations...", className: "border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" })] }), _jsx(Button, { type: "submit", disabled: submitting, className: "bg-blue-600 text-white hover:bg-blue-700 transition-all w-full md:w-auto", children: submitting ? "Saving..." : "Save Entry" })] }) })] })), entries.length === 0 ? (_jsx(Card, { className: "border-dashed border-2 border-gray-200", children: _jsx(CardContent, { className: "py-16", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Plus, { size: 32, className: "text-blue-600" }) }), _jsx("p", { className: "text-gray-500 mb-4 text-lg", children: "No weight entries yet" }), _jsx(Button, { onClick: () => setAddingEntry(true), className: "bg-blue-600 hover:bg-blue-700 transition-all", children: "Add Your First Entry" })] }) }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsx(Card, { className: "bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-md", children: _jsxs(CardContent, { className: "pt-6", children: [_jsx("p", { className: "text-sm text-blue-700 font-medium", children: "Current Weight" }), _jsxs("h3", { className: "text-3xl font-bold mt-1", children: [entries[entries.length - 1].weight, " kg"] }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: ["Last updated: ", formatDate(entries[entries.length - 1].date)] })] }) }), weightChange && (_jsxs(_Fragment, { children: [_jsx(Card, { className: `bg-gradient-to-br ${weightChange.absolute < 0 ? 'from-green-50 to-emerald-50' : 'from-red-50 to-orange-50'} border-none shadow-md`, children: _jsxs(CardContent, { className: "pt-6", children: [_jsx("p", { className: "text-sm font-medium", className: weightChange.absolute < 0 ? "text-green-700" : "text-red-700", children: "Total Change" }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [weightChange.absolute < 0 ? (_jsx(ArrowDown, { size: 20, className: "text-green-500" })) : (_jsx(ArrowUp, { size: 20, className: "text-red-500" })), _jsxs("h3", { className: "text-3xl font-bold", className: weightChange.absolute < 0 ? "text-green-700" : "text-red-700", children: [Math.abs(weightChange.absolute).toFixed(1), " kg"] })] }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: ["Since ", formatDate(entries[0].date)] })] }) }), _jsx(Card, { className: `bg-gradient-to-br ${weightChange.absolute < 0 ? 'from-green-50 to-emerald-50' : 'from-red-50 to-orange-50'} border-none shadow-md`, children: _jsxs(CardContent, { className: "pt-6", children: [_jsx("p", { className: "text-sm font-medium", className: weightChange.absolute < 0 ? "text-green-700" : "text-red-700", children: "Percentage Change" }), _jsxs("h3", { className: "text-3xl font-bold mt-1", className: weightChange.absolute < 0 ? "text-green-700" : "text-red-700", children: [Math.abs(weightChange.percentage), "%"] }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: weightChange.absolute < 0 ? "Weight loss" : "Weight gain" })] }) })] }))] }), _jsxs(Card, { className: "mb-6 shadow-md border border-blue-100 overflow-hidden", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-blue-50 to-indigo-50 pb-2", children: _jsx(CardTitle, { className: "text-lg text-blue-800", children: "Weight Trend" }) }), _jsx(CardContent, { className: "pt-4", children: _jsx("div", { className: "h-72", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: chartData, margin: { top: 5, right: 30, left: 5, bottom: 5 }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "weightColorGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.8 }), _jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0.2 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }), _jsx(XAxis, { dataKey: "date", stroke: "#6b7280", tick: { fill: '#6b7280', fontSize: 12 } }), _jsx(YAxis, { domain: [minWeight, maxWeight], stroke: "#6b7280", tick: { fill: '#6b7280', fontSize: 12 } }), _jsx(Tooltip, { contentStyle: {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                        border: '1px solid #e5e7eb'
                                                    }, labelStyle: { fontWeight: 'bold', color: '#1f2937' }, itemStyle: { color: '#3b82f6' } }), weightChange && weightChange.absolute < 0 && (_jsx(ReferenceLine, { y: entries[entries.length - 1].weight, stroke: "#3b82f6", strokeDasharray: "3 3", strokeWidth: 2 })), _jsx(Line, { type: "monotone", dataKey: "weight", stroke: "#3b82f6", strokeWidth: 3, dot: { r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }, activeDot: { r: 6, fill: "#1d4ed8", strokeWidth: 0 }, animationDuration: 1500, animationEasing: "ease-in-out" })] }) }) }) })] }), _jsxs(Card, { className: "shadow-md border border-blue-100 overflow-hidden", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-blue-50 to-indigo-50 pb-2", children: _jsx(CardTitle, { className: "text-lg text-blue-800", children: "Weight History" }) }), _jsx(CardContent, { className: "pt-0", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-blue-100", children: [_jsx("th", { className: "px-4 py-3 text-left text-blue-800 font-semibold", children: "Date" }), _jsx("th", { className: "px-4 py-3 text-left text-blue-800 font-semibold", children: "Weight (kg)" }), _jsx("th", { className: "px-4 py-3 text-left text-blue-800 font-semibold", children: "Notes" })] }) }), _jsx("tbody", { children: [...entries].reverse().map((entry, index) => (_jsxs("tr", { className: `border-b border-blue-50 ${index % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'} hover:bg-blue-50 transition-colors`, children: [_jsx("td", { className: "px-4 py-3 font-medium", children: formatDate(entry.date) }), _jsx("td", { className: "px-4 py-3", children: entry.weight }), _jsx("td", { className: "px-4 py-3 text-gray-600", children: entry.notes || "-" })] }, entry.id))) })] }) }) })] })] }))] }));
}
