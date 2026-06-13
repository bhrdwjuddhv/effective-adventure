import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, School } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showNew, setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone]           = useState(false);
  const [searchParams]            = useSearchParams();
  const token                     = searchParams.get('token') || '';

  const onSubmit = (data) => {
    setDone(true);
  };

  const newPassword = watch('newPassword');

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
              Reset<br />Your<br />Password
            </h1>

            <p className="mt-8 max-w-sm text-lg text-white/80">
              Choose a strong, unique password. You'll use this to sign in to EduFlow ERP.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-12">
            <div className="border-2 border-white/20 p-4">
              <Lock size={18} className="mb-2 text-[#ea681c]" />
              <h3 className="font-black uppercase text-sm">Strong Password Tips</h3>
              <ul className="text-xs text-white/60 mt-2 space-y-1 list-disc list-inside">
                <li>At least 8 characters</li>
                <li>Mix of letters, numbers, symbols</li>
                <li>Don't reuse old passwords</li>
              </ul>
            </div>
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

          {!done ? (
            <div className="bg-white border-2 border-[#06163a] p-8 shadow-[8px_8px_0px_0px_#06163a]">
              <div className="mb-8">
                <h2 className="text-4xl font-black uppercase text-[#06163a]">New Password</h2>
                <p className="text-gray-500 mt-2">Enter and confirm your new password below.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* New password */}
                <div>
                  <label className="font-bold uppercase text-sm text-[#06163a]">New Password</label>
                  <div className="relative mt-2">
                    <Lock size={18} className="absolute left-4 top-4 text-gray-500" />
                    <input
                      type={showNew ? 'text' : 'password'}
                      placeholder="New password"
                      className="w-full border-2 border-[#06163a] pl-12 pr-12 py-3 focus:outline-none focus:border-[#ea681c] transition-colors"
                      {...register('newPassword', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'At least 8 characters required' },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute right-4 top-4 text-gray-500 hover:text-[#06163a]"
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="font-bold uppercase text-sm text-[#06163a]">Confirm Password</label>
                  <div className="relative mt-2">
                    <Lock size={18} className="absolute left-4 top-4 text-gray-500" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat new password"
                      className="w-full border-2 border-[#06163a] pl-12 pr-12 py-3 focus:outline-none focus:border-[#ea681c] transition-colors"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (v) => v === newPassword || 'Passwords do not match',
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-4 top-4 text-gray-500 hover:text-[#06163a]"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#06163a] text-white border-2 border-[#06163a] py-4 uppercase font-black shadow-[4px_4px_0px_0px_#ea681c] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Reset Password
                </button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-[#06163a] p-8 shadow-[8px_8px_0px_0px_#06163a] text-center"
            >
              <div className="w-16 h-16 bg-[#06163a] border-2 border-[#06163a] flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_#ea681c]">
                <Lock size={28} className="text-[#ea681c]" />
              </div>
              <h2 className="text-3xl font-black uppercase text-[#06163a] mb-3">Password Reset!</h2>
              <p className="text-gray-600 mb-6">Your password has been updated. You can now sign in with your new password.</p>
              <Link
                to="/login"
                className="inline-block bg-[#ea681c] text-white border-2 border-[#06163a] px-8 py-3 uppercase font-black shadow-[4px_4px_0px_0px_#06163a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Go to Login
              </Link>
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
