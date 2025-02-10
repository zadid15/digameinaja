import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY; // Ganti dengan API Key dari RAWG.io
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
        }, 30); // Dipercepat debounce-nya

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-grow">
                {/* Hero Section */}
                <div className="bg-[url('/assets/images/banner/hero.jpg')] bg-no-repeat bg-cover bg-center w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center h-[300px] sm:h-[345px] text-center px-4">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                                <span className="opacity-70">Temukan </span>
                                <span className="text-[#6EB45A] opacity-100">Game Terbaik</span>
                                <span className="opacity-70"> untuk Dimainkan!</span>
                            </h1>
                            <p className="text-lg sm:text-[24px] text-white font-thin">
                                Jelajahi ribuan game dari berbagai genre dan platform.
                            </p>
                            <div className="mt-6 sm:mt-8">
                                <a
                                    href="#searchInput"
                                    className="px-5 py-2 sm:px-6 sm:py-2.5 text-white bg-[#6EB45A] rounded-lg sm:rounded-[8px] hover:bg-[#3D3D3D] transition duration-300"
                                >
                                    Browse Games
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Input */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="relative w-full max-w-md sm:max-w-lg">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m2.85-7.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                id="searchInput"
                                type="text"
                                className="w-full pl-10 sm:pl-12 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-lg text-white bg-[#232323] rounded-full shadow-sm focus:ring-[#6EB45A] focus:outline-none focus:border-transparent"
                                placeholder="Search Game ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Loading & No Data Message */}
                    {loading && <p className="text-center text-white mb-4">Loading...</p>}
                    {!loading && games.length === 0 && (
                        <p className="text-center text-gray-400 mt-4">
                            {searchQuery ? "Game-nya ga ada, cuma aku yang slalu ada buat kamu... 😁" : "Cari game di atas atau pilih dari rekomendasi!"}
                        </p>
                    )}

                    {/* Game List */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {games.length > 0 && games.map((game) => <Card key={game.id} game={game} />)}
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    );

}
