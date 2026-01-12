import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Stats2025 = () => {
    const [visited, setVisited] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}assets/data/visited_2025.json`)
            .then(res => res.json())
            .then(data => setVisited(data))
            .catch(err => console.error("Failed to load visited data", err));
    }, []);

    return (
        <section id="stats" className="py-20 px-4 bg-slate-800 relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-center">2025 Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visited.map((place, index) => (
                        <motion.div
                            key={place.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                        >
                            <div
                                className="h-48 bg-slate-600 overflow-hidden cursor-pointer"
                                onClick={() => setSelectedImage(place.image)}
                            >
                                {/* Placeholder for image if not found, or actual image */}
                                <img
                                    src={`${import.meta.env.BASE_URL}${place.image.startsWith('/') ? place.image.slice(1) : place.image}`}
                                    alt={place.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-blue-400 mb-2">{place.date}</div>
                                <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
                                <p className="text-slate-300">{place.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full">
                        <img
                            src={`${import.meta.env.BASE_URL}${selectedImage.startsWith('/') ? selectedImage.slice(1) : selectedImage}`}
                            alt="Full Screen"
                            className="w-full h-full object-contain max-h-[90vh] rounded-lg shadow-2xl"
                        />
                        <button
                            className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-gray-200 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Stats2025;
