import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, GraduationCap } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-16">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-2xl bg-primary flex items-center justify-center shadow-soft">
                <GraduationCap className="size-7 text-primary-content" />
              </div>
              <h1 className="text-3xl font-bold mt-3 tracking-tight">Welcome back</h1>
              <p className="text-base-content/60">Sign in to reach your mentors</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 rounded-xl"
                  placeholder="you@srmist.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Password</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 rounded-xl"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full rounded-xl shadow-soft" disabled={isLoggingIn}>
              {isLoggingIn ? (<><Loader2 className="size-5 animate-spin" /> Loading...</>) : "Sign in"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              New to SRMentor?{" "}
              <Link to="/signup" className="link link-primary font-medium">Create account</Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Your mentors are waiting"
        subtitle="Sign in to continue your conversations and keep learning from seniors on your campus."
      />
    </div>
  );
};

export default LoginPage;
