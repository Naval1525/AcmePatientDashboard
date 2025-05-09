// src/pages/Auth.tsx
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Acme Patient Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your weight loss progress and medication shipments</p>
        </div>

        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <SignupForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
}