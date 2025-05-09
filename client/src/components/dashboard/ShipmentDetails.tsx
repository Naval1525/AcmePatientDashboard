
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
import { Shipment } from "../../types/index";
import { shipmentAPI } from "../../lib/api";
import { formatDate, getShipmentStatusColor } from "../../lib/utils";
import { Package, Truck, CheckCircle, Clock, AlertTriangle, Calendar, MapPin, Search } from "lucide-react";

export default function ShipmentDetails() {
  const [upcomingShipments, setUpcomingShipments] = useState<Shipment[]>([]);
  const [pastShipments, setPastShipments] = useState<Shipment[]>([]);
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
    } catch (err) {
      console.error("Failed to fetch shipment data:", err);
      setError("Failed to load shipment data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Get icon based on shipment status
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Clock size={18} className="text-yellow-500" />;
      case 'shipped':
        return <Truck size={18} className="text-blue-500" />;
      case 'delivered':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'delayed':
        return <AlertTriangle size={18} className="text-orange-500" />;
      default:
        return <Package size={18} className="text-gray-500" />;
    }
  };

  // Get background and text colors based on status
  const getStatusColors = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'processing') return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    if (statusLower === 'shipped') return { bg: 'bg-blue-100', text: 'text-blue-800' };
    if (statusLower === 'delivered') return { bg: 'bg-green-100', text: 'text-green-800' };
    if (statusLower === 'delayed') return { bg: 'bg-orange-100', text: 'text-orange-800' };
    return { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  // Function to render shipment cards based on array
  const renderShipmentCards = (shipments: Shipment[]) => {
    if (shipments.length === 0) {
      return (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No {activeTab === "upcoming" ? "upcoming" : "past"} shipments found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shipments.map((shipment) => {
          const statusColors = getStatusColors(shipment.status);

          return (
            <Card
              key={shipment.id}
              className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className={`h-2 ${statusColors.bg}`}></div>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <Package size={18} className="text-indigo-500" />
                      Shipment #{shipment.id.substring(0, 8)}
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5 text-gray-500">
                      <Calendar size={14} />
                      <p className="text-sm">
                        {activeTab === "upcoming"
                          ? `Expected: ${formatDate(shipment.estimatedDeliveryDate)}`
                          : `Delivered: ${
                              shipment.actualDeliveryDate
                                ? formatDate(shipment.actualDeliveryDate)
                                : "N/A"
                            }`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} gap-1.5`}
                    >
                      {getStatusIcon(shipment.status)}
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                    </span>
                  </div>
                </div>

                {shipment.trackingNumber && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Search size={14} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">TRACKING NUMBER</span>
                      </div>
                      <span className="text-sm font-mono">{shipment.trackingNumber}</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-gray-500 text-sm">
                      {shipment.status.toLowerCase() === 'delivered'
                        ? 'Delivered to your address'
                        : activeTab === "upcoming" ? 'Will be delivered to your address' : 'Was being delivered to your address'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gray-100 animate-pulse h-8 w-64 rounded-md"></h2>
        <div className="bg-gray-100 h-10 w-48 rounded-md mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 flex flex-col items-center text-center">
          <AlertTriangle size={48} className="text-red-500 mb-4" />
          <p className="text-red-600 font-medium text-lg mb-1">Oops! Something went wrong</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text flex items-center gap-2">
          <Truck size={28} className="text-indigo-500" />
          Medication Shipments
        </h2>
        <p className="text-gray-600 mt-1 ml-1">Track your medication deliveries and shipment history</p>
      </div>

      <Card className="border-0 shadow-md overflow-hidden mb-6">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-2">
          <CardTitle className="text-lg text-indigo-800">Delivery Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs
            defaultValue="upcoming"
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b border-gray-200">
              <TabsList className="bg-transparent h-auto p-0">
                <TabsTrigger
                  value="upcoming"
                  className={`data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-700 data-[state=active]:font-medium data-[state=active]:shadow-none data-[state=active]:bg-transparent px-6 py-3 rounded-none text-gray-600`}
                >
                  Upcoming Shipments
                  {upcomingShipments.length > 0 && (
                    <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {upcomingShipments.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className={`data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-700 data-[state=active]:font-medium data-[state=active]:shadow-none data-[state=active]:bg-transparent px-6 py-3 rounded-none text-gray-600`}
                >
                  Past Shipments
                  {pastShipments.length > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      {pastShipments.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="upcoming" className="m-0">
                {renderShipmentCards(upcomingShipments)}
              </TabsContent>

              <TabsContent value="past" className="m-0">
                {renderShipmentCards(pastShipments)}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Shipping Info Card */}
      <Card className="border-0 shadow-md overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-indigo-800">Shipping Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-indigo-800 mb-2">How Shipments Work</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle size={14} className="text-green-500" />
                  </div>
                  <span>All shipments are processed within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle size={14} className="text-green-500" />
                  </div>
                  <span>Medications are shipped in discreet packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle size={14} className="text-green-500" />
                  </div>
                  <span>Tracking information is provided via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle size={14} className="text-green-500" />
                  </div>
                  <span>Temperature-controlled shipping for medication stability</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-indigo-800 mb-2">Shipping Policies</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <Clock size={14} className="text-blue-500" />
                  </div>
                  <span>Standard delivery takes 2-5 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <AlertTriangle size={14} className="text-yellow-500" />
                  </div>
                  <span>Contact support if your shipment is more than 2 days late</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <MapPin size={14} className="text-red-500" />
                  </div>
                  <span>Residential address required for delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <Package size={14} className="text-purple-500" />
                  </div>
                  <span>Automatic refills ship 7 days before you run out</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}