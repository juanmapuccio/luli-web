import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { isContactModalOpen } from '../store/modalStore';
import { X, Send } from 'lucide-react';
import { ui } from '../i18n/ui';
import { useState } from 'react';

interface ContactModalProps {
    lang?: keyof typeof ui;
}

export default function ContactModal({ lang = 'es' }: ContactModalProps) {
    const isOpen = useStore(isContactModalOpen);
    const t = ui[lang];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        hours: '',
        location: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct mailto link
        const subject = encodeURIComponent(`Consulta Web - ${formData.eventType || 'General'}`);
        const body = encodeURIComponent(
            `Hola Lucía,\n\nMe gustaría consultarte por lo siguiente:\n\n` +
            `• Nombre: ${formData.name}\n` +
            `• Email: ${formData.email}\n` +
            `• Teléfono: ${formData.phone}\n` +
            `• Tipo de Evento: ${formData.eventType}\n` +
            `• Horas estimadas: ${formData.hours}\n` +
            `• Lugar: ${formData.location}\n\n` +
            `¡Gracias!`
        );

        // Open the user's default email client (Outlook, Mail, etc.)
        window.location.href = `mailto:luciapucciofotografia@gmail.com?subject=${subject}&body=${body}`;

        // Close modal after a short delay
        setTimeout(() => isContactModalOpen.set(false), 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => isContactModalOpen.set(false)}
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-stone-100 bg-stone-50/50">
                            <h2 className="font-serif text-2xl text-stone-800 tracking-tight">
                                {t["contact.title"]}
                            </h2>
                            <button
                                onClick={() => isContactModalOpen.set(false)}
                                className="text-stone-400 hover:text-stone-800 transition-colors p-1 rounded-full hover:bg-stone-200/50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[80vh] overflow-y-auto">

                            {/* Name & Email Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 ml-1">
                                        {t["contact.name"]} *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-700 outline-none focus:ring-2 focus:ring-stone-400/20 focus:border-stone-400 transition-all font-light"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 ml-1">
                                        {t["contact.email"]} *
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-700 outline-none focus:ring-2 focus:ring-stone-400/20 focus:border-stone-400 transition-all font-light"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 ml-1">
                                    {t["contact.phone"]} *
                                </label>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-700 outline-none focus:ring-2 focus:ring-stone-400/20 focus:border-stone-400 transition-all font-light"
                                    placeholder="+34 ..."
                                />
                            </div>

                            {/* Event Type & Hours */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 ml-1">
                                        {t["contact.type"]}
                                    </label>
                                    <input
                                        type="text"
                                        name="eventType"
                                        value={formData.eventType}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-700 outline-none focus:ring-2 focus:ring-stone-400/20 focus:border-stone-400 transition-all font-light"
                                        placeholder="Boda, Pareja..."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 ml-1">
                                        {t["contact.hours"]}
                                    </label>
                                    <input
                                        type="text"
                                        name="hours"
                                        value={formData.hours}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-700 outline-none focus:ring-2 focus:ring-stone-400/20 focus:border-stone-400 transition-all font-light"
                                        placeholder="Ej: 4 horas"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-stone-500 ml-1">
                                    {t["contact.location"]}
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-700 outline-none focus:ring-2 focus:ring-stone-400/20 focus:border-stone-400 transition-all font-light"
                                    placeholder="Ciudad, Finca..."
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full mt-4 bg-stone-800 text-stone-100 font-bold tracking-widest uppercase text-xs py-4 rounded-lg shadow-lg hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <span>{t["contact.send"]}</span>
                                <Send size={14} />
                            </motion.button>

                            <p className="text-[10px] text-center text-stone-400 mt-2">
                                Se abrirá tu cliente de correo (Gmail/Outlook) con los datos pre-cargados.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
