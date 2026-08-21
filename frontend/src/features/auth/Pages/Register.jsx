import { useState } from "react";

const initialForm = {
  contact: "",
  fullname: "",
  email: "",
  password: "",
  isSeller: false,
};

function Register() {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = ({ target: { name, value, checked, type } }) => {
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0b0a] px-5 py-10 text-[#f7f3e8] sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-[-18rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#e7ad22]/10 blur-[120px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <header className="mb-10 text-center">
          <a href="/" className="inline-flex items-center gap-2.5" aria-label="Snitch home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e7ad22] text-sm font-black text-[#11100d] shadow-[0_0_28px_rgba(231,173,34,0.18)]">
              S
            </span>
            <span className="text-lg font-semibold tracking-[0.18em] text-white">SNITCH</span>
          </a>
          <h1 className="mt-10 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#98958d]">
            Join Snitch and discover a better way to shop.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullname" className="mb-2 block text-sm font-medium text-[#d8d3c7]">
              Full name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="name"
              required
              minLength={3}
              value={form.fullname}
              onChange={updateField}
              placeholder="Enter your full name"
              className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-[#65635e] hover:border-white/20 focus:border-[#e7ad22]/80 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#e7ad22]/10"
            />
          </div>

          <div>
            <label htmlFor="contact" className="mb-2 block text-sm font-medium text-[#d8d3c7]">
              Contact number
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              required
              pattern="[0-9]{10}"
              maxLength={10}
              value={form.contact}
              onChange={updateField}
              placeholder="10-digit mobile number"
              className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-[#65635e] hover:border-white/20 focus:border-[#e7ad22]/80 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#e7ad22]/10"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#d8d3c7]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={updateField}
              placeholder="you@example.com"
              className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm text-white outline-none transition placeholder:text-[#65635e] hover:border-white/20 focus:border-[#e7ad22]/80 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#e7ad22]/10"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#d8d3c7]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={6}
                value={form.password}
                onChange={updateField}
                placeholder="At least 6 characters"
                className="h-13 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 pr-18 text-sm text-white outline-none transition placeholder:text-[#65635e] hover:border-white/20 focus:border-[#e7ad22]/80 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#e7ad22]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-4 text-xs font-semibold text-[#aaa69c] transition hover:text-[#e7ad22]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-white/20">
            <span>
              <span className="block text-sm font-medium text-[#e7e2d7]">Register as a seller</span>
              <span className="mt-1 block text-xs text-[#7f7c75]">List products and grow your business.</span>
            </span>
            <input
              name="isSeller"
              type="checkbox"
              checked={form.isSeller}
              onChange={updateField}
              className="peer sr-only"
            />
            <span className="relative h-6 w-11 shrink-0 rounded-full bg-white/10 transition peer-checked:bg-[#e7ad22] peer-focus-visible:ring-4 peer-focus-visible:ring-[#e7ad22]/20 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5 peer-checked:after:bg-[#17140d]" />
          </label>

          <button
            type="submit"
            className="mt-2 h-13 w-full rounded-xl bg-[#e7ad22] text-sm font-bold text-[#17140d] shadow-[0_12px_35px_rgba(231,173,34,0.14)] transition hover:bg-[#f1bc39] focus:outline-none focus:ring-4 focus:ring-[#e7ad22]/25 active:translate-y-px"
          >
            Create account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#77746d]">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-[#e7ad22] transition hover:text-[#f4c85d]">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}

export default Register;
