export default function Navbar() {

    return (
        <nav className="bg-[#3D3D3D] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* Back Button di Mobile, Judul di Desktop */}
                    <button 
                        onClick={() => window.history.back()} 
                        className="md:hidden text-white text-lg font-bold p-2 rounded hover:bg-gray-700 transition"
                    >
                        ← 
                    </button>

                    <a href="#" className="hidden md:block text-xl font-bold text-white">
                        DIGAMEIN<span className="text-[#6EB45A]">AJA</span>
                    </a>

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
                </div>
            </div>
        </nav>
    );
}
