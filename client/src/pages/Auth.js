import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Auth.tsx
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Acme Patient Dashboard" }), _jsx("p", { className: "mt-2 text-gray-600", children: "Track your weight loss progress and medication shipments" })] }), isLogin ? (_jsx(LoginForm, { onToggleForm: toggleForm })) : (_jsx(SignupForm, { onToggleForm: toggleForm }))] }) }));
}
