import {useEffect, useRef, useState } from "react";

export default function ProjectImagesCarousel({images}: {images: Array<string>}) {
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        handleScroll(currentIdx);
    }, [currentIdx]);

    function handleScroll(idx: number) {
        if (!containerRef.current) return;

        const stepElement = containerRef.current.querySelector(`#images_carousel_item-${idx}`);
        if (stepElement) {
            const containerWidth = stepElement.getBoundingClientRect().width * images.length;
            (containerRef.current as HTMLElement).scrollTo({
                left: containerWidth - stepElement.getBoundingClientRect().width * (images.length - idx),
                behavior: "smooth",
            });
        }
    }
    return <>
        <div className="images_carousel" ref={containerRef}>
            {images.map((image, idx) => (
                <div
                    key={`${image}_${idx}`}
                    className="images_carousel_item"
                    id={`images_carousel_item-${idx}`}
                    style={{backgroundImage: `url(${image})`}}
                />
            ))}
        </div>

        {images.length > 1 && <>
            <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="images_carousel_nav prev"
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
                disabled={currentIdx === images.length - 1}
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="images_carousel_nav next"
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </>}
    </>
}