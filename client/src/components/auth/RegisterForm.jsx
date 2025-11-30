// src/components/auth/RegisterForm.jsx
import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";
import API from "../../utils/api";      
import { useAuth } from "../../hooks/useAuth";  
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const { isloading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirm) {
        toast.error("Passwords do not match");
        return;
      }

      const res = await API.post(
        "/auth/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("RESPONSE ✅", res.data);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      toast.success("Registered & Logged In!");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us and get started</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 sm:px-8 py-4">
            <form onSubmit={submit} className="space-y-2">
              <div>
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                  minLength="6"
                />
              </div>
              
              <div>
                <Input
                  label="Confirm Password"
                  name="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity mt-2"
                disabled={isloading}
              >
                {isloading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a 
                  href="/auth/login" 
                  className="font-medium text-purple-600 hover:text-purple-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/auth/login');
                  }}
                >
                  Sign in here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
