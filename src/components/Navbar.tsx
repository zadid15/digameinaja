export default function Navbar() {
    return (
        <nav className="bg-[#3D3D3D] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <a href="#" className="text-xl font-bold text-white">
                            DIGAMEIN<span className="text-[#6EB45A]">AJA</span>
                        </a>
                    </div>
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
                        <button id="menu-toggle" className="text-gray-700 focus:outline-none">
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
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div id="mobile-menu" className="hidden md:hidden">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Home
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    About
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Services
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Contact
                </a>
            </div>
        </nav>

    )
}