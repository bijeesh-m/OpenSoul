import React, { useState } from "react";

const AdminHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard" },
        { name: "Groups", href: "/admin/groups" },
        { name: "Students", href: "/admin/students" },
    ];

    return (
        <header className=" text-black bg-slate-50 shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 px-5">
                        <a href="/admin/dashboard" className="text-2xl font-bold font-sans tracking-tight ">
                            Dashboard
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className=" hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md  hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer (Left Side) */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-gray-50 transform ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } md:hidden transition-transform duration-300 ease-in-out z-50 shadow-lg`}
            >
                <div className="px-4 pt-6 pb-3 space-y-2">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-xl font-bold text-indigo-600">Dashboard</span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-1 rounded-md  hover:text-indigo-600 hover:bg-gray-200"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 hover:text-indigo-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out transform hover:translate-x-1"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* Overlay for closing drawer when clicking outside */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 md:hidden transition-opacity duration-300 ease-in-out"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default AdminHeader;
