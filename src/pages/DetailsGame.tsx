import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaLinux } from "react-icons/fa";


const platformIcons: Record<string, ReactNode> = {
    "PC": <FaWindows className="text-blue-400" />,
    "PlayStation": <FaPlaystation className="text-blue-500" />,
    "Xbox": <FaXbox className="text-green-500" />,
    "macOS": <FaApple className="text-gray-300" />,
    "Android": <FaAndroid className="text-green-400" />,
    "Linux": <FaLinux className="text-yellow-400" />,
};
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL = "https://api.rawg.io/api/games";

interface GameDetail {
    id: number;
    name: string;
    background_image: string;
    description_raw: string;
    rating: number;
    released: string;
    platforms: { platform: { id: number; name: string } }[];
    genres: { name: string }[];
    metacritic?: number;
}

interface Developer {
    name: string;
}

interface Publisher {
    name: string;
}

interface PcPlatform {
    requirements: {
        minimum: string;
    };
}

export default function DetailsGame() {
    const { id } = useParams(); // Get ID from URL
    const [game, setGame] = useState<GameDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [screenshots, setScreenshots] = useState<string[]>([]);
    const [pcPlatform, setPcPlatform] = useState<PcPlatform | null>(null);
    const [developers, setDevelopers] = useState<string[]>([]);
    const [publishers, setPublishers] = useState<string[]>([]);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`, {
                    params: { key: API_KEY },
                });

                // Cari platform PC
                const pcData = response.data.platforms.find(
                    (platform: { platform: { name: string } }) => platform.platform.name === "PC"
                ) || { platform: {}, requirements: {} }; // Fallback jika tidak ditemukan

                // Pastikan `requirements` selalu ada
                if (!pcData.requirements) {
                    pcData.requirements = { minimum: "Data tidak tersedia" };
                }

                setPcPlatform(pcData);
            } catch (error) {
                console.error("Error fetching game details:", error);
            }
        };

        fetchGameDetails();
    }, [id]);

    useEffect(() => {
        const fetchScreenshots = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}/screenshots`, {
                    params: { key: API_KEY },
                });
                setScreenshots(response.data.results.map((screenshot: { image: string }) => screenshot.image));
            } catch (error) {
                console.error("Error fetching screenshots:", error);
            }
        };

        fetchScreenshots();
    }, [id]);

    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`, {
                    params: { key: API_KEY },
                });

                setGame(response.data);

                // Set Developers
                if (Array.isArray(response.data.developers)) {
                    setDevelopers(response.data.developers.map((dev: Developer) => dev.name));
                } else {
                    setDevelopers([]);
                }

                // **Set Publishers**
                if (Array.isArray(response.data.publishers)) {
                    setPublishers(response.data.publishers.map((pub: Publisher) => pub.name));
                } else {
                    setPublishers([]);
                }
            } catch (error) {
                console.error("Error fetching game details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetail();
    }, [id]);

    return (
        <>
            <nav className="bg-[#3D3D3D] shadow-md fixed top-0 left-0 right-0 backdrop-blur-lg z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center  mb-4">

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

            <div className="flex flex-col min-h-screen">
                <div className="flex-grow mt-20 lg:mt-18 xl:mt-15">
                    {loading ? (
                        <p className="text-center text-gray-400 mt-6">Loading...</p>
                    ) : !game ? (
                        <p className="text-center text-gray-400 mt-6">Game not found.</p>
                    ) : (
                        <>
                            <div className="mx-auto px-4 sm:px-6 lg:px-30 mt-6 sm:mt-8 lg:mt-12 xl:mt-16 ">
                                {/* Container untuk gambar dan deskripsi */}
                                <div className="clearfix">
                                    {/* Gambar yang mengapung di kiri */}
                                    <img
                                        src={game.background_image}
                                        alt={`Image of ${game.name}`}
                                        className="w-full sm:w-1/3 h-auto object-cover sm:mr-6 float-left mb-4 sm:mb-0 rounded-lg"
                                    />

                                    {/* Deskripsi yang mengalir mengelilingi gambar */}
                                    <div className="w-full mt-4 sm:mt-0">
                                        <h2 className="text-2xl xl:text-3xl font-semibold text-gray-200">About {game.name}</h2>
                                        <p className="text-gray-400 text-md leading-[1.6] xl:text-md mt-2">{game.description_raw}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto px-4 sm:px-6 lg:px-30 mt-10 sm:mt-8 lg:mt-12">
                                <h3 className="text-xl xl:text-2xl font-semibold text-gray-200">Additional Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Title</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">{game.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Developer</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">{developers.length > 0 ? developers[0] : "Unknown"}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Publisher</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">{publishers.length > 0 ? publishers[0] : "Unknown"}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Release Date</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">{game.released}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Genre</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">{game.genres.length > 0 ? game.genres[0].name : "Unknown"}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Platform</h3>
                                        <div className="flex gap-2 text-gray-300 text-lg">
                                            <div className="flex gap-2 text-gray-300 text-2xl mt-2">
                                                {game.platforms.map(({ platform }) => (
                                                    <div key={platform.id} className="flex items-center gap-1">
                                                        {platformIcons[platform.name] ?? null} {/* Hanya tampilkan ikon jika tersedia */}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto px-4 sm:px-6 lg:px-30 mt-10 sm:mt-8 lg:mt-12">
                                <h3 className="text-xl xl:text-2xl font-semibold text-gray-200">Screenshots of {game.name}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    {screenshots.length > 0 ? (
                                        screenshots.map((url, index) => (
                                            <img key={index} src={url} alt={`Screenshot ${index + 1}`} className="rounded-lg" />
                                        ))
                                    ) : (
                                        <p className="text-gray-400">No screenshots available.</p>
                                    )}
                                </div>
                            </div>

                            <div className="mx-auto px-4 sm:px-6 lg:px-30 mt-10 sm:mt-8 lg:mt-12">
                                <h3 className="text-xl xl:text-2xl font-semibold text-gray-200">Minimum System Requirements ( Windows )</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">OS</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">
                                            {(pcPlatform as PcPlatform).requirements?.minimum
                                                ?.match(/OS:\s*([^,]+)/i)?.[1]
                                                ?.trim() || "Data tidak tersedia"}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Processor</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">
                                            {(pcPlatform as PcPlatform).requirements?.minimum
                                                ?.match(/Processor:\s*([\w\s-]+)@/i)?.[1]
                                                ?.trim() || "Data tidak tersedia"}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Memory</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">
                                            {(pcPlatform as PcPlatform).requirements?.minimum
                                                ?.match(/Memory:\s*([\d]+(?:\s*GB|\s*MB))/i)?.[1] || "Data tidak tersedia"}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Graphics</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">
                                            {(pcPlatform as PcPlatform).requirements?.minimum
                                                ?.match(/Graphics:\s*([^/]+)/i)?.[1]?.trim() || "Data tidak tersedia"}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-400 text-md xl:text-xl">Storage</h3>
                                        <p className="text-gray-300 text-sm xl:text-lg">
                                            {(pcPlatform as PcPlatform).requirements?.minimum
                                                ?.match(/Storage:\s*([\dA-Za-z\s]+)GB/i)?.[1]
                                                ?.trim() + " GB" || "Data tidak tersedia"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
