import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ images }: { images: string[] }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Placeholder images if none provided
    const displayImages = images && images.length > 0
        ? images
        : Array.from({ length: 9 }).map((_, i) => `https://placehold.co/600x${400 + (i % 3) * 150}?text=Foto+${i}`);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = displayImages.indexOf(selectedImage);
        const nextIndex = (currentIndex + 1) % displayImages.length;
        setSelectedImage(displayImages[nextIndex]);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = displayImages.indexOf(selectedImage);
        const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
        setSelectedImage(displayImages[prevIndex]);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;
            if (e.key === 'ArrowRight') {
                const currentIndex = displayImages.indexOf(selectedImage);
                const nextIndex = (currentIndex + 1) % displayImages.length;
                setSelectedImage(displayImages[nextIndex]);
            }
            if (e.key === 'ArrowLeft') {
                const currentIndex = displayImages.indexOf(selectedImage);
                const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
                setSelectedImage(displayImages[prevIndex]);
            }
            if (e.key === 'Escape') setSelectedImage(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, displayImages]);

    if (!mounted) return null;

    return (
        <div className="container mx-auto px-4 min-h-screen">
            {/* Strict Grid for Perfect Alignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {displayImages.map((src, index) => (
                    <motion.div
                        key={`gallery-item-container-${src}`}
                        className="relative group cursor-pointer overflow-hidden rounded-sm aspect-[3/4]"
                        onClick={() => setSelectedImage(src)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.img
                            layoutId={`image-${src}`} // layoutId on the IMAGE itself
                            src={src}
                            alt={`Gallery Item ${index + 1}`}
                            className={`w-full h-full object-cover transition-all duration-700 ease-in-out will-change-transform
                                ${hoveredIndex !== null && hoveredIndex !== index ? 'grayscale opacity-50 scale-95' : 'grayscale-0 opacity-100 scale-100'}
                                group-hover:scale-110
                            `}
                            loading="lazy"
                        />
                        {/* Hover Overlay - No layoutId needed */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            {/* Fluid Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[100] bg-stone-900/90 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Controls Container */}
                        <div className="absolute inset-0 z-20 pointer-events-none sticky-controls">
                            <button
                                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors pointer-events-auto"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={40} strokeWidth={1} />
                            </button>

                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors pointer-events-auto p-4 hidden md:block"
                                onClick={handlePrev}
                            >
                                <ChevronLeft size={48} strokeWidth={1} />
                            </button>
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors pointer-events-auto p-4 hidden md:block"
                                onClick={handleNext}
                            >
                                <ChevronRight size={48} strokeWidth={1} />
                            </button>
                        </div>


                        {/* Main Image with Shared Layout Transition */}
                        <div className="relative max-w-7xl w-full h-full flex items-center justify-center pointer-events-none">
                            <motion.img
                                layoutId={`image-${selectedImage}`} // Matching layoutId
                                src={selectedImage}
                                className="w-auto h-auto max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm pointer-events-auto cursor-default"
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    mass: 0.8
                                }}
                            />
                        </div>

                        {/* Counter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-8 left-0 w-full text-center text-stone-400 font-light tracking-widest text-xs uppercase z-20"
                        >
                            {displayImages.indexOf(selectedImage) + 1} / {displayImages.length}
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
