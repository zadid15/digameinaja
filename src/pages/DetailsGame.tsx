import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { SiPlaystation3, SiPlaystation4, SiPlaystation5 } from "react-icons/si";

const platformIcons = {
    "PC": <FaWindows />,
    "PlayStation 5": <SiPlaystation5 />,
    "PlayStation 4": <SiPlaystation4 />,
    "PlayStation 3": <SiPlaystation3 />,
    "PlayStation": <FaPlaystation />,
    "Xbox One": <FaXbox />,
    "Xbox Series S/X": <FaXbox />,
    "Xbox 360": <FaXbox />
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
    platforms: { platform: { name: string } }[];
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

                // Filter platform yang bernama "PC"
                const pcData = response.data.platforms.find(
                    (platform: { platform: { name: string } }) => platform.platform.name === "PC"
                );

                // Simpan platform PC beserta persyaratan sistemnya
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

                console.log(response.data); // Cek struktur data yang diterima

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

    if (loading) return <p className="text-center text-gray-400 mt-6">Loading...</p>;
    if (!game) return <p className="text-center text-gray-400 mt-6">Game not found.</p>;

    return (
        <>
            <Navbar />
            <div className="mx-auto px-4 sm:px-6 lg:px-30 mt-6 sm:mt-8 lg:mt-12">
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
                        <p className="text-gray-400 text-md leading-[1.6] xl:text-sm mt-2">{game.description_raw}</p>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-4 sm:px-6 lg:px-30 mt-10 sm:mt-8 lg:mt-12">
                <h3 className="text-xl font-semibold text-gray-200">Additional Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Title</h3>
                        <p className="text-gray-300 text-md">{game.name}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Developer</h3>
                        <p className="text-gray-300 text-md">{developers.length > 0 ? developers[0] : "Unknown"}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Publisher</h3>
                        <p className="text-gray-300 text-md">{publishers.length > 0 ? publishers[0] : "Unknown"}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Release Date</h3>
                        <p className="text-gray-300 text-md">{game.released}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Genre</h3>
                        <p className="text-gray-300 text-md">{game.genres.length > 0 ? game.genres[0].name : "Unknown"}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Platform</h3>
                        <div className="flex gap-2 text-gray-300 text-md">
                            {(() => {
                                const seenXbox = new Set(); // Untuk melacak apakah Xbox sudah ditampilkan
                                return game.platforms.map((platform) => {
                                    const platformName = platform.platform.name;
                                    if (platformName.toLowerCase().includes("xbox")) {
                                        if (seenXbox.has("xbox")) return null; // Jika Xbox sudah ada, skip
                                        seenXbox.add("xbox");
                                    }
                                    return (
                                        <span key={platformName} className="flex items-center gap-1">
                                            {platformIcons[platformName as keyof typeof platformIcons] || "🎮"}
                                        </span>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-30 mt-10 sm:mt-8 lg:mt-12">
                <h3 className="text-xl font-semibold text-gray-200">Screenshots of {game.name}</h3>
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
                <h3 className="text-xl font-semibold text-gray-200">Minimum System Requirements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">OS</h3>
                        <p className="text-gray-300 text-sm">
                            {(pcPlatform as PcPlatform).requirements?.minimum
                                ?.match(/OS:\s*([^,]+)/i)?.[1]
                                ?.trim() || "Data tidak tersedia"}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Processor</h3>
                        <p className="text-gray-300 text-sm">
                            {(pcPlatform as PcPlatform).requirements?.minimum
                                ?.match(/Processor:\s*([\w\s-]+)@/i)?.[1]
                                ?.trim() || "Data tidak tersedia"}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Memory</h3>
                        <p className="text-gray-300 text-sm">
                            {(pcPlatform as PcPlatform).requirements?.minimum
                                ?.match(/Memory:\s*([\d]+(?:\s*GB|\s*MB))/i)?.[1] || "Data tidak tersedia"}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Graphics</h3>
                        <p className="text-gray-300 text-sm">
                            {(pcPlatform as PcPlatform).requirements?.minimum
                                ?.match(/Graphics:\s*([^/]+)/i)?.[1]?.trim() || "Data tidak tersedia"}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-400 text-md">Storage</h3>
                        <p className="text-gray-300 text-sm">
                            {(pcPlatform as PcPlatform).requirements?.minimum
                                ?.match(/Storage:\s*([\dA-Za-z\s]+)GB/i)?.[1]
                                ?.trim() + " GB" || "Data tidak tersedia"}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
