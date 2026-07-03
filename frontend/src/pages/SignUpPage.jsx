import { useState } from 'react';
import { Eye, EyeOff, GraduationCap, Loader2, User, Mail, Lock, BookOpen, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { toast } from 'react-hot-toast';
import { BRANCHES, YEARS } from '../constants';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "mentee",
    year: "1st Year",
    branch: "CSE",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be atleast 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) await signup(formData);
  };

  const roleOptions = [
    { value: "mentee", label: "I am a mentee", hint: "New student looking for guidance" },
    { value: "mentor", label: "I am a mentor", hint: "Senior ready to help juniors" },
  ];

  return (
    <div className='min-h-screen grid lg:grid-cols-2 pt-16'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-7'>
          <div className='text-center'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-14 rounded-2xl bg-primary flex items-center justify-center shadow-soft'>
                <GraduationCap className='size-7 text-primary-content' />
              </div>
              <h1 className='text-3xl font-bold mt-3 tracking-tight'>Join SRMentor</h1>
              <p className='text-base-content/60'>Create your free SRM account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Role selector */}
            <div className='grid grid-cols-2 gap-3'>
              {roleOptions.map((opt) => (
                <button
                  type='button'
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, role: opt.value })}
                  className={`rounded-2xl border p-3 text-left transition-all ${
                    formData.role === opt.value
                      ? "border-primary bg-primary/10 ring-1 ring-primary"
                      : "border-base-300 hover:border-primary/50"
                  }`}
                >
                  <div className='flex items-center gap-2 font-semibold text-sm'>
                    <Sparkles className='size-4 text-primary' /> {opt.label}
                  </div>
                  <div className='text-xs text-base-content/60 mt-1'>{opt.hint}</div>
                </button>
              ))}
            </div>

            <div className='form-control'>
              <label className='label'><span className='label-text font-medium'>Full Name</span></label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input
                  type='text'
                  className='input input-bordered w-full pl-10 rounded-xl'
                  placeholder='Your name'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'><span className='label-text font-medium'>Email</span></label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input
                  type='email'
                  className='input input-bordered w-full pl-10 rounded-xl'
                  placeholder='you@srmist.edu.in'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div className='form-control'>
                <label className='label'><span className='label-text font-medium'>Year</span></label>
                <select
                  className='select select-bordered rounded-xl'
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className='form-control'>
                <label className='label'><span className='label-text font-medium'>Branch</span></label>
                <select
                  className='select select-bordered rounded-xl'
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                >
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className='form-control'>
              <label className='label'><span className='label-text font-medium'>Password</span></label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className='input input-bordered w-full pl-10 rounded-xl'
                  placeholder='At least 6 characters'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className='size-5 text-base-content/40' /> : <Eye className='size-5 text-base-content/40' />}
                </button>
              </div>
            </div>

            <button type='submit' className='btn btn-primary w-full rounded-xl shadow-soft' disabled={isSigningUp}>
              {isSigningUp ? (<><Loader2 className='size-5 animate-spin' /> Loading...</>) : "Create Account"}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account?{" "}
              <Link to='/login' className='link link-primary font-medium'>Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title='Grow with a senior who gets it'
        subtitle='Connect with SRM mentors who have walked your path and are ready to guide your first year.'
      />
    </div>
  );
}

export default SignUpPage;
