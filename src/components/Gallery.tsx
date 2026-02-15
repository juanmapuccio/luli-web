import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Gallery({ images }: { images: string[] }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Filter out potential non-image files if glob picked up something else, though glob pattern is strict
    // Fallback images
    const displayImages = images && images.length > 0
        ? images
        : [1, 2, 3, 4, 5, 6].map(i => `https://placehold.co/600x${400 + (i % 3) * 150}?text=Foto+${i}`);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {displayImages.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="break-inside-avoid relative group overflow-hidden cursor-pointer rounded-sm"
                        onClick={() => setSelectedImage(src)}
                        layoutId={`image-${src}-${i}`}
                    >
                        <motion.img
                            src={src}
                            alt={`Gallery ${i}`}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <span className="text-white font-light tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 backdrop-blur-sm px-4 py-2 border border-white/30">Ver</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.img
                            src={selectedImage}
                            alt="Selected"
                            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                            layoutId={`image-${selectedImage}-${displayImages.indexOf(selectedImage)}`} // Try to match ID if possible, roughly
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
