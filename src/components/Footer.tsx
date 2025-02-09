import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#1E1E1E] text-white py-8 mt-12 relative">
            {/* Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                {/* Sosial Media */}
                <div className="flex gap-5 mb-3">
                    {[
                        { href: "https://github.com/zadid15", icon: <FaGithub size={28} /> },
                        { href: "https://twitter.com", icon: <FaTwitter size={28} /> },
                        { href: "https://discord.com", icon: <FaDiscord size={28} /> }
                    ].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition transform hover:scale-110"
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} {`zadid15`}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
