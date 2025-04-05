import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    return (
        <div className="font-sans text-gray-800">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center bg-gradient-to-br  from-slate-800 to-gray-500 h-screen flex items-center justify-center"
                // style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?campus')` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <motion.div
                    className="relative z-10 text-center text-white px-4"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.h1 className="text-4xl md:text-6xl font-bold mb-4" variants={fadeInUp}>
                        Open Soul
                    </motion.h1>
                    <motion.p className="text-lg md:text-xl mb-6" variants={fadeInUp}>
                        Pour your heart out, connect with campus souls—anonymous and free.
                    </motion.p>
                    <Link to="/login">
                        <motion.button
                            className="bg-teal-500 cursor-pointer text-white px-4 py-2.5   rounded-full text-lg font-semibold"
                            variants={buttonVariants}
                            initial="rest"
                            whileHover="hover"
                        >
                            Share Your Soul
                        </motion.button>
                    </Link>
                    <motion.a href="#groups" className="block mt-4 underline text-sm md:text-base" variants={fadeInUp}>
                        Discover Groups
                    </motion.a>
                </motion.div>
            </section>

            {/* Why Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        Why Open Soul?
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {[
                            { title: "Be Raw", desc: "Drop your deepest thoughts anonymously.", icon: "✨" },
                            { title: "Find Kin", desc: "Join groups that get your vibe.", icon: "🌟" },
                            { title: "Connect Deep", desc: "React, chat, and feel the campus pulse.", icon: "💬" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md text-center"
                                variants={fadeInUp}
                            >
                                <span className="text-4xl mb-4 block">{item.icon}</span>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gradient-to-b from-white to-teal-50">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        How Open Soul Works
                    </motion.h2>
                    <motion.div
                        className="flex flex-col md:flex-row justify-center gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {["Sign Up", "Join a Group", "Confess", "Engage"].map((step, idx) => (
                            <motion.div key={idx} className="flex-1 text-center" variants={fadeInUp}>
                                <div className="bg-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {idx + 1}
                                </div>
                                <h3 className="text-lg font-semibold">{step}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.button
                        className="block mx-auto mt-12 bg-coral-500 text-white px-6 py-3 rounded-full font-semibold"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                    >
                        Start Now
                    </motion.button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 font-bold text-xl">Open Soul</div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:underline">
                            About
                        </a>
                        <a href="#" className="hover:underline">
                            Privacy
                        </a>
                        <a href="#" className="hover:underline">
                            Terms
                        </a>
                        <a href="#" className="hover:underline">
                            Contact
                        </a>
                    </div>
                    <div className="mt-4 md:mt-0">Where campus hearts speak freely.</div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
