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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Acme Patient
            <span className="text-blue-600"> Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="hidden md:flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-full p-1 px-2 transition-colors">
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn alt={user?.name}" />
                      <AvatarFallback className="bg-blue-100 text-blue-800">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden md:inline-block text-gray-700">
                      {user?.name}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
