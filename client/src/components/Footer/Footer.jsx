import React from "react";

const Footer = () => {
    const footerLinks = {
        About: [
            { name: "Our Story", href: "#" },
            { name: "Team", href: "#" },
            { name: "Contact", href: "#" },
        ],
        Community: [
            { name: "Groups", href: "#" },
            { name: "Guidelines", href: "#" },
            { name: "Support", href: "#" },
        ],
        Legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" },
        ],
    };

    return (
        <footer className="bg-black text-gray-200">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-tight text-white">OpenSoul</h3>
                        <p className="text-sm text-gray-300">
                            A safe space to share your thoughts and confessions anonymously.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.845c0-2.51 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.75 2h8.5A5.25 5.25 0 0 1 21.5 7.25v8.5A5.25 5.25 0 0 1 16.25 21h-8.5A5.25 5.25 0 0 1 2.5 15.75v-8.5A5.25 5.25 0 0 1 7.75 2zm6.645 2.505a.5.5 0 0 0-.14 0H9.75A5.25 5.25 0 0 0 4.5 9.75v4.5a5.25 5.25 0 0 0 5.25 5.25h4.5a5.25 5.25 0 0 0 5.25-5.25v-4.5a5.25 5.25 0 0 0-5.25-5.25h-.355a.5.5 0 0 0-.5.5zm-2.395 2.75a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm4.75-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section} className="space-y-4">
                            <h4 className="text-lg font-semibold text-white">{section}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-indigo-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} OpenSoul. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">
                        Made with <span className="text-red-400">♥</span> for the community
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
