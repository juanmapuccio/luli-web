import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { ui } from '../i18n/ui';

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
        <footer id="contact" className="bg-[#1a1a1a] text-stone-200 py-20 relative overflow-hidden">
            {/* Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/optimizated-videos/FooterWaves.mp4" type="video/mp4" />
            </video>

            {/* Organic Shapes/Noise Background */}
            <div className="absolute inset-0 opacity-5 bg-noise pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left">

                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-6">
                        <h2 className="font-cursive text-5xl md:text-6xl text-stone-100 tracking-wide">
                            Lucia Puccio
                        </h2>
                        <p className="font-light text-stone-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                            {t["about.quote"]}
                        </p>
                    </div>

                    {/* Navigation/Divider - Optional in minimal footer, sticking to socials focus */}
                    <div className="md:col-span-2 hidden md:block">
                        <div className="w-px h-full bg-stone-800 mx-auto"></div>
                    </div>

                    {/* Socials & Contact */}
                    <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center space-y-8">
                        <div className="flex space-x-8">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-stone-400 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon size={32} />
                                    <span className="sr-only">{social.name}</span>
                                </motion.a>
                            ))}
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-xs text-stone-500 font-light tracking-widest uppercase mb-2">
                                Contact Directo
                            </p>
                            <a href="https://wa.me/34672189761" className="text-lg font-serif text-stone-300 hover:text-white transition-colors">
                                +34 672 18 97 61
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 font-light uppercase tracking-widest relative">
                    <p>&copy; {new Date().getFullYear()} Lucia Puccio.</p>

                    {/* Go to Top Button - Centered or absolute positioned */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Scroll to top"
                        className="
                            my-4 md:my-0 px-4 py-3
                            border border-stone-700 rounded-full 
                            text-stone-400 hover:text-white 
                            hover:border-teal-500/50 hover:bg-stone-800/80
                            transition-all duration-500 
                            flex flex-col items-center justify-center group
                            md:absolute md:left-1/2 md:-translate-x-1/2
                            shadow-[0_0_10px_rgba(20,184,166,0.05)] 
                            hover:shadow-[0_0_25px_rgba(20,184,166,0.4)]
                        "
                    >
                        <div className="flex flex-col items-center -space-y-2">
                            {[0, 1, 2].map((i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`
                                        transform transition-all duration-500 
                                        group-hover:-translate-y-1
                                        ${i === 0 ? 'opacity-40 group-hover:opacity-100' : ''}
                                        ${i === 1 ? 'opacity-70 group-hover:opacity-100' : ''}
                                        ${i === 2 ? 'opacity-100' : ''}
                                    `}
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    <path d="m18 15-6-6-6 6" />
                                </svg>
                            ))}
                        </div>
                    </button>

                    <p className="mt-2 md:mt-0">{t["footer.rights"]}</p>
                </div>
            </div>
        </footer>
    );
}
