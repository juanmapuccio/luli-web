import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palmtree, Shell, Anchor, Fish } from 'lucide-react'; // Palmtree, Shell, Anchor, Fish from Lucide
import { GiWhaleTail, GiCoral, GiCrab, GiDolphin, GiAmmonite, GiSeaStar, GiJellyfish } from 'react-icons/gi'; // Marine icons separate import
import { isAboutModalOpen } from '../store/modalStore';
import { ui } from '../i18n/ui';
import profileImage from '../images/profile-img/luciapuccioprofile.jpeg';

interface AboutModalProps {
    lang?: keyof typeof ui;
}

export default function AboutModal({ lang = 'es' }: AboutModalProps) {
    const $isOpen = useStore(isAboutModalOpen);
    const content = ui[lang];

    // Wave animation variants
    const waveVariants = {
        animate: {
            d: [
                "M0,60 C150,60 150,30 300,30 C450,30 450,60 600,60 C750,60 750,30 900,30 C1050,30 1050,60 1200,60 C1350,60 1350,30 1500,30 L1500,100 L0,100 Z",
                "M0,30 C150,30 150,60 300,60 C450,60 450,30 600,30 C750,30 750,60 900,60 C1050,60 1050,30 1200,30 C1350,30 1350,60 1500,60 L1500,100 L0,100 Z",
                "M0,60 C150,60 150,30 300,30 C450,30 450,60 600,60 C750,60 750,30 900,30 C1050,30 1050,60 1200,60 C1350,60 1350,30 1500,30 L1500,100 L0,100 Z"
            ],
            transition: {
                repeat: Infinity,
                duration: 10,
                ease: "linear"
            }
        }
    };

    return (
        <AnimatePresence>
            {$isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-stone-900/30 backdrop-blur-md"
                        onClick={() => isAboutModalOpen.set(false)}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-5xl h-auto max-h-[90vh] bg-[#fafaf9] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Close Button - Sticky/Absolute */}
                        <button
                            onClick={() => isAboutModalOpen.set(false)}
                            className="absolute top-4 right-4 z-50 p-2 text-stone-400 hover:text-stone-800 transition-colors bg-white/60 backdrop-blur-sm rounded-full hover:bg-white shadow-sm"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Section (Left) */}
                        <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-stone-200">


                            <motion.img
                                src={profileImage.src}
                                alt="Lucia Puccio"
                                className="relative z-10 w-full h-full object-cover saturate-[0.65] contrast-[0.85] brightness-[1.15] sepia-[0.1] opacity-95 transition-transform duration-1000 md:hover:scale-105"
                            />
                            {/* Gradient Overlay for text readability on mobile if needed, or just style */}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Content Section (Right) */}
                        <div className="w-full md:w-7/12 flex flex-col relative bg-white overflow-hidden">


                            {/* Decorative Background Elements & Icons */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-coastal-blue-pale/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-multiply" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-coastal-sand/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none mix-blend-multiply" />

                            {/* Marine Icons - Subtle Decorations */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07] text-stone-800">
                                {/* Top Area */}
                                <Palmtree className="absolute top-6 left-8 text-7xl transform -rotate-12 opacity-60" />
                                <GiWhaleTail className="absolute top-8 right-10 text-6xl transform rotate-6" />
                                <Anchor className="absolute top-16 right-1/3 text-4xl transform rotate-12 opacity-50" />

                                {/* Middle Area */}
                                <GiSeaStar className="absolute top-1/3 left-6 text-4xl transform rotate-45" />
                                <GiDolphin className="absolute top-[40%] right-4 text-5xl transform -rotate-12" />
                                <Shell className="absolute top-[60%] left-10 text-5xl transform -rotate-12" />

                                {/* Bottom Area */}
                                <GiCrab className="absolute bottom-10 left-8 text-5xl transform rotate-12" />
                                <GiAmmonite className="absolute bottom-24 left-1/3 text-6xl transform -rotate-12 opacity-70" />
                                <Fish className="absolute bottom-12 right-1/3 text-4xl transform rotate-180 opacity-60" />
                                <GiJellyfish className="absolute bottom-32 right-6 text-5xl transform rotate-6" />
                                <GiCoral className="absolute bottom-6 right-8 text-7xl transform -rotate-6" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full p-8 md:p-12 overflow-hidden">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-2 tracking-tight">
                                        {content['about.title']}
                                    </h2>
                                    <div className="w-12 h-[1px] bg-stone-300 mb-6"></div>
                                </motion.div>

                                {/* Scrollable Text Area */}
                                <div className="space-y-6 text-stone-600 font-light leading-loose overflow-y-auto pr-2 custom-scrollbar flex-grow">
                                    <p className="text-lg text-stone-800 font-serif italic opacity-80">
                                        "{content['about.quote']}"
                                    </p>
                                    <p>
                                        {content['about.p1']}
                                    </p>
                                    <p>
                                        {content['about.p2']}
                                    </p>


                                </div>

                                {/* Footer Action */}
                                <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center">
                                    <button
                                        onClick={() => {
                                            isAboutModalOpen.set(false);
                                            // Optional: Open contact modal
                                            // isContactModalOpen.set(true); // If imported
                                        }}
                                        className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-colors"
                                    >
                                        Close
                                    </button>

                                    <span className="font-cursive text-2xl text-stone-400 transform -rotate-2">
                                        Lucia Puccio
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
