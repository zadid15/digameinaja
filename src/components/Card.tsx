import { ReactNode } from "react";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid, FaLinux, FaGlobe } from "react-icons/fa";

interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    genres: { name: string }[];
    platforms?: { platform: { name: string } }[]; // Pastikan optional (?)
}

const platformIcons: Record<string, ReactNode> = {
    "PC": <FaWindows className="text-blue-400" />,
    "PlayStation": <FaPlaystation className="text-blue-500" />,
    "Xbox": <FaXbox className="text-green-500" />,
    "macOS": <FaApple className="text-gray-300" />,
    "Android": <FaAndroid className="text-green-400" />,
    "Linux": <FaLinux className="text-yellow-400" />,
};

export default function Card({ game }: { game: Game }) {
    // Pastikan game.platforms tidak null sebelum map
    const uniquePlatforms = Array.from(
        new Set(game.platforms?.map((p) => p.platform.name) || [])
    );

    // Filter ikon hanya yang ada di daftar, jika tidak ada tampilkan globe sekali saja
    const platformIconsList = uniquePlatforms
        .map((platform) => platformIcons[platform])
        .filter(Boolean);

    return (
        <div className="bg-[#1E1E1E] shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105">
            {/* Gambar Background */}
            <div className="relative w-full h-48">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                    <span className="text-white text-sm font-semibold">⭐ {game.rating}</span>
                </div>
            </div>

            {/* Detail Game */}
            <div className="p-4">
                <h2 className="text-white text-lg font-semibold truncate">{game.name}</h2>
                <p className="text-gray-400 text-sm mt-1 truncate">
                    {game.genres.map((genre) => genre.name).join(", ")}
                </p>

                {/* Platform Icons */}
                <div className="flex gap-2 mt-3">
                    {platformIconsList.length > 0
                        ? platformIconsList.map((icon, index) => <span key={index}>{icon}</span>)
                        : <FaGlobe className="text-gray-500" />}
                </div>
            </div>
        </div>
    );
}
