import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-[#F3F4F6] font-sans antialiased selection:bg-[#EAB308]/25 selection:text-[#FDE047] flex flex-col justify-between">
      {/* Top Luxury Banner */}
      <header className="border-b border-[#EAB308]/20 bg-[#111111]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold tracking-[0.25em] text-[#EAB308] uppercase">
            SNITCH
          </span>
          <span className="text-[10px] text-[#9CA3AF] tracking-widest uppercase border-l border-white/20 pl-3">
            Luxury Atelier
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            to="/register"
            className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] hover:text-[#EAB308] transition duration-200"
          >
            Register
          </Link>
        </nav>
      </header>

      {/* Main Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EAB308]/30 bg-[#EAB308]/10 px-4 py-1.5 mb-8 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#EAB308] animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[#EAB308] uppercase">
              {user ? "Authenticated Atelier Member" : "Welcome to Snitch"}
            </span>
          </div>

          {/* Greeting */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Hello,{" "}
            <span className="bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#D97706] bg-clip-text text-transparent">
              {user?.fullname || "Guest"}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#9CA3AF] max-w-md mx-auto mb-8 leading-relaxed">
            {user
              ? `Welcome back to your curated luxury portal. Logged in as ${user.email || user.contact}.`
              : "Step into the universe of SNITCH. Personalized wardrobes, early releases, and merchant access await."}
          </p>

          {/* User Details Card if logged in */}
          {user && (
            <div className="rounded-2xl border border-white/10 bg-[#141414]/90 p-6 backdrop-blur-md shadow-2xl text-left mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">{user.fullname}</h3>
                  <p className="text-xs text-[#9CA3AF]">{user.email}</p>
                </div>
                <span className="rounded-full bg-[#EAB308]/15 px-3 py-1 text-[10px] font-bold text-[#EAB308] tracking-widest uppercase border border-[#EAB308]/30">
                  {user.role || "Buyer"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-[#9CA3AF]">
                <div>
                  <span className="block text-[10px] text-[#6B7280] uppercase tracking-wider">Contact</span>
                  <span className="text-white font-medium">{user.contact || "—"}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#6B7280] uppercase tracking-wider">Status</span>
                  <span className="text-emerald-400 font-medium">Active Member</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            {!user && (
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#D97706] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A0A0A] shadow-[0_4px_25px_rgba(234,179,8,0.3)] transition hover:brightness-110"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-[#6B7280]">
        &copy; {new Date().getFullYear()} SNITCH APPAREL CORP. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

export default Home;
