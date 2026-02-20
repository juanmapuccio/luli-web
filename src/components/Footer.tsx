import { motion, useScroll, useTransform } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { ui } from '../i18n/ui';
import { isContactModalOpen } from '../store/modalStore';
import { useEffect, useState } from 'react';

interface FooterProps {
    lang?: keyof typeof ui;
}

export default function Footer({ lang = 'es' }: FooterProps) {
    const t = ui[lang];
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const socialLinks = [
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            href: 'https://wa.me/34672189761',
            color: 'hover:text-green-500' // Brand color on hover
        },
        {
            name: 'Instagram',
            icon: FaInstagram,
            href: 'https://www.instagram.com/lulipuccioph/',
            color: 'hover:text-pink-500' // Brand color on hover
        }
    ];

    return (
        <footer id="contact" className="bg-[#e7e5e4]/90 text-stone-700 pt-16 pb-8 relative overflow-hidden border-t border-stone-200/50">
            {/* Video Background - Soft Light for Coastal Feel */}
            <video
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply pointer-events-none grayscale-0"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/optimized-videos/FooterWaves.mp4" type="video/mp4" />
            </video>

            {/* Gradient Mask for Smooth Transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#d6d3d1]/30 pointer-events-none" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-30 bg-noise pointer-events-none mix-blend-soft-light"></div>

            {/* Content Container - Refined Editorial Layout */}
            <div className="w-full h-full flex flex-col relative z-10 px-6 pt-16 pb-8 md:pt-24 md:pb-12">

                {/* 1. Main Interaction Area (Centered) */}
                <div className="flex-grow flex flex-col items-center justify-center text-center">

                    {/* Signature - Dominant Hierarchy */}
                    <h2 className="text-[13vw] md:text-[9vw] leading-none font-serif italic text-white select-none whitespace-nowrap pointer-events-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)] mb-2 md:mb-6">
                        Lucia Puccio
                    </h2>

                    {/* Tagline - Secondary Hierarchy */}
                    <p className="font-serif italic text-lg md:text-2xl font-light tracking-wide text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] max-w-xl mx-auto leading-relaxed mb-10 md:mb-16">
                        {t["footer.poetic_tagline"] || "Visual poetry written with light and soul."}
                    </p>

                    {/* Social Icons - Tertiary Hierarchy (The Bridge) */}
                    <div className="flex justify-center items-center gap-8 md:gap-12 mb-12">
                        <motion.button
                            onClick={() => isContactModalOpen.set(true)}
                            className="text-white hover:text-white/80 transition-all duration-300 drop-shadow-md"
                            whileHover={{ scale: 1.1, translateY: -2 }}
                            aria-label="Email"
                        >
                            <Mail size={28} strokeWidth={1.5} />
                        </motion.button>
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-white hover:text-white/80 transition-all duration-300 drop-shadow-md`}
                                whileHover={{ scale: 1.1, translateY: -2 }}
                                aria-label={social.name}
                            >
                                <social.icon size={28} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* 2. Bottom Information Bar (Quaternary Hierarchy) */}
                <div className="w-full border-t border-white/20 pt-6 flex flex-col md:flex-row justify-center items-center text-white/60 text-[10px] md:text-xs tracking-[0.2em] font-sans uppercase gap-4 md:gap-6 mt-auto">
                    <span>Barcelona, España</span>
                    <span className="hidden md:inline opacity-40">|</span>
                    <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
                </div>
            </div>    {/* Functional Go to Top Button */}
            {showTopBtn && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 p-3 bg-stone-900/80 text-white backdrop-blur-md rounded-full shadow-lg hover:bg-stone-800 transition-all duration-300 z-50 group border border-white/10"
                    aria-label="Back to Top"
                    whileHover={{ y: -2 }}
                >
                    <ArrowUp size={20} />
                </motion.button>
            )}
        </footer>
    );
}
