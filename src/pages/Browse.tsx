import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_KEY = "b13b3adc41f44643a5de48d6ade03315"; // Ganti dengan API Key dari RAWG.io
const API_URL = "https://api.rawg.io/api/games";

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    platforms: { platform: { name: string } }[];
    genres: { name: string }[];
    metacritic?: number;
}

export default function Browse() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);

            // Cek apakah data sudah ada di cache
            const cacheKey = `games-${searchQuery}`;
            const cachedData = sessionStorage.getItem(cacheKey);
            if (cachedData) {
                setGames(JSON.parse(cachedData));
                setLoading(false);
                return;
            }

            const source = axios.CancelToken.source();

            try {
                const response = await axios.get(API_URL, {
                    params: {
                        key: API_KEY,
                        search: searchQuery || undefined,
                        page_size: 40,
                    },
                    cancelToken: source.token,
                });

                setGames(response.data.results);
                sessionStorage.setItem(cacheKey, JSON.stringify(response.data.results));
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request dibatalkan:", error.message);
                } else {
                    console.error("Error fetching data:", error);
                }
            }

            setLoading(false);
            return () => source.cancel("User changed input");
        };

        const delayDebounce = setTimeout(() => {
            fetchGames();
        }, 0); // Dipercepat debounce-nya

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    return (
        <div className="flex flex-col min-h-screen"> {/* Membuat layout full height */}
            <Navbar />
            
            <div className="flex-grow"> {/* Supaya konten utama mengisi ruang */}
                {/* Hero Section Tetap Ada */}
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
                                    href="#searchInput"
                                    className="px-6 py-2 text-white bg-[#6EB45A] rounded-[8px] hover:bg-[#3D3D3D] transition duration-300"
                                >
                                    Browse Games
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    {/* Search Input */}
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
                                id="searchInput"
                                type="text"
                                className="w-full pl-12 px-4 py-3 text-lg text-white bg-[#232323] rounded-[50px] shadow-sm focus:ring-[#6EB45A] focus:outline-none focus:border-transparent"
                                placeholder="Search Game ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
    
                    {/* Loading State */}
                    {loading && <p className="text-center mx-auto text-white mb-4">Loading...</p>}
    
                    {/* Pesan jika tidak ada game ditemukan */}
                    {!loading && games.length === 0 && (
                        <p className="text-center text-gray-400 mt-4">
                            {searchQuery ? "Game tidak ditemukan." : "Cari game di atas atau pilih dari rekomendasi!"}
                        </p>
                    )}
    
                    {/* Game List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {games.length > 0 &&
                            games.map((game) => <Card key={game.id} game={game} />)}
                    </div>
                </div>
            </div>
    
            {/* Footer Tetap di Bawah */}
            <Footer />
        </div>
    );
    
}
