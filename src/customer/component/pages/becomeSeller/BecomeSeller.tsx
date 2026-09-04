import React, { useState } from "react";
import { Button } from "@mui/material";
import SellerLoginForm from "./SellerLoginForm";
import SellerAccountForm from "./SellerAccountForm";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">

      {/* Background */}
      <img
        src="https://res.cloudinary.com/ldvj1h2z/image/upload/v1782125903/samples/woman-on-a-football-field.jpg"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
        <div className="w-full max-w-7xl grid gap-10 lg:grid-cols-2 items-center">

          {/* LEFT SECTION */}
          <section className="hidden lg:flex flex-col justify-center gap-8 text-white">
            <div className="space-y-6">
              <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
                Join the marketplace revolution
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-200">
                Empower your business, reach more customers and maximize profits with Yash Marketplace.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-lg text-slate-100 shadow-xl shadow-slate-950/20">
                🚀 Grow your business faster
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-lg text-slate-100 shadow-xl shadow-slate-950/20">
                🔒 Secure & reliable platform
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-lg text-slate-100 shadow-xl shadow-slate-950/20">
                📞 24/7 seller support
              </div>
            </div>
          </section>

          {/* RIGHT SECTION */}
          <section className="w-full flex justify-center">
            <div className="w-full max-w-xl overflow-hidden rounded-[32px] border border-white/20 bg-white/95 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-10">

              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Seller dashboard</p>
                <h1 className="mt-4 text-4xl font-bold text-slate-900">Welcome!</h1>
                <p className="mt-2 text-base text-slate-600">
                  Login or create your seller account to get started.
                </p>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100/90 p-2">
                <Button
                  fullWidth
                  variant={isLogin ? "contained" : "text"}
                  onClick={() => setIsLogin(true)}
                  sx={{
                    py: 1.2,
                    borderRadius: "14px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  Login
                </Button>

                <Button
                  fullWidth
                  variant={!isLogin ? "contained" : "text"}
                  onClick={() => setIsLogin(false)}
                  sx={{
                    py: 1.2,
                    borderRadius: "14px",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  Register
                </Button>
              </div>

              <div className="mt-1">
                {isLogin ? <SellerLoginForm /> : <SellerAccountForm />}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;