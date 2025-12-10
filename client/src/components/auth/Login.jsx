// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { user, login, isloading , fetchMe } = useAuth(); // get login function & loading state from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loadingToast = toast.loading('Logging in...');
      const response = await login({ email, password });
      if (response?.user) {
      toast.success("Logged in successfully!", { id: loadingToast });
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate("/join-meeting");// redirect after login
    } 
    else {
        setEmail("")
        setPassword("")
        toast.error("User not Found",{id : loadingToast});
    }
  }catch (err) {
      toast.error(err?.response?.data?.message || "Login failed",{id : loadingToast});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 sm:px-8 py-6">
            <form onSubmit={submit} className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
              <div>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                />
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                disabled={isloading}
              >
                {isloading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{' '}
                <a 
                  href="/auth/register" 
                  className="font-medium text-purple-600 hover:text-purple-800 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/auth/register');
                  }}
                >
                  Create an account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
