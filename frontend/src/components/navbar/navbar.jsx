// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ onNavigate }) => {
//     const [activeLink, setActiveLink] = useState('home');
//     const navigate = useNavigate();

//     const handleLinkClick = (linkName) => {
//         setActiveLink(linkName);
//         navigate(linkName === "home" ? "/" : `/${linkName}`);
//     };

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-lg">
//             <div className="container mx-auto px-6 py-4">
//                 <div className="flex justify-between items-center">
//                     {/* Logo */}
//                     <div className="group flex items-center space-x-3 text-white cursor-pointer">
//                         <div className="relative">
//                             <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300 group-hover:scale-110 overflow-hidden">
//                                 <img
//                                     src="/logo.png"
//                                     alt="Paxify Logo"
//                                     className="w-8 h-8 object-contain"
//                                 />
//                             </div>

//                             <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
//                         </div>
//                         <div className="flex flex-col">
//                             <span className="text-2xl font-bold tracking-wide">Paxify</span>
//                             <span className="text-xs text-blue-200 opacity-80">Health Management</span>
//                         </div>
//                     </div>

//                     {/* Navigation Links */}
//                     <div className="flex items-center space-x-2">
//                         {[
//                             { id: "home", label: "Home", icon: "🏠" },
//                             { id: "book", label: "Book Session", icon: "📅" },
//                             { id: "therapists", label: "Find Therapists", icon: "👨‍⚕️" },
//                             { id: "games", label: "Games", icon: "🎮" },
//                             { id: "about", label: "About", icon: "ℹ️" },
//                             { id: "dashboard", label: "Dashboard", icon: "📊" },
//                             { id: "doctor-dashboard", label: "Doctor Dashboard", icon: "🩺" },
//                             { id: "settings", label: "Settings", icon: "⚙️" },               

//                         ].map((link) => (
//                             <button
//                                 key={link.id}
//                                 onClick={() => handleLinkClick(link.id)}
//                                 className={`relative group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeLink === link.id
//                                     ? "bg-white bg-opacity-20 text-white shadow-lg backdrop-blur-sm"
//                                     : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
//                                     }`}
//                             >
//                                 <span className="text-lg group-hover:scale-110 transition-transform duration-300">
//                                     {link.icon}
//                                 </span>
//                                 <span className="hidden md:block text-sm">
//                                     {link.label}
//                                 </span>
//                                 {activeLink === link.id && (
//                                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
//                                 )}
//                             </button>
//                         ))}
//                     </div>

//                     {/* User Section */}
//                     <div className="flex items-center space-x-4">
//                         <button className="relative p-2 text-white hover:text-blue-200 transition-colors duration-300">
//                             <span className="text-xl">🔔</span>
//                             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
//                         </button>

//                         <div className="relative group">
//                             <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-opacity-30 transition-all duration-300">
//                                 <span className="text-lg">👤</span>
//                             </div>
//                             <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-700"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-60"></div>
//         </nav>
//     );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname.replace('/', '') || 'home';
        setActiveLink(currentPath);
    }, [location]);

    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
        setMobileMenuOpen(false);  // Close menu on click
        navigate(linkId === "home" ? "/" : `/${linkId}`);
    };

    const links = [
        { id: "home", label: "Home", icon: "🏠" },
        { id: "book", label: "Book Session", icon: "📅" },
        { id: "therapists", label: "Find Therapists", icon: "👨‍⚕️" },
        { id: "games", label: "Games", icon: "🎮" },
        { id: "about", label: "About", icon: "ℹ️" },
        { id: "dashboard", label: "Dashboard", icon: "📊" },
        { id: "doctor-dashboard", label: "Doctor Dashboard", icon: "🩺" },
        { id: "patient-dashboard", label: "Patient Dashboard", icon: "🧑‍💼" },
        { id: "settings", label: "Settings", icon: "⚙️" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-lg">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="group flex items-center space-x-3 text-white cursor-pointer">
                        <div className="relative">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300 group-hover:scale-110 overflow-hidden">
                                <img src="/logo.png" alt="Paxify Logo" className="w-8 h-8 object-contain" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold tracking-wide">Paxify</span>
                            <span className="text-xs text-blue-200 opacity-80">Health Management</span>
                        </div>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-2">
                        {links.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleLinkClick(link.id)}
                                className={`relative group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    activeLink === link.id
                                        ? "bg-white bg-opacity-20 text-white shadow-lg backdrop-blur-sm"
                                        : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
                                }`}
                            >
                                <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                                    {link.icon}
                                </span>
                                <span className="hidden md:block text-sm">{link.label}</span>
                                {activeLink === link.id && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        ☰
                    </button>

                    {/* User Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="relative p-2 text-white hover:text-blue-200 transition-colors duration-300">
                            <span className="text-xl">🔔</span>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        </button>
                        <div className="relative group">
                            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-opacity-30 transition-all duration-300">
                                <span className="text-lg">👤</span>
                            </div>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-700"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-6 py-4 space-y-2 bg-blue-800 bg-opacity-90 text-white shadow-md">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleLinkClick(link.id)}
                            className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
                                activeLink === link.id
                                    ? "bg-white bg-opacity-20 text-white"
                                    : "text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10"
                            }`}
                        >
                            {link.icon} {link.label}
                        </button>
                    ))}
                </div>
            )}

            <div className="h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-60"></div>
        </nav>
    );
};

export default Navbar;
