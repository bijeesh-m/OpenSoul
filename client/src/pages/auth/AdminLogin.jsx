import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import loginBg from "/src/assets/LoginBg.jpg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminlogin } from "../../apis/authApis";

const AdminLogin = () => {
    const navigate = useNavigate();
    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            studentId: "",
        },
    });

    // Form submission handler
    const onSubmit = async (data) => {
        // Simulate API call

        const res = await adminlogin(data);
        toast.success(res.message);

        navigate("/admin/dashboard");
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ backgroundImage: `url(${loginBg})` }}
                className="flex bg-cover min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
            >
                <motion.div variants={childVariants} className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        alt="Your Company"
                        src="https://files.oaiusercontent.com/file-FcPCtnoSrdX7oeKRj9zFEo?se=2025-03-19T10%3A15%3A29Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D424701bd-12a3-44c8-916b-7bcefc9accd4.webp&sig=jjDLFIaQM3CsKv9jYrzRmsIh5WCqBlkUYd6zAAgjiUs%3D"
                        className="mx-auto h-20 w-auto"
                    /> */}

                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </motion.div>

                <motion.div variants={childVariants} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <motion.div variants={childVariants}>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email Id
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email", {
                                        required: "Email id required",
                                    })}
                                    type="email"
                                    autoComplete="off"
                                    className={`block w-full rounded-md bg-white px-3 py-4 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                                        errors.email ? "outline-red-500" : "outline-gray-300"
                                    }`}
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {errors.email.message}
                                    </motion.p>
                                )}
                            </div>
                            <label htmlFor="adminId" className="block text-sm/6 font-medium text-gray-900">
                                Admin Id
                            </label>
                            <div className="mt-2">
                                <input
                                    id="adminId"
                                    {...register("adminId", {
                                        required: "Admin ID is required",
                                        pattern: {
                                            value: /^[A-Za-z0-9]+$/i,
                                            message: "Admin ID must be alphanumeric",
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Admin ID must be at least 6 characters",
                                        },
                                    })}
                                    type="text"
                                    autoComplete="off"
                                    className={`block w-full rounded-md bg-white px-3 py-4 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                                        errors.adminId ? "outline-red-500" : "outline-gray-300"
                                    }`}
                                    disabled={isSubmitting}
                                />
                                {errors.adminId && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {errors.adminId.message}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>

                        <motion.div variants={childVariants}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs ${
                                    isSubmitting
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gray-500 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                }`}
                            >
                                {isSubmitting ? "Signing in..." : "Sign in"}
                            </button>
                        </motion.div>
                    </form>

                    <motion.p variants={childVariants} className="mt-10 text-center text-sm/6 text-gray-500">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </motion.p>
                </motion.div>
            </motion.div>
        </>
    );
};

export default AdminLogin;
