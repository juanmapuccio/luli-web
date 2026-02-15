import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
                        onClick={() => isAboutModalOpen.set(false)}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                        className="relative w-full max-w-5xl h-auto max-h-[85vh] bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/60 flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => isAboutModalOpen.set(false)}
                            className="absolute top-4 right-4 z-50 p-2 text-stone-500 hover:text-stone-900 transition-colors bg-white/50 rounded-full hover:bg-white shadow-sm"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Section (Left) */}
                        <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden group bg-stone-100">
                            {/* Video Background */}
                            <video
                                key="about-video"
                                className="absolute inset-0 w-full h-full object-cover opacity-60"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src="/videos/optimizated-videos/AboutWaves.mp4" type="video/mp4" />
                            </video>

                            {/* Profile Image Overlay */}
                            <motion.img
                                src={profileImage.src}
                                alt="Lucia Puccio"
                                className="relative z-10 w-full h-full object-cover mix-blend-multiply opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
                                initial={{ filter: "grayscale(100%)" }}
                                whileHover={{ filter: "grayscale(0%)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent z-20" />
                        </div>

                        {/* Content Section (Right) */}
                        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col relative bg-gradient-to-br from-white/50 to-stone-50/50">

                            {/* Decorative Wave Top (Subtle) */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                <h2 className="font-cursive text-5xl md:text-6xl text-stone-800 mb-2">
                                    {content['about.title']}
                                </h2>
                                <p className="text-stone-400 font-light uppercase tracking-widest text-sm mb-8">
                                    {content['hero.subtitle']}
                                </p>

                                <div className="space-y-6 text-stone-600 font-light leading-relaxed overflow-y-auto pr-4 custom-scrollbar flex-grow">
                                    <p className="text-lg">
                                        {/* Fallback text if translation key is missing, or structure it nicely */}
                                        "Capturar la esencia de un momento es detener el tiempo para siempre."
                                    </p>
                                    <p>
                                        Hola, soy Lucía. Mi pasión por la fotografía nace de la necesidad de guardar instantes que las palabras no alcanzan a describir.
                                    </p>
                                    <p>
                                        Me especializo en retratos naturales y paisajes emotivos, buscando siempre esa luz que hace único a cada sujeto.
                                    </p>
                                </div>

                                {/* Social / Contact Mini-Footer inside Modal */}
                                <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-center">
                                    <a href="#contact" onClick={() => isAboutModalOpen.set(false)} className="text-stone-800 hover:text-teal-600 transition-colors font-medium text-sm uppercase tracking-wider">
                                        {content['nav.contact']}
                                    </a>
                                    <span className="text-stone-300 transform rotate-12 font-cursive text-2xl">Luli</span>
                                </div>
                            </div>
                        </div>

                        {/* Animated Wave Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none text-teal-500/10 z-0">
                            <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
                                <motion.path
                                    fill="currentColor"
                                    d="M0,60 C150,60 150,30 300,30 C450,30 450,60 600,60 C750,60 750,30 900,30 C1050,30 1050,60 1200,60 C1350,60 1350,30 1500,30 L1500,100 L0,100 Z"
                                    variants={waveVariants}
                                    animate="animate"
                                />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
