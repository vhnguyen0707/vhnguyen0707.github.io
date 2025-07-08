import {useEffect, useState} from "react";

export function useZoomLevel() {
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY / document.documentElement.clientHeight;
            // Consider zoomed when scroll is between 0 and 0.05 (same as terminal activation)
            setIsZoomed(scroll >= 0 && scroll <= 0.05);
        };

        // Set initial state
        handleScroll();

        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isZoomed;
}