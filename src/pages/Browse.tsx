import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Browse() {

    

    return (
        <body>
            <Navbar />
            <div className="bg-[url('/assets/images/banner/hero.jpg')] bg-no-repeat bg-cover bg-center w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center h-[345px]">
                        <h1 className="text-4xl font-bold text-white">
                            {" "}
                            <span className="opacity-70">Temukan </span>
                            <span className="text-[#6EB45A] opacity-100">Game Terbaik</span>
                            <span className="opacity-70"> untuk Dimainkan!</span>
                        </h1>
                        <p className="text-lg text-[24px] text-white font-thin">
                            Jelajahi ribuan game dari berbagai genre dan platform.
                        </p>
                        <div className="mt-8">
                            <a
                                href="#"
                                className="px-6 py-2 text-white bg-[#6EB45A] rounded-[8px] hover:bg-[#3D3D3D] transition duration-300"
                            >
                                Browse Games
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex justify-center mb-6">
                    <div className="relative w-full max-w-lg">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                                className="w-6 h-6 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-4.35-4.35m2.85-7.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            className="w-full pl-12 px-4 py-3 text-lg text-white bg-[#232323] rounded-[50px] shadow-sm focus:ring-[#6EB45A] focus:outline-none focus:border-transparent"
                            placeholder="Search Game ..."
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Card 1 */}
                    <Card />
                    {/* Card 2 */}
                    <Card />
                    {/* Card 3 */}
                    <Card />
                    {/* Card 4 */}
                    <Card />
                </div>
            </div>

        </body>
    )
}