import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// // src/components/layout/Navbar.tsx
// import { useAuth } from "../../context/AuthContext";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Button } from "../ui/button";
// export default function Navbar() {
//   const { user, logout } = useAuth();
//   return (
//     <header className="bg-white border-b border-gray-200">
//       <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center">
//           <h1 className="text-xl font-bold text-gray-900">Acme Patient Dashboard</h1>
//         </div>
//         <div className="flex items-center gap-4">
//           {user && (
//             <>
//               <div className="flex items-center gap-2">
//                 <Avatar>
//                   <AvatarFallback>
//                     {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//                 <span className="text-sm font-medium hidden md:inline-block">
//                   {user?.name}
//                 </span>
//               </div>
//               <Button variant="outline" size="sm" onClick={logout}>
//                 Logout
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
// src/components/layout/Navbar.tsx
import { useAuth } from "../../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Bell, Settings, HelpCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "../ui/dropdown-menu";
export default function Navbar() {
    const { user, logout } = useAuth();
    return (_jsx("header", { className: "sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm", children: _jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-white", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z", clipRule: "evenodd" }) }) }), _jsxs("h1", { className: "text-xl font-bold text-gray-900 tracking-tight", children: ["Acme Patient", _jsx("span", { className: "text-blue-600", children: " Dashboard" })] })] }), _jsx("div", { className: "flex items-center gap-4", children: user && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "hidden md:flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "text-gray-500 hover:text-gray-900", children: _jsx(HelpCircle, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-gray-500 hover:text-gray-900", children: _jsx(Bell, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-gray-500 hover:text-gray-900", children: _jsx(Settings, { className: "h-5 w-5" }) })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs("div", { className: "flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-full p-1 px-2 transition-colors", children: [_jsxs(Avatar, { className: "h-8 w-8 border border-gray-200", children: [_jsx(AvatarImage, { src: "https://github.com/shadcn.png", alt: "@shadcn alt={user?.name}" }), _jsx(AvatarFallback, { className: "bg-blue-100 text-blue-800", children: user?.name
                                                                ?.split(" ")
                                                                .map((n) => n[0])
                                                                .join("")
                                                                .toUpperCase() })] }), _jsx("span", { className: "text-sm font-medium hidden md:inline-block text-gray-700", children: user?.name })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Profile Settings" })] }), _jsxs(DropdownMenuItem, { children: [_jsx(Bell, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Notifications" })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: logout, className: "text-red-600 focus:text-red-600", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "mr-2 h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z", clipRule: "evenodd" }) }), _jsx("span", { children: "Logout" })] })] })] })] })) })] }) }));
}
