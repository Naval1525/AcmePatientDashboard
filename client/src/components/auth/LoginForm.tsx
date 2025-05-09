// src/components/auth/LoginForm.tsx
import { useState } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../context/AuthContext";

interface LoginFormProps {
  onToggleForm: () => void;
}

export default function LoginForm({ onToggleForm }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={onToggleForm}>
          Don't have an account? Sign up
        </Button>
      </CardFooter>
    </Card>
  );
}