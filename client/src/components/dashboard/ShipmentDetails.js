import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// // src/components/dashboard/ShipmentDetails.tsx
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { Shipment } from "../../types/index";
// import { shipmentAPI } from "../../lib/api";
// import { formatDate, getShipmentStatusColor } from "../../lib/utils";
// export default function ShipmentDetails() {
//   const [upcomingShipments, setUpcomingShipments] = useState<Shipment[]>([]);
//   const [pastShipments, setPastShipments] = useState<Shipment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("upcoming");
//   useEffect(() => {
//     fetchShipmentData();
//   }, []);
//   const fetchShipmentData = async () => {
//     try {
//       setLoading(true);
//       const [upcoming, past] = await Promise.all([
//         shipmentAPI.getUpcoming(),
//         shipmentAPI.getPast(),
//       ]);
//       setUpcomingShipments(upcoming);
//       setPastShipments(past);
//     } catch (err) {
//       console.error("Failed to fetch shipment data:", err);
//       setError("Failed to load shipment data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Function to render shipment cards based on array
//   const renderShipmentCards = (shipments: Shipment[]) => {
//     if (shipments.length === 0) {
//       return (
//         <div className="text-center py-8">
//           <p className="text-gray-500">No shipments found</p>
//         </div>
//       );
//     }
//     return shipments.map((shipment) => (
//       <Card key={shipment.id} className="mb-4">
//         <CardContent className="pt-6">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div>
//               <h3 className="font-medium">
//                 Shipment #{shipment.id.substring(0, 8)}
//               </h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 {activeTab === "upcoming"
//                   ? `Expected: ${formatDate(shipment.estimatedDeliveryDate)}`
//                   : `Delivered: ${
//                       shipment.actualDeliveryDate
//                         ? formatDate(shipment.actualDeliveryDate)
//                         : "N/A"
//                     }`}
//               </p>
//               {shipment.trackingNumber && (
//                 <div className="mt-2">
//                   <span className="text-sm font-medium">Tracking:</span>
//                   <span className="text-sm ml-2">{shipment.trackingNumber}</span>
//                 </div>
//               )}
//             </div>
//             <div className="mt-4 md:mt-0">
//               <span
//                 className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getShipmentStatusColor(
//                   shipment.status
//                 )}`}
//               >
//                 {shipment.status.charAt(0).toUpperCase() +
//                   shipment.status.slice(1)}
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     ));
//   };
//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="space-y-4">
//           {[1, 2].map((i) => (
//             <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-50 p-4 rounded-md border border-red-200">
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Medication Shipments</h2>
//       <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
//         <TabsList className="mb-6">
//           <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//           <TabsTrigger value="past">Past Shipments</TabsTrigger>
//         </TabsList>
//         <TabsContent value="upcoming">
//           {renderShipmentCards(upcomingShipments)}
//         </TabsContent>
//         <TabsContent value="past">
//           {renderShipmentCards(pastShipments)}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
// src/components/dashboard/ShipmentDetails.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { shipmentAPI } from "../../lib/api";
import { formatDate } from "../../lib/utils";
import { Package, Truck, CheckCircle, Clock, AlertTriangle, Calendar, MapPin, Search } from "lucide-react";
export default function ShipmentDetails() {
    const [upcomingShipments, setUpcomingShipments] = useState([]);
    const [pastShipments, setPastShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("upcoming");
    useEffect(() => {
        fetchShipmentData();
    }, []);
    const fetchShipmentData = async () => {
        try {
            setLoading(true);
            const [upcoming, past] = await Promise.all([
                shipmentAPI.getUpcoming(),
                shipmentAPI.getPast(),
            ]);
            setUpcomingShipments(upcoming);
            setPastShipments(past);
        }
        catch (err) {
            console.error("Failed to fetch shipment data:", err);
            setError("Failed to load shipment data. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    };
    // Get icon based on shipment status
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return _jsx(Clock, { size: 18, className: "text-yellow-500" });
            case 'shipped':
                return _jsx(Truck, { size: 18, className: "text-blue-500" });
            case 'delivered':
                return _jsx(CheckCircle, { size: 18, className: "text-green-500" });
            case 'delayed':
                return _jsx(AlertTriangle, { size: 18, className: "text-orange-500" });
            default:
                return _jsx(Package, { size: 18, className: "text-gray-500" });
        }
    };
    // Get background and text colors based on status
    const getStatusColors = (status) => {
        const statusLower = status.toLowerCase();
        if (statusLower === 'processing')
            return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
        if (statusLower === 'shipped')
            return { bg: 'bg-blue-100', text: 'text-blue-800' };
        if (statusLower === 'delivered')
            return { bg: 'bg-green-100', text: 'text-green-800' };
        if (statusLower === 'delayed')
            return { bg: 'bg-orange-100', text: 'text-orange-800' };
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    };
    // Function to render shipment cards based on array
    const renderShipmentCards = (shipments) => {
        if (shipments.length === 0) {
            return (_jsxs("div", { className: "text-center py-12", children: [_jsx(Package, { size: 48, className: "mx-auto text-gray-300 mb-4" }), _jsxs("p", { className: "text-gray-500 text-lg", children: ["No ", activeTab === "upcoming" ? "upcoming" : "past", " shipments found"] })] }));
        }
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: shipments.map((shipment) => {
                const statusColors = getStatusColors(shipment.status);
                return (_jsxs(Card, { className: "overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300", children: [_jsx("div", { className: `h-2 ${statusColors.bg}` }), _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("h3", { className: "font-bold text-gray-800 flex items-center gap-2", children: [_jsx(Package, { size: 18, className: "text-indigo-500" }), "Shipment #", shipment.id.substring(0, 8)] }), _jsxs("div", { className: "flex items-center gap-1 mt-1.5 text-gray-500", children: [_jsx(Calendar, { size: 14 }), _jsx("p", { className: "text-sm", children: activeTab === "upcoming"
                                                                ? `Expected: ${formatDate(shipment.estimatedDeliveryDate)}`
                                                                : `Delivered: ${shipment.actualDeliveryDate
                                                                    ? formatDate(shipment.actualDeliveryDate)
                                                                    : "N/A"}` })] })] }), _jsx("div", { children: _jsxs("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} gap-1.5`, children: [getStatusIcon(shipment.status), shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)] }) })] }), shipment.trackingNumber && (_jsx("div", { className: "mt-4 p-3 bg-gray-50 rounded-lg", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Search, { size: 14, className: "text-gray-500" }), _jsx("span", { className: "text-xs font-medium text-gray-500", children: "TRACKING NUMBER" })] }), _jsx("span", { className: "text-sm font-mono", children: shipment.trackingNumber })] }) })), _jsx("div", { className: "mt-4 pt-3 border-t border-gray-100", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { size: 16, className: "text-gray-500" }), _jsx("span", { className: "text-gray-500 text-sm", children: shipment.status.toLowerCase() === 'delivered'
                                                    ? 'Delivered to your address'
                                                    : activeTab === "upcoming" ? 'Will be delivered to your address' : 'Was being delivered to your address' })] }) })] })] }, shipment.id));
            }) }));
    };
    if (loading) {
        return (_jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 bg-gray-100 animate-pulse h-8 w-64 rounded-md" }), _jsx("div", { className: "bg-gray-100 h-10 w-48 rounded-md mb-6 animate-pulse" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2].map((i) => (_jsx("div", { className: "h-40 bg-gray-100 rounded-xl animate-pulse" }, i))) })] }));
    }
    if (error) {
        return (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "bg-red-50 p-6 rounded-lg border border-red-200 flex flex-col items-center text-center", children: [_jsx(AlertTriangle, { size: 48, className: "text-red-500 mb-4" }), _jsx("p", { className: "text-red-600 font-medium text-lg mb-1", children: "Oops! Something went wrong" }), _jsx("p", { className: "text-red-600", children: error })] }) }));
    }
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("h2", { className: "text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text flex items-center gap-2", children: [_jsx(Truck, { size: 28, className: "text-indigo-500" }), "Medication Shipments"] }), _jsx("p", { className: "text-gray-600 mt-1 ml-1", children: "Track your medication deliveries and shipment history" })] }), _jsxs(Card, { className: "border-0 shadow-md overflow-hidden mb-6", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-indigo-50 to-purple-50 pb-2", children: _jsx(CardTitle, { className: "text-lg text-indigo-800", children: "Delivery Status" }) }), _jsx(CardContent, { className: "p-0", children: _jsxs(Tabs, { defaultValue: "upcoming", onValueChange: setActiveTab, className: "w-full", children: [_jsx("div", { className: "border-b border-gray-200", children: _jsxs(TabsList, { className: "bg-transparent h-auto p-0", children: [_jsxs(TabsTrigger, { value: "upcoming", className: `data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-700 data-[state=active]:font-medium data-[state=active]:shadow-none data-[state=active]:bg-transparent px-6 py-3 rounded-none text-gray-600`, children: ["Upcoming Shipments", upcomingShipments.length > 0 && (_jsx("span", { className: "ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full", children: upcomingShipments.length }))] }), _jsxs(TabsTrigger, { value: "past", className: `data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-700 data-[state=active]:font-medium data-[state=active]:shadow-none data-[state=active]:bg-transparent px-6 py-3 rounded-none text-gray-600`, children: ["Past Shipments", pastShipments.length > 0 && (_jsx("span", { className: "ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full", children: pastShipments.length }))] })] }) }), _jsxs("div", { className: "p-6", children: [_jsx(TabsContent, { value: "upcoming", className: "m-0", children: renderShipmentCards(upcomingShipments) }), _jsx(TabsContent, { value: "past", className: "m-0", children: renderShipmentCards(pastShipments) })] })] }) })] }), _jsxs(Card, { className: "border-0 shadow-md overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg text-indigo-800", children: "Shipping Information" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium text-indigo-800 mb-2", children: "How Shipments Work" }), _jsxs("ul", { className: "space-y-2 text-gray-700", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx(CheckCircle, { size: 14, className: "text-green-500" }) }), _jsx("span", { children: "All shipments are processed within 24-48 hours" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx(CheckCircle, { size: 14, className: "text-green-500" }) }), _jsx("span", { children: "Medications are shipped in discreet packaging" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx(CheckCircle, { size: 14, className: "text-green-500" }) }), _jsx("span", { children: "Tracking information is provided via email" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx(CheckCircle, { size: 14, className: "text-green-500" }) }), _jsx("span", { children: "Temperature-controlled shipping for medication stability" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-indigo-800 mb-2", children: "Shipping Policies" }), _jsxs("ul", { className: "space-y-2 text-gray-700", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx(Clock, { size: 14, className: "text-blue-500" }) }), _jsx("span", { children: "Standard delivery takes 2-5 business days" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx(AlertTriangle, { size: 14, className: "text-yellow-500" }) }), _jsx("span", { children: "Contact support if your shipment is more than 2 days late" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx(MapPin, { size: 14, className: "text-red-500" }) }), _jsx("span", { children: "Residential address required for delivery" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx(Package, { size: 14, className: "text-purple-500" }) }), _jsx("span", { children: "Automatic refills ship 7 days before you run out" })] })] })] })] }) })] })] }));
}
