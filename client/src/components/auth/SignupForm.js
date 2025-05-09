import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/auth/SignupForm.tsx
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useAuth } from "../../context/AuthContext";
export default function SignupForm({ onToggleForm }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signup } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setIsSubmitting(true);
        try {
            await signup(email, password, name);
        }
        catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs(Card, { className: "w-full max-w-md mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-2xl", children: "Create an Account" }), _jsx(CardDescription, { children: "Register to access the patient dashboard" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "name", className: "text-sm font-medium", children: "Full Name" }), _jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), required: true, placeholder: "John Doe" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-medium", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "your@email.com" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", minLength: 6 })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "confirmPassword", className: "text-sm font-medium", children: "Confirm Password" }), _jsx(Input, { id: "confirmPassword", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), error && _jsx("p", { className: "text-sm text-red-500", children: error }), _jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Creating account..." : "Sign Up" })] }) }), _jsx(CardFooter, { className: "flex justify-center", children: _jsx(Button, { variant: "link", onClick: onToggleForm, children: "Already have an account? Log in" }) })] }));
}
