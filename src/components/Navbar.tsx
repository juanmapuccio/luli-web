import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { languages, ui, defaultLang } from '../i18n/ui';
import { isAboutModalOpen } from '../store/modalStore';

interface NavbarProps {
    lang?: keyof typeof ui;
}

export default function Navbar({ lang = 'es' }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(true);
    const { scrollY } = useScroll();
    const langMenuRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);

    const t = ui[lang];

    useMotionValueEvent(scrollY, "change", (latest) => {
        const isScrollingDown = latest > lastScrollY.current && latest > 50;
        setHeaderVisible(!isScrollingDown);
        lastScrollY.current = latest;
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
                const element = document.getElementById('gallery');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                }
            }
        }
    };

    const navLinks = [
        { key: 'nav.gallery', href: '/#gallery' },
        { key: 'nav.about', href: '/about' },
        { key: 'nav.contact', href: '#contact' }
    ];

    // Helper to get localized href
    const getLocalizedHref = (href: string) => {
        if (href.startsWith('#')) return href;
        if (lang === defaultLang) return href;
        return `/${lang}${href === '/' ? '' : href}`;
    };

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: headerVisible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        >
            <div className={`
                w-full max-w-5xl mx-auto
                bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-black/5
                rounded-2xl px-6 py-3
                flex justify-between items-center transition-all duration-300
            `}>
                <div className="flex-shrink-0 flex items-center">
                    <a href={getLocalizedHref('/')} className="font-cursive text-3xl md:text-4xl tracking-normal text-stone-800 hover:text-stone-600 transition-colors">
                        Lucia Puccio
                    </a>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    {/* Desktop Menu */}
                    <div className="flex space-x-8">
                        {navLinks.map((item) => (
                            <a
                                key={item.key}
                                href={getLocalizedHref(item.href)}
                                onClick={(e) => handleLinkClick(e, item.key, item.href)}
                                className="transition-colors duration-300 font-light text-sm tracking-widest uppercase relative group text-stone-600 hover:text-stone-900"
                            >
                                {t[item.key as keyof typeof t]}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-900 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Language Switcher Desktop */}
                    <div className="relative" ref={langMenuRef}>
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center space-x-1 text-sm font-light uppercase tracking-widest transition-colors duration-300 text-stone-600 hover:text-stone-900"
                        >
                            <Globe size={16} />
                            <span>{lang.toUpperCase()}</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isLangOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-32 bg-white/90 backdrop-blur-md rounded-xl shadow-xl py-2 border border-stone-100 overflow-hidden"
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
                    </div>
                </div>

                <div className="md:hidden flex items-center space-x-4">
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
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-20 left-4 right-4 md:hidden bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
                            {navLinks.map((item) => (
                                <a
                                    key={item.key}
                                    href={getLocalizedHref(item.href)}
                                    onClick={(e) => handleLinkClick(e, item.key, item.href)}
                                    className="px-3 py-2 text-stone-600 hover:text-stone-900 font-light text-sm uppercase tracking-widest w-full text-center hover:bg-stone-50/50 rounded-lg transition-colors"
                                >
                                    {t[item.key as keyof typeof t]}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
