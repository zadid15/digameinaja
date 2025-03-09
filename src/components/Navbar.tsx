import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-[#3D3D3D] bg-opacity-50 shadow-md fixed top-0 left-0 right-0 backdrop-blur-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Tulisan */}
                    <button onClick={() => window.history.back()} className="text-xl font-bold text-white">
                        DIGAMEIN<span className="text-[#6EB45A]">AJA</span>
                    </button>

                    {/* Hamburger Icon untuk Mobile */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-[50px] items-center">
                        <button onClick={() => window.history.back()} className="text-white hover:text-[#6EB45A]">Home</button>
                        <a href="#" className="text-white hover:text-[#6EB45A]">Popular</a>
                        <a href="#" className="text-white hover:text-[#6EB45A]">Liked Games</a>
                    </div>
                </div>
            </div>

            {/* Menu Dropdown untuk Mobile */}
            {isOpen && (
                <div className="md:hidden bg-[#3D3D3D] py-2">
                    <button onClick={() => window.history.back()} className="block text-white px-4 py-2 hover:bg-gray-700">Home</button>
                    <a href="#" className="block text-white px-4 py-2 hover:bg-gray-700">Popular</a>
                    <a href="#" className="block text-white px-4 py-2 hover:bg-gray-700">Liked Games</a>
                </div>
            )}
        </nav>
    );
}
