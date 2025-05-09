import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// // src/components/auth/LoginForm.tsx
// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useAuth } from "../../context/AuthContext";
// interface LoginFormProps {
//   onToggleForm: () => void;
// }
// export default function LoginForm({ onToggleForm }: LoginFormProps) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { login } = useAuth();
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsSubmitting(true);
//     try {
//       await login(email, password);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl">Login</CardTitle>
//         <CardDescription>
//           Enter your credentials to access your dashboard
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label htmlFor="email" className="text-sm font-medium">
//               Email
//             </label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="your@email.com"
//             />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="password" className="text-sm font-medium">
//               Password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="••••••••"
//             />
//           </div>
//           {error && <p className="text-sm text-red-500">{error}</p>}
//           <Button
//             type="submit"
//             className="w-full"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Logging in..." : "Login"}
//           </Button>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-center">
//         <Button variant="link" onClick={onToggleForm}>
//           Don't have an account? Sign up
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
export default function LoginForm({ onToggleForm }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await login(email, password);
        }
        catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (_jsxs(Card, { className: "w-full max-w-md mx-auto shadow-lg border-0", children: [_jsxs(CardHeader, { className: "space-y-1 text-center pb-4 border-b", children: [_jsx(CardTitle, { className: "text-2xl font-bold", children: "Welcome Back" }), _jsx(CardDescription, { className: "text-gray-500", children: "Enter your credentials to access your dashboard" })] }), _jsx(CardContent, { className: "pt-6", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [error && (_jsxs(Alert, { variant: "destructive", className: "bg-red-50 text-red-800 border border-red-200", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: error })] })), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }), _jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "your@email.com", className: "pl-10 bg-gray-50 border-gray-200 focus:bg-white" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsx(Button, { variant: "link", type: "button", className: "text-xs text-blue-600 p-0 h-auto font-medium", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }), _jsx(Input, { id: "password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white" }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600", onClick: togglePasswordVisibility, children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4" })) : (_jsx(Eye, { className: "h-4 w-4" })) })] })] }), _jsx(Button, { type: "submit", className: "w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors", disabled: isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Signing in..."] })) : ("Sign In") })] }) }), _jsx(CardFooter, { className: "flex justify-center border-t pt-4", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["Don't have an account?", " ", _jsx(Button, { variant: "link", onClick: onToggleForm, className: "p-0 h-auto font-medium text-blue-600", children: "Create account" })] }) })] }));
}
