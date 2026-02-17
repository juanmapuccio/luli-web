import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { isMuted } from '../store/audioStore';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioControl() {
    const $isMuted = useStore(isMuted);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio('/sounds/calmwavessand.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3; // Low volume for background

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if ($isMuted) {
            audio.pause();
        } else {
            // Only try to play if user has interacted or we are sure we can
            // Browsers block autoplay without interaction
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio autoplay prevented by browser:", error);
                    // If blocked, ensure we show as muted
                    if (!$isMuted) isMuted.set(true);
                });
            }
        }
    }, [$isMuted]);

    const toggleMute = () => {
        setHasInteracted(true);
        isMuted.set(!$isMuted);
    };

    return (
        <button
            onClick={toggleMute}
            className="p-2 text-stone-600 hover:text-stone-900 transition-colors duration-300 rounded-full hover:bg-stone-50/50"
            aria-label={$isMuted ? "Unmute ambient sounds" : "Mute ambient sounds"}
            title={$isMuted ? "Play subtle ocean sounds" : "Pause ambient sounds"}
        >
            {$isMuted ? (
                <VolumeX size={18} strokeWidth={1.5} />
            ) : (
                <Volume2 size={18} strokeWidth={1.5} />
            )}
        </button>
    );
}
