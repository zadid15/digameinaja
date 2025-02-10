import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#3D3D3D] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <a href="#" className="text-xl font-bold text-white">
                            DIGAMEIN<span className="text-[#6EB45A]">AJA</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-[50px] items-center">
                        <a href="#" className="text-white hover:text-[#6EB45A]">
                            Home
                        </a>
                        <a href="#" className="text-white hover:text-[#6EB45A]">
                            Popular
                        </a>
                        <a href="#" className="text-white hover:text-[#6EB45A]">
                            Liked Games
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="text-white focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">
                    Home
                </a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">
                    Popular
                </a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">
                    Liked Games
                </a>
            </div>
        </nav>
    );
}
