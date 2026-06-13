import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, KeyRound, School } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosInstance from "../api/axios.js";

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("")


      const response = await axiosInstance.post(
          "/users/forget-password",
          {
            email: data.email,
          }
      );

      setSuccessMessage(response.data.message);

    } catch (error) {
      setError(
          error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">

      {/* LEFT PANEL */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="lg:w-2/5 bg-[#06163a] text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="relative z-10 p-10 lg:p-16 h-full flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-white px-4 py-2 bg-[#ea681c] shadow-[6px_6px_0px_0px_white]">
              <School size={18} />
              <span className="font-black uppercase tracking-widest text-sm">EduFlow ERP</span>
            </div>

            <h1 className="mt-10 text-5xl lg:text-6xl font-black uppercase leading-[0.9]">
              Forgot<br />Your<br />Password?
            </h1>

            <p className="mt-8 max-w-sm text-lg text-white/80">
              Enter your registered email and we'll send you a secure link to reset your password.
            </p>
          </div>

          <div className="border-2 border-white/20 p-5 mt-12">
            <KeyRound size={22} className="mb-3 text-[#ea681c]" />
            <h3 className="font-black uppercase">Secure Reset</h3>
            <p className="text-sm text-white/70 mt-1">Reset link expires in 15 minutes. Check your spam folder if you don't see it.</p>
          </div>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="lg:w-3/5 flex items-center justify-center p-8 bg-[#f8f8f8]"
      >
        <div className="w-full max-w-md">

          {!sent ? (
            <div className="bg-white border-2 border-[#06163a] p-8 shadow-[8px_8px_0px_0px_#06163a]">
              <div className="mb-8">
                <h2 className="text-4xl font-black uppercase text-[#06163a]">Reset Link</h2>
                <p className="text-gray-500 mt-2">We'll email you a link to reset your password.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="font-bold uppercase text-sm text-[#06163a]">Email Address</label>
                  <div className="relative mt-2">
                    <Mail size={18} className="absolute left-4 top-4 text-gray-500" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border-2 border-[#06163a] pl-12 pr-4 py-3 focus:outline-none focus:border-[#ea681c] transition-colors"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                      })}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {error && (
                    <p className="text-red-500 text-sm font-medium">
                      {error}
                    </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`
                              w-full
                              bg-[#ea681c]
                              text-white
                              border-2
                              border-[#06163a]
                              py-4
                              uppercase
                              font-black
                              shadow-[4px_4px_0px_0px_#06163a]
                              transition-all
                              ${loading ? "opacity-70 cursor-not-allowed" : "hover:translate-x-1 hover:translate-y-1 hover:shadow-none"}
                              `}
                >
                  {loading
                      ? "Sending..."
                      : "Send Reset Link"}
                </button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-[#06163a] p-8 shadow-[8px_8px_0px_0px_#06163a] text-center"
            >
              <div className="w-16 h-16 bg-[#ea681c] border-2 border-[#06163a] flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_#06163a]">
                <Mail size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-black uppercase text-[#06163a] mb-3">Check Your Email</h2>
              <p className="text-gray-600">
                We've sent a password reset link to your email. It expires in 15 minutes.
              </p>
            </motion.div>
          )}

          <div className="mt-6 border-2 border-[#06163a] bg-white p-4 shadow-[4px_4px_0px_0px_#06163a] text-center">
            <Link to="/login" className="font-black uppercase text-sm text-[#06163a] hover:text-[#ea681c] transition-colors">
              ← Back to Login
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
