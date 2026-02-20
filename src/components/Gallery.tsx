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

    const handleNext = (e?: React.MouseEvent | any) => {
        e?.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = displayImages.indexOf(selectedImage);
        const nextIndex = (currentIndex + 1) % displayImages.length;
        setSelectedImage(displayImages[nextIndex]);
    };

    const handlePrev = (e?: React.MouseEvent | any) => {
        e?.stopPropagation();
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

    // Swipe Logic
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    if (!mounted) return null;

    return (
        <div className="container mx-auto px-4 min-h-screen pb-20" id="gallery">
            {/* Masonry Layout - CSS Columns */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                {displayImages.map((src, index) => {
                    return (
                        <motion.div
                            key={`gallery-item-container-${src}`}
                            className="relative group cursor-pointer break-inside-avoid"
                            onClick={() => setSelectedImage(src)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                                delay: (index % 3) * 0.1
                            }}
                        >
                            <div className="overflow-hidden rounded-sm relative w-full h-full transform transition-all duration-700 hover:shadow-2xl hover:shadow-coastal-blue-deep/10">
                                {/* Water Lens Effect Container */}
                                <motion.img
                                    src={src}
                                    alt={`Gallery Item ${index + 1}`}
                                    className={`w-full h-full object-cover transition-all duration-700 ease-out will-change-transform
                                        ${hoveredIndex !== null && hoveredIndex !== index ? 'grayscale opacity-60 blur-[1px]' : 'grayscale-0 opacity-100'}
                                        group-hover:scale-105
                                    `}
                                    loading="lazy"
                                />

                                {/* Water Lens Overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-t from-coastal-blue-deep/20 via-transparent to-white/20 mix-blend-overlay" />
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-coastal-blue-pale/30 to-transparent blur-xl" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Fluid Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[100] bg-coastal-white/95 flex items-center justify-center p-4 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Controls Container */}
                        <div className="absolute inset-0 z-20 pointer-events-none sticky-controls">
                            <button
                                className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors pointer-events-auto"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={40} strokeWidth={1} />
                            </button>

                            <button
                                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-stone-200/50 hover:text-stone-900 transition-colors pointer-events-auto p-2"
                                onClick={handlePrev}
                            >
                                <ChevronLeft size={32} className="md:w-12 md:h-12" strokeWidth={1} />
                            </button>
                            <button
                                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-stone-200/50 hover:text-stone-900 transition-colors pointer-events-auto p-2"
                                onClick={handleNext}
                            >
                                <ChevronRight size={32} className="md:w-12 md:h-12" strokeWidth={1} />
                            </button>
                        </div>


                        {/* Main Image with Shared Layout Transition */}
                        <div className="relative max-w-7xl w-full h-full flex items-center justify-center pointer-events-none">
                            <motion.img
                                key={selectedImage}
                                src={selectedImage}
                                className="w-auto h-auto max-w-full max-h-[85vh] md:max-h-[90vh] object-contain shadow-2xl rounded-sm pointer-events-auto cursor-grab active:cursor-grabbing"
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)", y: -20 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        handleNext();
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        handlePrev();
                                    }
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
