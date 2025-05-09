// // // src/components/dashboard/DashboardOverview.tsx
// // import { useState, useEffect } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// // import { Progress } from "../ui/progress";
// // import { DashboardOverview as DashboardOverviewType } from "../../types/index";
// // import { dashboardAPI } from "../../lib/api";
// // import { formatDate, getBMICategory } from "../../lib/utils";


// // export default function DashboardOverview() {
// //   const [loading, setLoading] = useState(true);
// //   const [data, setData] = useState<DashboardOverviewType | null>(null);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const overview = await dashboardAPI.getOverview();
// //         setData(overview);
// //       } catch (err) {
// //         console.error("Failed to fetch dashboard data:", err);
// //         setError("Failed to load dashboard data. Please try again later.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="p-6">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-pulse">
// //           {[1, 2, 3, 4].map((i) => (
// //             <div key={i} className="bg-gray-100 h-32 rounded-lg"></div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-6">
// //         <div className="bg-red-50 p-4 rounded-md border border-red-200">
// //           <p className="text-red-600">{error}</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!data) return null;

// //   // Calculate progress percentage if goal is available
// //   const progressPercentage = data.weightGoal
// //     ? Math.min(
// //         100,
// //         Math.max(
// //           0,
// //           ((data.currentWeight - data.weightGoal) / data.weightGoal) * 100
// //         )
// //       )
// //     : 0;

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //         {/* Current Weight Card */}
// //         <Card>
// //           <CardHeader className="pb-2">
// //             <CardTitle className="text-lg">BMI</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="flex items-baseline">
// //               <span className="text-3xl font-bold">{data.bmi.toFixed(1)}</span>
// //             </div>
// //             <div className="mt-2">
// //               <span className="text-sm">{getBMICategory(data.bmi)}</span>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Medication Card */}
// //         <Card>
// //           <CardHeader className="pb-2">
// //             <CardTitle className="text-lg">Current Medication</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-2">
// //               <div>
// //                 <span className="font-medium">{data.currentMedication?.name}</span>
// //               </div>
// //               <div className="text-sm text-gray-600">
// //                 <p>{data.currentMedication?.dosage}</p>
// //                 <p className="mt-1">{data.currentMedication?.instructions}</p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Next Shipment Card */}
// //         <Card>
// //           <CardHeader className="pb-2">
// //             <CardTitle className="text-lg">Next Shipment</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             {data?.nextShipmentDate ? (
// //               <>
// //                 <div className="text-lg font-medium">
// //                   {formatDate(data?.nextShipmentDate)}
// //                 </div>
// //                 <div className="mt-2">
// //                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
// //                     {data?.nextShipmentStatus}
// //                   </span>
// //                 </div>
// //               </>
// //             ) : (
// //               <p className="text-gray-500">No upcoming shipments</p>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Weight Goal Progress */}
// //       {data.weightGoal && (
// //         <Card className="mb-6">
// //           <CardHeader className="pb-2">
// //             <CardTitle className="text-lg">Weight Goal Progress</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-2">
// //               <div className="flex justify-between items-center text-sm">
// //                 <span>Current: {data.currentWeight} kg</span>
// //                 <span>Goal: {data.weightGoal} kg</span>
// //               </div>
// //               <Progress value={100 - progressPercentage} />
// //             </div>
// //           </CardContent>
// //         </Card>
// //       )}
// //     </div>
// //   );
// // }
// // src/components/dashboard/DashboardOverview.tsx

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Progress } from "../ui/progress";
// import { dashboardAPI } from "../../lib/api";
// import { formatDate, getBMICategory } from "../../lib/utils";
// import { DashboardOverview as DashboardOverviewType } from "../../types";

// export default function DashboardOverview() {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<DashboardOverviewType | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await dashboardAPI.getOverview();
//         setData(response);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (!data) return <p>No data found</p>;

//   const { user, currentWeight, weightLoss, weightLossPercentage, bmi, nextShipment } = data;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {/* Weight Overview */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader className="bg-blue-500 text-white rounded-t-lg">
//           <CardTitle className="text-lg font-bold">Weight Overview</CardTitle>
//         </CardHeader>
//         <CardContent className="p-4 space-y-3">
//           <div className="text-sm text-gray-600">Name: <span className="font-semibold">{user.firstName} {user.lastName}</span></div>
//           <div className="text-sm text-gray-600">Current Weight: <span className="font-semibold">{currentWeight} kg</span></div>
//           <div className="text-sm text-gray-600">Target Weight: <span className="font-semibold">{user.targetWeight} kg</span></div>
//           <div className="text-sm text-gray-600">Weight Lost: <span className="font-semibold">{weightLoss} kg</span></div>
//           <div className="mt-2">
//             <p className="text-sm text-gray-500">Weight Loss Progress ({weightLossPercentage}%)</p>
//             <Progress
//               value={weightLossPercentage}
//               className={`transition-all ${weightLossPercentage < 50 ? 'bg-red-400' : 'bg-green-400'}`}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* BMI Info */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader className="bg-green-500 text-white rounded-t-lg">
//           <CardTitle className="text-lg font-bold">BMI</CardTitle>
//         </CardHeader>
//         <CardContent className="p-4 space-y-3">
//           <div className="text-sm text-gray-600">BMI: <span className="font-semibold">{bmi.toFixed(1)}</span></div>
//           <div className="text-sm text-gray-600">Category: <span className="font-semibold">{getBMICategory(bmi)}</span></div>
//         </CardContent>
//       </Card>

//       {/* Next Shipment Info */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
//         <CardHeader className="bg-indigo-500 text-white rounded-t-lg">
//           <CardTitle className="text-lg font-bold">Next Shipment</CardTitle>
//         </CardHeader>
//         <CardContent className="p-4 space-y-3">
//           <div className="text-sm text-gray-600">Status: <span className="font-semibold">{nextShipment.status}</span></div>
//           <div className="text-sm text-gray-600">Medication: <span className="font-semibold">{nextShipment.medicationType}</span></div>
//           <div className="text-sm text-gray-600">Dosage: <span className="font-semibold">{nextShipment.dosage}</span></div>
//           <div className="text-sm text-gray-600">Tracking #: <span className="font-semibold">{nextShipment.trackingNumber}</span></div>
//           <div className="text-sm text-gray-600">
//             Expected Delivery: <span className="font-semibold">{formatDate(nextShipment.expectedDate)}</span>
//           </div>
//           {nextShipment.deliveredDate && (
//             <div className="text-sm text-gray-600">
//               Delivered on: <span className="font-semibold">{formatDate(nextShipment.deliveredDate)}</span>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// src/components/dashboard/DashboardOverview.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { dashboardAPI } from "../../lib/api";
import { formatDate, getBMICategory } from "../../lib/utils";
import { DashboardOverview as DashboardOverviewType } from "../../types";
import { Activity, TrendingDown, Package, Target, Calendar, Award, AlertCircle } from "lucide-react";

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardOverviewType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await dashboardAPI.getOverview();
        setData(response);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gray-100 animate-pulse h-8 rounded-md w-64"></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-64 rounded-xl animate-pulse shadow"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Dashboard Data</h3>
        <p className="text-gray-600">Unable to load your dashboard information</p>
      </div>
    );
  }

  const { user, currentWeight, weightLoss, weightLossPercentage, bmi, nextShipment } = data;

  // Calculate BMI color based on category
  const getBmiColors = (bmiValue: number) => {
    if (bmiValue < 18.5) return { bg: 'bg-blue-100', text: 'text-blue-700', ring: 'ring-blue-400' }; // Underweight
    if (bmiValue < 25) return { bg: 'bg-green-100', text: 'text-green-700', ring: 'ring-green-400' }; // Normal
    if (bmiValue < 30) return { bg: 'bg-yellow-100', text: 'text-yellow-700', ring: 'ring-yellow-400' }; // Overweight
    return { bg: 'bg-red-100', text: 'text-red-700', ring: 'ring-red-400' }; // Obese
  };

  const bmiColors = getBmiColors(bmi);

  // Determine progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Format delivery date info
  const getDeliveryInfo = () => {
    const today = new Date();
    const deliveryDate = new Date(nextShipment.expectedDate);
    const diffDays = Math.ceil((deliveryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today!";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 3) return `In ${diffDays} days`;
    return formatDate(nextShipment.expectedDate);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
          Welcome, {user.firstName}!
        </h2>
        <p className="text-gray-600 mt-1">Here's your health journey at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weight Overview Card */}
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="border-b border-purple-100 pb-2 pt-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-purple-800">
              <Activity size={20} className="text-purple-600" />
              Weight Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Current</span>
                <span className="text-xl font-bold text-gray-800">{currentWeight} kg</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Target</span>
                <span className="text-xl font-bold text-gray-800">{user.targetWeight} kg</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <TrendingDown size={16} className="text-green-600" />
                  <span className="text-gray-600 font-medium">Progress</span>
                </div>
                <span className="text-xl font-bold text-green-600">-{weightLoss} kg</span>
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">Weight Loss Goal</span>
                  <span className="text-sm font-semibold">{weightLossPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(weightLossPercentage)} transition-all duration-500`}
                    style={{ width: `${weightLossPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BMI Card */}
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader className="border-b border-green-100 pb-2 pt-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-green-800">
              <Target size={20} className="text-green-600" />
              BMI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col items-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${bmiColors.bg} mb-3 ring-4 ${bmiColors.ring} ring-opacity-50`}>
                <span className={`text-4xl ${bmiColors.text} font-bold`}>{bmi.toFixed(1)}</span>
              </div>

              <div className="text-center">
                <h3 className={`font-bold text-xl ${bmiColors.text}`}>
                  {getBMICategory(bmi)}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {bmi < 18.5 && "Consider nutritional counseling to gain healthy weight"}
                  {bmi >= 18.5 && bmi < 25 && "Excellent! Maintain your healthy lifestyle"}
                  {bmi >= 25 && bmi < 30 && "Consider moderate changes to diet and exercise"}
                  {bmi >= 30 && "Speak with your healthcare provider about weight loss strategies"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Shipment Card */}
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="border-b border-blue-100 pb-2 pt-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-blue-800">
              <Package size={20} className="text-blue-600" />
              Medication Shipment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  nextShipment.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  nextShipment.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  nextShipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {nextShipment.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Medication</span>
                <span className="font-semibold">{nextShipment.medicationType}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Dosage</span>
                <span className="font-semibold">{nextShipment.dosage}</span>
              </div>

              <div className="border-t border-blue-100 pt-3 mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-blue-600" />
                    <span className="text-gray-600">Delivery</span>
                  </div>
                  <span className="font-bold text-blue-700">{getDeliveryInfo()}</span>
                </div>

                {nextShipment.trackingNumber && (
                  <div className="mt-2 pt-2 border-t border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Tracking #</span>
                      <span className="text-sm font-mono bg-blue-50 px-2 py-0.5 rounded">
                        {nextShipment.trackingNumber}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Card */}
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50 sm:col-span-2 lg:col-span-3">
          <CardHeader className="border-b border-amber-100 pb-2 pt-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-amber-800">
              <Award size={20} className="text-amber-600" />
              Your Health Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex flex-col items-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-amber-700">{weightLoss}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">kg lost</span>
              </div>

                              <div className="flex flex-col items-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-green-700">{weightLossPercentage}%</span>
                </div>
                <span className="text-sm font-medium text-gray-700">of goal</span>
              </div>

              <div className="flex flex-col items-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-blue-700">{bmi.toFixed(1)}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">current BMI</span>
              </div>

              <div className="flex flex-col items-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-purple-700">{user.targetWeight}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">target kg</span>
              </div>

              <div className="flex flex-col items-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-indigo-700">{currentWeight - user.targetWeight}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">kg to go</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )}