import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { Button } from "@mui/material";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">

          {/* LEFT SIDE */}
          <div className="hidden md:flex bg-gradient-to-br from-[#1B0F33] via-[#2B163F] to-[#3B0F35] text-white p-10 flex-col justify-center relative overflow-hidden">

            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-fuchsia-400/15 animate-floaty" />

            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-rose-400/15 animate-floaty" />

            <div className="relative z-10">

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-fuchsia-300 via-rose-300 to-amber-200 bg-clip-text text-transparent mt-2">
                  Yash Marketplace
                </span>
              </h1>

              <p className="mt-6 text-gray-300 text-lg leading-8 max-w-md">
                Discover amazing products, connect with sellers, and enjoy
                a seamless shopping experience.
              </p>

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-fuchsia-400/20 flex items-center justify-center text-fuchsia-300">
                    ✓
                  </div>

                  <span className="text-gray-200">
                    Quality products
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-fuchsia-400/20 flex items-center justify-center text-fuchsia-300">
                    ✓
                  </div>

                  <span className="text-gray-200">
                    Secure payments
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-fuchsia-400/20 flex items-center justify-center text-fuchsia-300">
                    ✓
                  </div>

                  <span className="text-gray-200">
                    Fast & reliable delivery
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">

            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-8">

              <h1 className="text-3xl font-bold text-slate-800">
                Yash{" "}
                <span className="text-rose-500">
                  Marketplace
                </span>
              </h1>

              <p className="text-gray-500 mt-2">
                Your marketplace for everything
              </p>

            </div>

            {/* Header */}
            <div className="mb-8">

              <h2 className="text-3xl font-bold text-gradient-brand">
                {isLogin ? "Welcome Back!" : "Create Account"}
              </h2>

              <p className="text-gray-500 mt-2">
                {isLogin
                  ? "Sign in to continue to your account"
                  : "Join us and start shopping today"}
              </p>

            </div>

            {/* Form */}
            <div className="w-full">

              {isLogin ? (
                <LoginForm />
              ) : (
                <RegisterForm />
              )}

            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">

              <div className="flex-1 h-px bg-gray-200" />

              <span className="text-sm text-gray-400">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-200" />

            </div>

            {/* Toggle */}
            <div className="text-center">

              <p className="text-gray-500 text-sm mb-2">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>

              <Button
                variant="text"
                onClick={() => setIsLogin((prev) => !prev)}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  color: "#7C3AED",
                  fontSize: "0.95rem",

                  "&:hover": {
                    backgroundColor:
                      "rgba(124,58,237,0.08)",
                  },
                }}
              >
                {isLogin
                  ? "Create an account"
                  : "Sign in to your account"}
              </Button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Auth;