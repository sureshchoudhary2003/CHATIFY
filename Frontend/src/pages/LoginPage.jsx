import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="fixed inset-0 flex bg-slate-900 overflow-hidden">
      {/* BACKGROUND DECORATORS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none z-0" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[120px] pointer-events-none z-0" />

      {/* LEFT PANEL — ILLUSTRATION */}
      <div className="hidden md:flex relative z-10 w-1/2 items-center justify-center p-12 border-r border-slate-700/40 bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-8 max-w-md">
          {/* Logo / Icon */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30">
              <MessageCircleIcon className="w-10 h-10 text-cyan-400" />
            </div>
            <span className="text-3xl font-bold text-slate-100 tracking-tight">Chatify</span>
          </div>

          {/* Illustration */}
          <img
            src="/login.png"
            alt="People chatting"
            className="w-full max-w-sm h-auto object-contain drop-shadow-2xl"
          />

          {/* Tagline */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-cyan-300">Connect anytime, anywhere</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real-time messaging with end-to-end privacy. Stay connected with the people that matter.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/20">Free</span>
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/20">Easy Setup</span>
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/20">Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — FORM */}
      <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Mobile-only logo */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-8">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
              <MessageCircleIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-2xl font-bold text-slate-100">Chatify</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-100 mb-1">Welcome back</h1>
            <p className="text-slate-400 text-sm">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 pointer-events-none" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-cyan-500/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 pointer-events-none" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:border-cyan-500/50 transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-11 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200 mt-2"
            >
              {isLoggingIn ? (
                <LoaderIcon className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;