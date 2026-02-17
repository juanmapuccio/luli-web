import { atom } from 'nanostores';

// Persist mute state in localStorage if possible, default to muted (true) for good UX
// We default to muted to respect autoplay policies and user preference
export const isMuted = atom<boolean>(true);

// Initialize from localStorage on client side
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('coastal-audio-muted');
    if (saved !== null) {
        isMuted.set(saved === 'true');
    }

    // Subscribe to changes to update localStorage
    isMuted.subscribe(value => {
        localStorage.setItem('coastal-audio-muted', String(value));
    });
}
