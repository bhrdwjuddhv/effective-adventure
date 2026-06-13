import { motion } from "motion/react";
import {
    User,
    Mail,
    Lock,
    GraduationCap,
    Bell,
    BookOpen,
    School,
} from "lucide-react";
import {useForm} from "react-hook-form";
import {loginFailure, loginStart, loginSuccess} from "../store/authSlice.js";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import axiosInstance from "../api/axios.js";




export default function UserLogin() {



    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {register, handleSubmit,formState: { errors }} = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        try {
            setError("");
            setLoading(true);
            dispatch(loginStart());

            const response = await axiosInstance.post(
                "/users/login",
                {
                    email: data.email,
                    password: data.password,
                }
            );

            const { user, accessToken } = response.data.data;

            dispatch(
                loginSuccess({
                    user,
                    accessToken,
                })
            );

            navigate("/");
        }
        catch (err) {
            const message =
                err.response?.data?.message ||
                "Something went wrong";

            setError(message);
            dispatch(loginFailure(message));
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
                className="lg:w-3/5 bg-[#06163a] text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>

                <div className="relative z-10 p-10 lg:p-16 h-full flex flex-col justify-between">

                    <div>
                        <div className="inline-flex items-center gap-2 border-2 border-white px-4 py-2 bg-[#ea681c] shadow-[6px_6px_0px_0px_white]">
                            <School size={18} />
                            <span className="font-black uppercase tracking-widest text-sm">
                EduFlow ERP
              </span>
                        </div>

                        <h1 className="mt-10 text-5xl lg:text-7xl font-black uppercase leading-[0.9]">
                            Welcome
                            <br />
                            Back
                        </h1>

                        <p className="mt-8 max-w-lg text-lg text-white/80">
                            Access your classes, notifications, attendance,
                            assignments and school updates from one platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-12">

                        <div className="border-2 border-white p-5">
                            <Bell className="mb-3" />
                            <h3 className="font-black uppercase">
                                Real-Time
                            </h3>
                            <p className="text-sm text-white/70">
                                Notifications
                            </p>
                        </div>

                        <div className="border-2 border-white p-5">
                            <BookOpen className="mb-3" />
                            <h3 className="font-black uppercase">
                                Class
                            </h3>
                            <p className="text-sm text-white/70">
                                Management
                            </p>
                        </div>

                        <div className="border-2 border-white p-5">
                            <GraduationCap className="mb-3" />
                            <h3 className="font-black uppercase">
                                Student
                            </h3>
                            <p className="text-sm text-white/70">
                                Portal
                            </p>
                        </div>

                        <div className="border-2 border-white p-5">
                            <User className="mb-3" />
                            <h3 className="font-black uppercase">
                                Attendance
                            </h3>
                            <p className="text-sm text-white/70">
                                Tracking
                            </p>
                        </div>

                    </div>
                </div>
            </motion.div>

            {/* RIGHT PANEL */}

            <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="lg:w-2/5 flex items-center justify-center p-8 bg-[#f8f8f8]"
            >
                <div className="w-full max-w-md">

                    <div className="bg-white border-2 border-[#06163a] p-8 shadow-[8px_8px_0px_0px_#06163a]">

                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-black uppercase text-[#06163a]">
                                User Login
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Sign in to continue
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit(login)}>

                            <div>
                                <label className="font-bold uppercase text-sm">
                                    Email
                                </label>

                                <div className="relative mt-2">
                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-4 text-gray-500"
                                    />

                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className="w-full border-2 border-[#06163a] pl-12 pr-4 py-3 focus:outline-none"
                                        {...register("email", {
                                            required: true,
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Email address must be valid",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="font-bold uppercase text-sm">
                                    Password
                                </label>

                                <div className="relative mt-2">
                                    <Lock
                                        size={18}
                                        className="absolute left-4 top-4 text-gray-500"
                                    />

                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className="w-full border-2 border-[#06163a] pl-12 pr-4 py-3 focus:outline-none"
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm">

                                <Link
                                    to="/forgot-password"
                                    className="font-bold text-[#ea681c] hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            {error && (
                                <p className="text-red-500 font-medium">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#ea681c] text-white border-2 border-[#06163a] py-4 uppercase font-black shadow-[4px_4px_0px_0px_#06163a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                            >
                                {loading ? "Logging In..." : "Login"}
                            </button>

                        </form>
                    </div>

                    <div className="mt-8 border-2 border-[#06163a] bg-white p-6 shadow-[6px_6px_0px_0px_#06163a]">

                        <h3 className="font-black uppercase text-center mb-4">
                            New Here?
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/register-user" className="border-2 border-[#06163a] py-3 font-bold uppercase text-center hover:bg-[#06163a] hover:text-white transition">
                                Register User
                            </Link>

                            <Link to="/register-school" className="border-2 border-[#06163a] py-3 font-bold uppercase text-center hover:bg-[#ea681c] hover:text-white transition">
                                Register School
                            </Link>
                        </div>

                    </div>
                </div>
            </motion.div>

        </div>
    );
}