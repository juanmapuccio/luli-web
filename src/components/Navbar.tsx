import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, Camera, Aperture, User, Mail } from 'lucide-react';
import { languages, ui, defaultLang } from '../i18n/ui';
import { isAboutModalOpen, isContactModalOpen } from '../store/modalStore';
import AudioControl from './AudioControl';
import ContactModal from './ContactModal';

interface NavbarProps {
    lang?: keyof typeof ui;
}

export default function Navbar({ lang = 'es' }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const { scrollY } = useScroll();
    const langMenuRef = useRef<HTMLDivElement>(null);

    const t = ui[lang];

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsCompact(latest > 50);
    });

    // Close language menu on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const switchLanguage = (targetLang: string) => {
        const currentPath = window.location.pathname;
        let newPath = currentPath;

        // Remove current language prefix if present (en, ca, it)
        const pathSegments = currentPath.split('/').filter(Boolean);
        const firstSegment = pathSegments[0];

        if (firstSegment && (firstSegment === 'en' || firstSegment === 'ca' || firstSegment === 'it')) {
            pathSegments.shift(); // Remove lang prefix
        }

        // Add new language prefix if not default (es)
        if (targetLang !== defaultLang) {
            pathSegments.unshift(targetLang);
        }

        newPath = '/' + pathSegments.join('/');
        // Ensure trailing slash for root if needed, but usually fine without
        if (newPath === '') newPath = '/';

        window.location.href = newPath;
        setIsLangOpen(false);
    };

    const handleLinkClick = (e: React.MouseEvent, key: string, _href: string) => {
        if (key === 'nav.about') {
            e.preventDefault();
            isAboutModalOpen.set(true);
            setIsOpen(false);
            return;
        }

        if (key === 'nav.gallery') {
            const isHomePage = window.location.pathname === '/' ||
                window.location.pathname === `/${lang}` ||
                window.location.pathname === `/${lang}/`;

            if (isHomePage) {
                e.preventDefault();
                // Target the content wrapper inside the section, not the section itself
                // because the section has massive top padding
                const element = document.getElementById('gallery-title-container');
                if (element) {
                    // Scroll to center the title or slightly above
                    // Using offset to account for Navbar
                    const y = element.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    setIsOpen(false);
                }
            }
        }

        if (key === 'nav.contact') {
            const isHomePage = window.location.pathname === '/' ||
                window.location.pathname === `/${lang}` ||
                window.location.pathname === `/${lang}/`;

            if (isHomePage) {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                }
            }
        }
    };

    // Updated Icons for a more aesthetic/minimal look
    const navLinks = [
        { key: 'nav.gallery', href: '/#gallery', icon: Aperture },
        { key: 'nav.about', href: '/about', icon: User },
        { key: 'nav.contact', href: '#contact', icon: Mail }
    ];

    // Helper to get localized href
    const getLocalizedHref = (href: string) => {
        if (href.startsWith('#')) return href;
        if (lang === defaultLang) return href;
        return `/${lang}${href === '/' ? '' : href}`;
    };

    return (
        <>
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: 0 }} // Always visible
                className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none`}
            >
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className={`
                        pointer-events-auto
                        w-full mx-auto
                        ${/* Using inline classes for easier Framer Motion layout handling */ ''}
                        flex justify-between items-center
                        ${isCompact
                            ? 'max-w-fit bg-white/70 backdrop-blur-xl border border-stone-300/40 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.12)] rounded-full px-4 py-2 gap-6'
                            : 'max-w-5xl bg-coastal-white/90 backdrop-blur-2xl border border-stone-300/40 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.15)] rounded-2xl px-6 py-3'}
                    `}
                >
                    <motion.div layout="position" className="flex-shrink-0 flex items-center">
                        <a href={getLocalizedHref('/')} className="text-coastal-stone-deep hover:text-stone-600 transition-colors" aria-label="Lucia Puccio Home">
                            <Camera
                                size={isCompact ? 20 : 32}
                                strokeWidth={isCompact ? 1.25 : 1.5}
                                className={`transition-all duration-500 ${isCompact ? 'text-stone-800' : ''}`}
                            />
                        </a>
                    </motion.div>

                    <motion.div layout="position" className="hidden md:flex items-center">
                        {/* Desktop Menu */}
                        <motion.div layout="position" className={`flex items-center ${isCompact ? 'space-x-4 ml-4' : 'space-x-8 mr-8'}`}>
                            {navLinks.map((item) => (
                                <a
                                    key={item.key}
                                    href={getLocalizedHref(item.href)}
                                    onClick={(e) => handleLinkClick(e, item.key, item.href)}
                                    className="relative group text-stone-600 hover:text-stone-900 cursor-pointer flex items-center justify-center p-1"
                                    title={t[item.key as keyof typeof t]} // Tooltip for icons
                                >
                                    <AnimatePresence mode="wait">
                                        {!isCompact ? (
                                            <motion.span
                                                key="text"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                                                className="font-sans text-[10px] tracking-[0.4em] uppercase relative block"
                                            >
                                                {t[item.key as keyof typeof t]}
                                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-900 transition-all duration-500 group-hover:w-full"></span>
                                            </motion.span>
                                        ) : (
                                            <motion.div
                                                key="icon"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
                                            >
                                                <item.icon
                                                    size={20}
                                                    strokeWidth={1.25} // Ultra-thin aesthetic
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </a>
                            ))}
                        </motion.div>

                        {/* Audio Control */}
                        <motion.div layout="position" className={`${isCompact ? 'ml-2' : ''}`}>
                            <AudioControl />
                        </motion.div>

                        {/* Language Switcher Desktop */}
                        <motion.div layout="position" className={`relative ${isCompact ? 'ml-2' : 'ml-8'}`} ref={langMenuRef}>
                            <motion.button
                                layout="position"
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center space-x-1 text-sm font-light uppercase tracking-widest transition-colors duration-300 text-stone-600 hover:text-stone-900"
                            >
                                <Globe size={isCompact ? 16 : 16} strokeWidth={isCompact ? 1.25 : 1.5} />
                                <AnimatePresence>
                                    {!isCompact && (
                                        <motion.span
                                            key="lang-text"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="ml-1 overflow-hidden whitespace-nowrap"
                                        >
                                            {lang.toUpperCase()}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {!isCompact && <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />}
                            </motion.button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-32 bg-white/90 backdrop-blur-md rounded-xl shadow-xl py-2 border border-stone-100 overflow-hidden text-left"
                                        style={{ position: 'absolute' }} // Ensure it stays absolute
                                    >
                                        {Object.entries(languages).map(([code, name]) => (
                                            <button
                                                key={code}
                                                onClick={() => switchLanguage(code)}
                                                className={`block w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors ${lang === code ? 'bg-stone-50/50 font-medium text-stone-900' : ''}`}
                                            >
                                                {name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    <div className="md:hidden flex items-center space-x-2">
                        <AudioControl />

                        {/* Language Switcher Mobile (Simple Toggle) */}
                        <button
                            onClick={() => {
                                const langs = Object.keys(languages);
                                const currentIndex = langs.indexOf(lang);
                                const nextLang = langs[(currentIndex + 1) % langs.length];
                                switchLanguage(nextLang);
                            }}
                            className="p-2 transition-colors duration-300 text-stone-600 hover:text-stone-900"
                        >
                            <span className="font-light text-sm uppercase">{lang}</span>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 transition-colors duration-300 text-stone-600 hover:text-stone-900"
                            aria-label="Menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </motion.div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            className="absolute top-24 left-4 right-4 md:hidden bg-coastal-white/95 backdrop-blur-3xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden pointer-events-auto z-40"
                        >
                            <div className="px-6 py-8 space-y-6 flex flex-col items-center">
                                {navLinks.map((item) => (
                                    <a
                                        key={item.key}
                                        href={getLocalizedHref(item.href)}
                                        onClick={(e) => handleLinkClick(e, item.key, item.href)}
                                        className="w-full text-center py-3 text-stone-700 hover:text-stone-900 font-serif italic text-2xl transition-all duration-300 border-b border-transparent hover:border-stone-200"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            {/* Optional: <item.icon size={20} strokeWidth={1} className="opacity-70"/> */}
                                            {t[item.key as keyof typeof t]}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
            <ContactModal lang={lang} />
        </>
    );
}
