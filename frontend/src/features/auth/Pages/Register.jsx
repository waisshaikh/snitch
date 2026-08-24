import { useState } from "react";
import { useAuth } from "../hook/useAuth.js";

const initialForm = {
  fullname: "",
  contact: "",
  email: "",
  password: "",
  isSeller: false,
};

const fashionCampaigns = [
  {
    id: "aw26",
    title: "AUTUMN / WINTER '26",
    subtitle: "Bespoke Outerwear & Luxury Streetwear",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    quote: "A masterclass in modern tailored silhouettes and contemporary street culture.",
  },
  {
    id: "atelier",
    title: "THE ATELIER COLLECTION",
    subtitle: "Distressed Silks & Handcrafted Heavyweights",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    quote: "Redefining the architecture of luxury apparel for the modern era.",
  },
  {
    id: "noir",
    title: "OBSIDIAN & GOLD EDITION",
    subtitle: "Limited Edition Eveningwear & Accessories",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    quote: "Crafted for tastemakers who demand uncompromising sophistication.",
  },
];

function Register() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState(0);

  const { loading, error, successMessage, handleRegister, resetMessages } = useAuth();

  // Password strength calculation (0 to 4)
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const pwdStrength = getPasswordStrength(form.password);

  const validate = () => {
    const errs = {};
    if (!form.fullname.trim()) {
      errs.fullname = "Full name is required";
    } else if (form.fullname.trim().length < 2) {
      errs.fullname = "Full name must be at least 2 characters";
    }

    if (!form.contact.trim()) {
      errs.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(form.contact.trim())) {
      errs.contact = "Please enter a valid 10-digit phone number";
    }

    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    setLocalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const updateField = (e) => {
    const { name, value, checked, type } = e.target;
    if (localErrors[name]) {
      setLocalErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (error || successMessage) {
      resetMessages();
    }
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const res = await handleRegister({
      fullname: form.fullname.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      password: form.password,
      isSeller: form.isSeller,
    });

    if (res?.success) {
      setSubmittedSuccess(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#0A0A0A] text-[#F3F4F6] font-sans antialiased selection:bg-[#EAB308]/25 selection:text-[#FDE047] overflow-x-hidden">
      {/* Top Fashion Drops Running Marquee Announcement Bar */}
      <div className="relative z-50 overflow-hidden bg-[#111111] border-b border-[#EAB308]/20 py-2 px-4 text-xs">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[#D1D5DB]">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#EAB308] animate-pulse" />
            <strong className="text-[#EAB308] tracking-widest uppercase font-semibold">AUTUMN / WINTER '26</strong> — LIVE NOW
          </span>
          <span className="text-[#6B7280]">•</span>
          <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $200</span>
          <span className="text-[#6B7280]">•</span>
          <span className="text-[#EAB308] font-medium">NEW MEMBERS RECEIVE 15% WELCOME PRIVILEGE</span>
          <span className="text-[#6B7280]">•</span>
          <span>SNITCH MERCHANT ATELIER: 0% COMMISSION FOR FIRST 30 DAYS</span>
          <span className="text-[#6B7280]">•</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#EAB308] animate-pulse" />
            <strong className="text-[#EAB308] tracking-widest uppercase font-semibold">AUTUMN / WINTER '26</strong> — LIVE NOW
          </span>
          <span className="text-[#6B7280]">•</span>
          <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $200</span>
          <span className="text-[#6B7280]">•</span>
          <span className="text-[#EAB308] font-medium">NEW MEMBERS RECEIVE 15% WELCOME PRIVILEGE</span>
        </div>
      </div>

      {/* Global Clothing Brand Navigation Header */}
      <header className="relative z-40 w-full border-b border-white/5 bg-[#0A0A0A]/85 backdrop-blur-md px-6 py-4 sm:px-10 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Brand Logo & Monogram */}
          <a href="/" className="group flex items-center gap-3 transition duration-300">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#FACC15] via-[#EAB308] to-[#CA8A04] shadow-[0_0_20px_rgba(234,179,8,0.3)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]">
              <span className="font-serif text-lg font-black tracking-wider text-[#0A0A0A]">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-[0.25em] text-white uppercase transition group-hover:text-[#FACC15]">
                SNITCH
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#9CA3AF] uppercase">
                Clothing Atelier
              </span>
            </div>
          </a>

          {/* Desktop Clothing Categories Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest text-[#9CA3AF]">
            <a href="#new" className="hover:text-[#EAB308] transition duration-200">New Arrivals</a>
            <a href="#streetwear" className="hover:text-[#EAB308] transition duration-200">Streetwear</a>
            <a href="#oversized" className="hover:text-[#EAB308] transition duration-200">Oversized</a>
            <a href="#tailored" className="hover:text-[#EAB308] transition duration-200">Tailored</a>
            <a href="#sellers" className="text-[#EAB308] hover:text-[#FDE047] transition duration-200 flex items-center gap-1.5">
              <span>Merchant Hub</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#EAB308]" />
            </a>
          </nav>
        </div>

        {/* Right Navigation Utilities */}
        <div className="flex items-center gap-5 text-xs">
          <div className="hidden sm:flex items-center gap-2 text-[#9CA3AF] border-r border-white/10 pr-5">
            <span className="text-[#6B7280]">Currency:</span>
            <span className="font-semibold text-white">USD ($)</span>
          </div>
          <a
            href="/login"
            className="text-xs font-semibold uppercase tracking-wider text-[#EAB308] hover:text-[#FDE047] transition duration-200"
          >
            Sign In
          </a>
        </div>
      </header>

      {/* Main Responsive Canvas: Desktop 50/50 Split & Mobile Proportional Stack */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row w-full">
        {/* LEFT COLUMN: High-Fashion Lookbook & Atelier Showcase (Desktop 50%, Mobile Top Banner) */}
        <section className="relative w-full lg:w-1/2 min-h-[380px] sm:min-h-[480px] lg:min-h-[calc(100vh-105px)] overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/5">
          {/* High-Fashion Campaign Image with Smooth Transition */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-105"
            style={{
              backgroundImage: `url(${fashionCampaigns[activeCampaign].image})`,
            }}
          />

          {/* Deep obsidian gradient overlays for cinematic mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-[140px]" />

          {/* Top Badges & Campaign Switcher */}
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#111111]/80 backdrop-blur-md px-4 py-1.5 border border-[#EAB308]/30 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
              <span className="h-2 w-2 rounded-full bg-[#EAB308] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest text-[#EAB308] uppercase">
                VIP Membership Access
              </span>
            </div>

            {/* Campaign Switcher Pills */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#0A0A0A]/70 backdrop-blur-md p-1 rounded-full border border-white/10">
              {fashionCampaigns.map((camp, idx) => (
                <button
                  key={camp.id}
                  onClick={() => setActiveCampaign(idx)}
                  className={`px-3 py-1 text-[10px] font-semibold tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                    activeCampaign === idx
                      ? "bg-[#EAB308] text-[#0A0A0A] shadow-[0_0_12px_rgba(234,179,8,0.4)]"
                      : "text-[#9CA3AF] hover:text-white"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Editorial Content */}
          <div className="relative z-10 mt-auto pt-8">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#EAB308] block mb-2">
              {fashionCampaigns[activeCampaign].title}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight gold-text-glow">
              JOIN THE REVOLUTION
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#D1D5DB] font-light max-w-lg leading-relaxed">
              {fashionCampaigns[activeCampaign].subtitle}
            </p>

            {/* Editorial Quote */}
            <div className="mt-5 border-l-2 border-[#EAB308] pl-4 py-1 text-xs text-[#9CA3AF] italic max-w-md hidden sm:block">
              "{fashionCampaigns[activeCampaign].quote}"
            </div>

            {/* Exclusive Perks Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
              <div className="rounded-xl bg-[#111111]/75 backdrop-blur-md p-3.5 border border-white/5 hover:border-[#EAB308]/30 transition duration-300">
                <div className="flex items-center gap-2 text-[#EAB308] text-xs font-semibold uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Priority Drops</span>
                </div>
                <p className="mt-1 text-[11px] text-[#9CA3AF]">24h advance reservation on limited streetwear drops.</p>
              </div>

              <div className="rounded-xl bg-[#111111]/75 backdrop-blur-md p-3.5 border border-white/5 hover:border-[#EAB308]/30 transition duration-300">
                <div className="flex items-center gap-2 text-[#EAB308] text-xs font-semibold uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>15% Welcome Pass</span>
                </div>
                <p className="mt-1 text-[11px] text-[#9CA3AF]">Automatic luxury privilege on your inaugural atelier order.</p>
              </div>
            </div>

            {/* Live Trust Metrics */}
            <div className="mt-6 flex items-center gap-6 text-xs text-[#9CA3AF] border-t border-white/10 pt-4">
              <div>
                <span className="block font-bold text-white text-sm tracking-wide">500,000+</span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">Active Members</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <span className="block font-bold text-[#EAB308] text-sm tracking-wide">1,200+</span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">Fashion Merchants</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <span className="block font-bold text-white text-sm tracking-wide">4.9 / 5.0</span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">Customer Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Minimal Seamless Registration Form with Ample Breathing Space */}
        <section className="relative w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16 xl:p-20 bg-[#0A0A0A]">
          {/* Subtle Ambient Golden Glow Behind Form */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EAB308]/5 blur-[160px]" />

          <div className="relative z-10 w-full max-w-[500px]">
            {/* Header & Breathing Space */}
            <div className="mb-8 text-left">
              <div className="inline-block px-3 py-1 mb-3 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EAB308] bg-[#EAB308]/10 border border-[#EAB308]/25">
                Atelier Registration
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Create Your Account
              </h1>
              <p className="mt-2 text-sm text-[#9CA3AF] font-light leading-relaxed">
                Step into the universe of SNITCH. Personalized wardrobes, early releases, and merchant access await.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="mb-6 rounded-xl bg-red-950/40 border border-red-500/30 p-3.5 text-xs text-red-200 flex items-center gap-2.5 animate-fadeIn">
                <svg className="w-4 h-4 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Success Notification */}
            {(successMessage || submittedSuccess) && (
              <div className="mb-6 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/40 p-4 text-xs text-[#FEF08A] flex items-center gap-3 animate-fadeIn">
                <svg className="w-5 h-5 shrink-0 text-[#EAB308]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold block">{successMessage || "Welcome to the SNITCH Collective!"}</span>
                  <span className="text-[#D1D5DB] text-[11px]">Your account has been created. Redirecting to showroom...</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#D1D5DB]"
                >
                  Full Name
                </label>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#6B7280] group-focus-within:text-[#EAB308] transition duration-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.fullname}
                    onChange={updateField}
                    placeholder="e.g. Waiss Shaikh"
                    className={`h-12 w-full rounded-xl border bg-[#141414] pl-11 pr-4 text-sm text-white placeholder-[#52525B] outline-none transition duration-200 hover:border-white/20 focus:bg-[#181818] focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/15 ${
                      localErrors.fullname ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                </div>
                {localErrors.fullname && (
                  <p className="mt-1 text-[11px] text-red-400 pl-1">{localErrors.fullname}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contact"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#D1D5DB]"
                >
                  Contact Number
                </label>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#6B7280] group-focus-within:text-[#EAB308] transition duration-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    maxLength={10}
                    value={form.contact}
                    onChange={updateField}
                    placeholder="10-digit mobile number"
                    className={`h-12 w-full rounded-xl border bg-[#141414] pl-11 pr-4 text-sm text-white placeholder-[#52525B] outline-none transition duration-200 hover:border-white/20 focus:bg-[#181818] focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/15 ${
                      localErrors.contact ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                </div>
                {localErrors.contact && (
                  <p className="mt-1 text-[11px] text-red-400 pl-1">{localErrors.contact}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#D1D5DB]"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#6B7280] group-focus-within:text-[#EAB308] transition duration-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={updateField}
                    placeholder="you@domain.com"
                    className={`h-12 w-full rounded-xl border bg-[#141414] pl-11 pr-4 text-sm text-white placeholder-[#52525B] outline-none transition duration-200 hover:border-white/20 focus:bg-[#181818] focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/15 ${
                      localErrors.email ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                </div>
                {localErrors.email && (
                  <p className="mt-1 text-[11px] text-red-400 pl-1">{localErrors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#D1D5DB]"
                  >
                    Password
                  </label>
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">Min. 6 chars</span>
                </div>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#6B7280] group-focus-within:text-[#EAB308] transition duration-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={form.password}
                    onChange={updateField}
                    placeholder="Create a strong password"
                    className={`h-12 w-full rounded-xl border bg-[#141414] pl-11 pr-12 text-sm text-white placeholder-[#52525B] outline-none transition duration-200 hover:border-white/20 focus:bg-[#181818] focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/15 ${
                      localErrors.password ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#9CA3AF] hover:text-[#EAB308] transition duration-200 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="mt-2 flex items-center gap-1.5 px-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          pwdStrength >= step
                            ? pwdStrength === 1
                              ? "bg-red-500"
                              : pwdStrength <= 2
                              ? "bg-amber-500"
                              : "bg-[#EAB308] shadow-[0_0_8px_#EAB308]"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                    <span className="text-[10px] font-medium text-[#9CA3AF] ml-1 uppercase">
                      {pwdStrength <= 1 ? "Weak" : pwdStrength <= 2 ? "Moderate" : pwdStrength === 3 ? "Good" : "Strong"}
                    </span>
                  </div>
                )}

                {localErrors.password && (
                  <p className="mt-1 text-[11px] text-red-400 pl-1">{localErrors.password}</p>
                )}
              </div>

              {/* Is Seller / Fashion Merchant Checkbox Toggle */}
              <div className="pt-2">
                <label
                  htmlFor="isSeller"
                  className={`group flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 transition-all duration-300 ${
                    form.isSeller
                      ? "border-[#EAB308]/60 bg-[#EAB308]/[0.08] shadow-[0_0_24px_rgba(234,179,8,0.12)]"
                      : "border-white/10 bg-[#141414] hover:border-white/20 hover:bg-[#181818]"
                  }`}
                >
                  <div className="flex items-start gap-3.5 select-none">
                    {/* Custom Checkbox */}
                    <div className="pt-0.5">
                      <input
                        id="isSeller"
                        name="isSeller"
                        type="checkbox"
                        checked={form.isSeller}
                        onChange={updateField}
                        className="sr-only peer"
                      />
                      <div
                        className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                          form.isSeller
                            ? "bg-[#EAB308] border-[#EAB308] text-[#0A0A0A] shadow-[0_0_12px_rgba(234,179,8,0.5)]"
                            : "bg-[#0A0A0A] border-[#52525B] group-hover:border-[#EAB308]/60"
                        }`}
                      >
                        {form.isSeller && (
                          <svg className="w-3.5 h-3.5 stroke-[3] text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold transition ${
                          form.isSeller ? "text-[#FDE047]" : "text-[#E5E7EB]"
                        }`}>
                          Register as a Fashion Merchant / Seller
                        </span>
                        <span className="rounded-full bg-[#EAB308]/15 px-2 py-0.5 text-[9px] font-bold text-[#EAB308] tracking-widest uppercase border border-[#EAB308]/30">
                          Partner
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#9CA3AF] leading-relaxed">
                        List your clothing line, sync stock, and sell across the SNITCH global marketplace with 0% launch fee.
                      </p>
                    </div>
                  </div>

                  {/* Visual Status Dot */}
                  <div className="shrink-0 pt-1">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      form.isSeller ? "bg-[#EAB308] shadow-[0_0_10px_#EAB308]" : "bg-[#3F3F46]"
                    }`} />
                  </div>
                </label>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#D97706] text-sm font-bold tracking-wider uppercase text-[#0A0A0A] shadow-[0_4px_25px_rgba(234,179,8,0.3)] transition-all duration-300 hover:shadow-[0_6px_35px_rgba(234,179,8,0.5)] hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
              >
                {/* Shine animation */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin text-[#0A0A0A]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Processing Membership...</span>
                  </div>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Quick Social Authentication Options */}
            <div className="mt-8">
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-white/10" />
                <span className="absolute bg-[#0A0A0A] px-3 text-[11px] uppercase tracking-widest text-[#6B7280]">
                  Or Continue With
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-[#141414] text-xs font-medium text-white transition duration-200 hover:border-white/25 hover:bg-[#1C1C1C] cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.2C.7 9.6 0 12.3 0 15.2s.7 5.6 1.9 8l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.7 7.5 23.5 12 23.5z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-[#141414] text-xs font-medium text-white transition duration-200 hover:border-white/25 hover:bg-[#1C1C1C] cursor-pointer"
                >
                  <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.62-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.64 1.36-.57.65-1.07 1.72-.94 2.76 1.01.08 2.05-.51 2.66-1.25z" />
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>
            </div>

            {/* Switch to Login Link */}
            <div className="mt-8 text-center pt-6 border-t border-white/5">
              <p className="text-xs text-[#9CA3AF]">
                Already a member of the SNITCH Atelier?{" "}
                <a
                  href="/login"
                  className="font-semibold text-[#EAB308] hover:text-[#FDE047] transition underline decoration-[#EAB308]/40 underline-offset-4"
                >
                  Sign in to your account
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Global Clothing Brand Responsive Footer */}
      <footer className="relative z-30 w-full border-t border-white/10 bg-[#070707] px-6 py-10 sm:px-12 lg:px-16 text-[#6B7280]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="font-serif text-xl font-bold tracking-wider text-white">SNITCH</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-xs text-[#9CA3AF]">The Contemporary Luxury Clothing & Streetwear Atelier</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-[#9CA3AF]">
            <a href="#lookbook" className="hover:text-[#EAB308] transition">Lookbook '26</a>
            <a href="#stores" className="hover:text-[#EAB308] transition">Flagship Stores</a>
            <a href="#sustainability" className="hover:text-[#EAB308] transition">Sustainability</a>
            <a href="#privacy" className="hover:text-[#EAB308] transition">Privacy & Legal</a>
            <a href="#terms" className="hover:text-[#EAB308] transition">Merchant Terms</a>
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#52525B] gap-2">
          <span>© 2026 SNITCH APPAREL CORP. ALL RIGHTS RESERVED.</span>
          <span>CURATED IN MILAN • DESIGNED GLOBALLY</span>
        </div>
      </footer>
    </div>
  );
}

export default Register;
