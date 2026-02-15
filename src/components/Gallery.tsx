import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

export default function Gallery({ images }: { images: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Parallax Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    // Create 3 columns of images
    const columns = [[], [], []] as string[][];
    const displayImages = images && images.length > 0
        ? images
        : Array.from({ length: 9 }).map((_, i) => `https://placehold.co/600x${400 + (i % 3) * 150}?text=Foto+${i}`);

    displayImages.forEach((img, i) => {
        columns[i % 3].push(img);
    });

    // Differential scrolling speeds (Parallax)
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]); // Column 1: Slow
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]); // Column 2: Fast
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]); // Column 3: Medium

    const yTransforms = [y1, y2, y3];

    return (
        <div ref={containerRef} className="container mx-auto px-4 py-20 min-h-screen">
            <div className="flex gap-4 md:gap-8 items-start">
                {columns.map((col, colIndex) => (
                    <motion.div
                        key={colIndex}
                        style={{ y: yTransforms[colIndex] }}
                        className="flex-1 flex flex-col gap-8"
                    >
                        {col.map((src, imgIndex) => {
                            // Calculate global index for unique keys and hover logic
                            // Logic matches the distribution: colIndex + (imgIndex * 3)
                            const absoluteIndex = colIndex + (imgIndex * 3);
                            const isHovered = hoveredIndex === absoluteIndex;
                            const isDimmed = hoveredIndex !== null && !isHovered;

                            return (
                                <motion.div
                                    key={src}
                                    className="relative group cursor-pointer"
                                    layoutId={`gallery-item-${src}`}
                                    onClick={() => setSelectedImage(src)}
                                    onMouseEnter={() => setHoveredIndex(absoluteIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    animate={{
                                        opacity: isDimmed ? 0.3 : 1,
                                        scale: isHovered ? 1.02 : 1,
                                        filter: isDimmed ? 'grayscale(100%) blur(1px)' : 'grayscale(0%) blur(0px)'
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <motion.img
                                        src={src}
                                        alt="Gallery Item"
                                        className="w-full h-auto object-cover rounded-sm shadow-md"
                                        loading="lazy"
                                    />
                                    {/* Minimalist Overlay */}
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            );
                        })}
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
                        className="fixed inset-0 z-[60] bg-stone-900/95 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={44} strokeWidth={1} />
                        </button>

                        <motion.img
                            src={selectedImage}
                            layoutId={`gallery-item-${selectedImage}`}
                            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
