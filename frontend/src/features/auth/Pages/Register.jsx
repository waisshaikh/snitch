import { useState } from "react";
import { useAuth } from "../hook/useAuth.js";

const initialForm = {
  fullname: "",
  contact: "",
  email: "",
  password: "",
  isSeller: false,
};

function Register() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const { loading, error, successMessage, handleRegister, resetMessages } = useAuth();

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
      errs.contact = "Please enter a valid 10-digit contact number";
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
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0A0A0A] text-[#F3F4F6] font-sans antialiased selection:bg-[#EAB308]/25 selection:text-[#FDE047]">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#EAB308]/12 via-[#CA8A04]/5 to-transparent blur-[140px] -z-0" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-[#EAB308]/5 blur-[160px] -z-0" />

      {/* Subtle Grid Accent */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] -z-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(234, 179, 8, 0.4) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Navbar Header */}
      <header className="relative z-10 w-full px-6 py-8 sm:px-12 flex items-center justify-between">
        <a href="/" className="group flex items-center gap-3 transition duration-300">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FACC15] via-[#EAB308] to-[#CA8A04] shadow-[0_0_24px_rgba(234,179,8,0.25)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_32px_rgba(234,179,8,0.45)]">
            <span className="font-serif text-lg font-black tracking-wider text-[#0A0A0A]">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.25em] text-white uppercase transition group-hover:text-[#FACC15]">
              SNITCH
            </span>
            <span className="text-[10px] tracking-[0.15em] text-[#9CA3AF] uppercase">
              Exclusive
            </span>
          </div>
        </a>

        <div className="flex items-center gap-4 text-xs tracking-wider uppercase">
          <span className="hidden sm:inline-block text-[#6B7280]">Need assistance?</span>
          <a
            href="#support"
            className="text-[#9CA3AF] hover:text-[#EAB308] transition duration-200"
          >
            Support
          </a>
        </div>
      </header>

      {/* Main Registration Content Canvas */}
      <section className="relative z-10 flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-[480px]">
          {/* Card Container with Golden-leaf outline and subtle elevation */}
          <div className="relative rounded-2xl bg-[#111111]/80 p-8 sm:p-11 border border-[#EAB308]/20 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),0_0_1px_1px_rgba(234,179,8,0.15)] backdrop-blur-xl">
            {/* Top golden accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-28 bg-gradient-to-r from-transparent via-[#EAB308] to-transparent rounded-full" />

            {/* Header & Breathing Space */}
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 mb-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EAB308] bg-[#EAB308]/10 border border-[#EAB308]/25">
                Membership Access
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Create your account
              </h1>
              <p className="mt-2.5 text-sm text-[#9CA3AF] font-light leading-relaxed">
                Join the collective for curated experiences and seamless commerce.
              </p>
            </div>

            {/* Error Notification Banner */}
            {error && (
              <div className="mb-6 rounded-xl bg-red-950/40 border border-red-500/30 p-3.5 text-xs text-red-200 flex items-center gap-2.5 animate-fadeIn">
                <svg className="w-4 h-4 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Success Notification Banner */}
            {(successMessage || submittedSuccess) && (
              <div className="mb-6 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/40 p-3.5 text-xs text-[#FEF08A] flex items-center gap-2.5 animate-fadeIn">
                <svg className="w-4 h-4 shrink-0 text-[#EAB308]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{successMessage || "Account created successfully! Welcome to Snitch."}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#D1D5DB]"
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
                    className={`h-12 w-full rounded-xl border bg-[#171717]/90 pl-11 pr-4 text-sm text-white placeholder-[#52525B] outline-none transition duration-200 hover:border-white/20 focus:bg-[#1A1A1A] focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/15 ${
                      localErrors.fullname ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                </div>
                {localErrors.fullname && (
                  <p className="mt-1.5 text-[11px] text-red-400 pl-1">{localErrors.fullname}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contact"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#D1D5DB]"
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
                    className={`h-12 w-full rounded-xl border bg-[#171717]/90 pl-11 pr-4 text-sm text-white placeholder-[#52525B] outline-none transition duration-200 hover:border-white/20 focus:bg-[#1A1A1A] focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/15 ${
                      localErrors.contact ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                </div>
                {localErrors.contact && (
                  <p className="mt-1.5 text-[11px] text-red-400 pl-1">{localErrors.contact}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#D1D5DB]"
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
                    className={`h-12 w-full rounded-xl border bg-[#171717]/90 pl-11 pr-4 text-sm text-white placeholder-[#52525B] outline-none transition duration-200 hover:border-white/20 focus:bg-[#1A1A1A] focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/15 ${
                      localErrors.email ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                </div>
                {localErrors.email && (
                  <p className="mt-1.5 text-[11px] text-red-400 pl-1">{localErrors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium uppercase tracking-wider text-[#D1D5DB]"
                  >
                    Password
                  </label>
                  <span className="text-[11px] text-[#6B7280]">Min. 6 chars</span>
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
                    className={`h-12 w-full rounded-xl border bg-[#171717]/90 pl-11 pr-12 text-sm text-white placeholder-[#52525B] outline-none transition duration-200 hover:border-white/20 focus:bg-[#1A1A1A] focus:border-[#EAB308] focus:ring-4 focus:ring-[#EAB308]/15 ${
                      localErrors.password ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#9CA3AF] hover:text-[#EAB308] transition duration-200 focus:outline-none"
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
                {localErrors.password && (
                  <p className="mt-1.5 text-[11px] text-red-400 pl-1">{localErrors.password}</p>
                )}
              </div>

              {/* Is Seller Checkbox / Toggle with ample breathing space */}
              <div className="pt-2">
                <label 
                  htmlFor="isSeller"
                  className={`group flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 transition-all duration-300 ${
                    form.isSeller
                      ? "border-[#EAB308]/50 bg-[#EAB308]/[0.06] shadow-[0_0_20px_rgba(234,179,8,0.08)]"
                      : "border-white/10 bg-[#161616]/70 hover:border-white/20 hover:bg-[#1A1A1A]"
                  }`}
                >
                  <div className="flex items-start gap-3 select-none">
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
                            ? "bg-[#EAB308] border-[#EAB308] text-[#0A0A0A] shadow-[0_0_10px_rgba(234,179,8,0.4)]"
                            : "bg-[#111111] border-[#52525B] group-hover:border-[#EAB308]/60"
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
                        <span className={`text-sm font-medium transition ${
                          form.isSeller ? "text-[#FDE047]" : "text-[#E5E7EB]"
                        }`}>
                          Register as a Seller
                        </span>
                        <span className="rounded-full bg-[#EAB308]/15 px-2 py-0.5 text-[10px] font-semibold text-[#EAB308] tracking-wide uppercase border border-[#EAB308]/30">
                          Partner
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#9CA3AF] leading-relaxed">
                        List products, manage inventory, and access the merchant suite.
                      </p>
                    </div>
                  </div>

                  {/* Visual status dot */}
                  <div className="shrink-0 pt-1">
                    <span className={`inline-block h-2 w-2 rounded-full transition-all duration-300 ${
                      form.isSeller ? "bg-[#EAB308] shadow-[0_0_8px_#EAB308]" : "bg-[#3F3F46]"
                    }`} />
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#D97706] text-sm font-semibold tracking-wide text-[#0A0A0A] shadow-[0_4px_20px_rgba(234,179,8,0.25)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(234,179,8,0.45)] hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
              >
                {/* Button shine reflection animation */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin text-[#0A0A0A]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Switch to Login / Footnote */}
            <div className="mt-8 text-center pt-6 border-t border-white/5">
              <p className="text-xs text-[#9CA3AF]">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-[#EAB308] hover:text-[#FDE047] transition underline decoration-[#EAB308]/40 underline-offset-4"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>

          {/* Privacy & Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-center text-[11px] text-[#6B7280]">
            <svg className="h-3.5 w-3.5 text-[#EAB308]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>256-bit encrypted & secure authentication</span>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="relative z-10 w-full px-6 py-6 sm:px-12 text-center text-xs text-[#52525B] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/5">
        <span>© 2026 SNITCH Inc. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#terms" className="hover:text-[#9CA3AF] transition">Terms of Service</a>
          <span>•</span>
          <a href="#privacy" className="hover:text-[#9CA3AF] transition">Privacy Policy</a>
          <span>•</span>
          <a href="#cookies" className="hover:text-[#9CA3AF] transition">Cookie Settings</a>
        </div>
      </footer>
    </main>
  );
}

export default Register;

