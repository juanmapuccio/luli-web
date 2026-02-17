import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Mail, MapPin } from 'lucide-react';
import { ui } from '../i18n/ui';
import { isContactModalOpen } from '../store/modalStore';

interface FooterProps {
    lang?: keyof typeof ui;
}

export default function Footer({ lang = 'es' }: FooterProps) {
    const t = ui[lang];

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
        <footer id="contact" className="bg-[#e7e5e4]/90 text-stone-700 py-20 relative overflow-hidden">
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center space-y-10">

                {/* Brand Section - Huge Editorial Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <h2
                        className="font-cursive text-7xl md:text-9xl text-white/10 tracking-normal leading-none relative"
                        style={{ textShadow: "0 0 2px rgba(68, 64, 60, 0.6), 0 0 15px rgba(68, 64, 60, 0.2)" }}
                    >
                        <span className="relative z-10">Lucia Puccio</span>
                    </h2>
                    <p className="font-serif italic text-stone-600 text-base md:text-lg tracking-[0.05em] max-w-lg mx-auto leading-relaxed opacity-90">
                        {t["about.quote"]}
                    </p>
                </motion.div>

                {/* Minimalist Divider */}
                <div className="w-20 h-px bg-stone-300 opacity-40"></div>

                {/* Contact & Socials - Clean Row */}
                <div className="flex items-center justify-center space-x-12 w-full">

                    {/* Email Icon Trigger */}
                    <motion.button
                        onClick={() => isContactModalOpen.set(true)}
                        className="p-4 bg-white/40 rounded-full backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md text-stone-600 transition-all duration-300 transform hover:scale-110 hover:text-stone-900"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Send Email"
                    >
                        <Mail size={32} />
                    </motion.button>

                    {/* Social Icons */}
                    {socialLinks.map((social) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-stone-600 transition-all duration-300 transform hover:scale-110 hover:text-stone-900 ${social.color} p-4 bg-white/40 rounded-full backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md`}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <social.icon size={32} />
                            <span className="sr-only">{social.name}</span>
                        </motion.a>
                    ))}
                </div>



                {/* Bottom Bar - Absolute Center */}
                <div className="pt-8 w-full flex flex-col md:flex-row justify-center items-center text-[12px] text-stone-400 font-normal uppercase tracking-[0.15em] space-y-4 md:space-y-0 md:space-x-8">
                    <p>&copy; {new Date().getFullYear()} Lucia Puccio.</p>
                    <span className="hidden md:inline text-stone-200">•</span>
                    <p>{t["footer.rights"]}</p>
                    <span className="hidden md:inline text-stone-200">•</span>
                    <div className="flex items-center space-x-1.5">
                        <MapPin size={10} className="text-stone-300" />
                        <p>{t["footer.location"]}</p>
                    </div>

                    {/* Minimal Go to Top */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 right-8 p-3 bg-white/50 backdrop-blur-md rounded-full shadow-lg border border-white/40 text-stone-500 hover:text-stone-900 transition-all duration-500 hover:-translate-y-1 z-50 group"
                        aria-label="Back to Top"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
}
