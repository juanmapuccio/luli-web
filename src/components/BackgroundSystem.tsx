import { motion, useScroll, useTransform } from 'framer-motion';

const SandGrain = () => (
    <div className="fixed inset-0 pointer-events-none opacity-[0.2] mix-blend-soft-light z-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <filter id="sandNoise">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.75"
                    numOctaves="5"
                    stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                    <feFuncR type="linear" slope="0.3" />
                    <feFuncG type="linear" slope="0.3" />
                    <feFuncB type="linear" slope="0.3" />
                </feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter="url(#sandNoise)" />
        </svg>
    </div>
);

export default function BackgroundSystem() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#f5f5f4] overflow-hidden">
            {/* Base Color */}
            <div className="absolute inset-0 bg-stone-50" />

            {/* Subtle Gradient Shadows */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-stone-300/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-stone-200/5 blur-[180px] rounded-full" />
            </div>

            {/* Sand Grain Texture Overlay */}
            <SandGrain />

            {/* Soft Light Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)]" />
        </div>
    );
}
