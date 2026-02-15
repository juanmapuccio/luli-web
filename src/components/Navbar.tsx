import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isOpen
                ? 'bg-white/90 backdrop-blur-md border-b border-stone-100 py-2'
                : 'bg-transparent border-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center transition-all duration-300">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className={`font-cursive text-4xl tracking-normal transition-colors duration-300 ${isScrolled || isOpen ? 'text-stone-800' : 'text-white'}`}>
                            Lucia Puccio
                        </a>
                    </div>
                    <div className="hidden md:flex space-x-12">
                        {['Portfolio', 'Sobre Mí', 'Contacto'].map((item, i) => (
                            <a
                                key={item}
                                href={item === "Portfolio" ? "/" : item === "Sobre Mí" ? "/about" : "/contact"}
                                className={`transition-colors duration-300 font-light text-sm tracking-widest uppercase relative group ${isScrolled || isOpen ? 'text-stone-500 hover:text-stone-900' : 'text-white/80 hover:text-white'}`}
                            >
                                {item}
                                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full`}></span>
                            </a>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 transition-colors duration-300 ${isScrolled || isOpen ? 'text-stone-600 hover:text-stone-900' : 'text-white hover:text-white/80'}`}
                            aria-label="Menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
                >
                    <div className="px-4 py-6 space-y-4 flex flex-col items-center">
                        <a href="/" className="px-3 py-2 text-stone-600 hover:text-stone-900 font-light text-sm uppercase tracking-widest">Portfolio</a>
                        <a href="/about" className="px-3 py-2 text-stone-600 hover:text-stone-900 font-light text-sm uppercase tracking-widest">Sobre Mí</a>
                        <a href="/contact" className="px-3 py-2 text-stone-600 hover:text-stone-900 font-light text-sm uppercase tracking-widest">Contacto</a>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
