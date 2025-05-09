import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// // src/components/layout/Sidebar.tsx
// import { NavLink } from "react-router-dom";
// import { cn } from "../../lib/utils";
// export default function Sidebar() {
//   const links = [
//     {
//       name: "Dashboard",
//       path: "/dashboard",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//         </svg>
//       ),
//     },
//     {
//       name: "Weight Progress",
//       path: "/dashboard/weight",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z"
//             clipRule="evenodd"
//           />
//         </svg>
//       ),
//     },
//     {
//       name: "Shipments",
//       path: "/dashboard/shipments",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
//           <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
//         </svg>
//       ),
//     },
//   ];
//   return (
//     <aside className="w-64 bg-white h-screen border-r border-gray-200">
//       <nav className="p-4 space-y-1">
//         {links.map((link) => (
//           <NavLink
//             key={link.path}
//             to={link.path}
//             className={({ isActive }) =>
//               cn(
//                 "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
//                 isActive
//                   ? "bg-gray-100 text-gray-900 font-medium"
//                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               )
//             }
//           >
//             {link.icon}
//             <span>{link.name}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// }
// src/components/layout/Sidebar.tsx
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, TrendingUp, Package, Calendar, Settings, MessageSquare, FileText, Users, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
export default function Sidebar() {
    const { user } = useAuth();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const mainLinks = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: _jsx(LayoutDashboard, { className: "h-5 w-5" }),
        },
        {
            name: "Weight Progress",
            path: "/dashboard/weight",
            icon: _jsx(TrendingUp, { className: "h-5 w-5" }),
        },
        {
            name: "Shipments",
            path: "/dashboard/shipments",
            icon: _jsx(Package, { className: "h-5 w-5" }),
        },
        {
            name: "Appointments",
            path: "/dashboard/appointments",
            icon: _jsx(Calendar, { className: "h-5 w-5" }),
        },
    ];
    const secondaryLinks = [
        {
            name: "Messages",
            path: "/dashboard/messages",
            icon: _jsx(MessageSquare, { className: "h-5 w-5" }),
            badge: 3,
        },
        {
            name: "Documents",
            path: "/dashboard/documents",
            icon: _jsx(FileText, { className: "h-5 w-5" }),
        },
        {
            name: "Support",
            path: "/dashboard/support",
            icon: _jsx(Users, { className: "h-5 w-5" }),
        },
        {
            name: "Settings",
            path: "/dashboard/settings",
            icon: _jsx(Settings, { className: "h-5 w-5" }),
        },
    ];
    return (_jsxs("aside", { className: cn("bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out flex flex-col overflow-hidden", collapsed ? "w-20" : "w-64"), children: [_jsx("div", { className: "absolute -right-3 top-20", children: _jsx(Button, { variant: "outline", size: "icon", className: "h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm", onClick: () => setCollapsed(!collapsed), children: collapsed ? (_jsx(ChevronRightIcon, { className: "h-3 w-3" })) : (_jsx(ChevronLeft, { className: "h-3 w-3" })) }) }), user && !collapsed && (_jsx("div", { className: "p-4 border-b border-gray-200", children: _jsx("div", { className: "flex items-center gap-3", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium text-sm", children: user?.name }), _jsx("span", { className: "text-xs text-gray-500", children: user?.email })] }) }) })), _jsx("div", { className: "flex-1 overflow-y-auto py-4", children: _jsxs("div", { className: cn("space-y-1 px-3", collapsed && "flex flex-col items-center px-0"), children: [_jsx("div", { className: cn("mb-4", collapsed ? "text-center" : "px-3"), children: _jsx("h2", { className: cn("text-xs font-semibold text-gray-500 uppercase tracking-wider", collapsed && "hidden"), children: "Main" }) }), mainLinks.map((link) => (_jsxs(NavLink, { to: link.path, className: ({ isActive }) => cn("flex items-center gap-3 px-3 py-2 rounded-md transition-colors", isActive
                                ? "bg-blue-50 text-blue-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900", collapsed && "justify-center px-0"), title: collapsed ? link.name : undefined, children: [_jsx("div", { className: cn("flex items-center justify-center", isActive(link.path) && "text-blue-600"), children: link.icon }), !collapsed && _jsx("span", { children: link.name })] }, link.path))), _jsx("div", { className: cn("mt-8 mb-4", collapsed ? "text-center" : "px-3"), children: _jsx("h2", { className: cn("text-xs font-semibold text-gray-500 uppercase tracking-wider", collapsed && "hidden"), children: "More" }) }), secondaryLinks.map((link) => (_jsxs(NavLink, { to: link.path, className: ({ isActive }) => cn("flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative", isActive
                                ? "bg-blue-50 text-blue-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900", collapsed && "justify-center px-0"), title: collapsed ? link.name : undefined, children: [_jsx("div", { className: cn("flex items-center justify-center", isActive(link.path) && "text-blue-600"), children: link.icon }), !collapsed && _jsx("span", { children: link.name }), link.badge && (_jsx("span", { className: cn("absolute flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-blue-600 rounded-full", collapsed ? "top-0 right-0" : "right-3"), children: link.badge }))] }, link.path)))] }) }), _jsx("div", { className: cn("p-4 border-t border-gray-200", collapsed ? "flex justify-center" : ""), children: _jsx("div", { className: cn("p-2 rounded-md bg-blue-50 text-blue-700", collapsed ? "w-10 h-10 flex items-center justify-center" : "p-3"), children: collapsed ? (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }) })) : (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium", children: "Need help?" }), _jsx("div", { className: "text-xs", children: "Contact support" })] })] })) }) })] }));
}
// Helper function to determine if route is active
function isActive(path) {
    const location = useLocation();
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
}
