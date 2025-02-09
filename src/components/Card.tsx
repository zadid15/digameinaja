export default function Card() {
    return (
        <div className="bg-[#232323] shadow-md rounded-lg overflow-hidden">
            <img src="game1.jpg" alt="Game 1" className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-white opacity-70">Game 1</h3>
                <p className="text-white opacity-50 text-sm mt-2">
                    Deskripsi singkat tentang game ini.
                </p>
            </div>
        </div>
    )
}