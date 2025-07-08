import { useEffect, useRef, useState } from "react";
import WebGLCanvas from "../components/webgl/WebGLCanvas";
import classNames from "classnames";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { useZoomLevel } from "../hooks/useZoomLevel";
import {isDesktop} from "react-device-detect";


const SECTIONS = [
    { id: "about", label: "ABOUT" },
    // { id: "technologies", label: "TECHNOLOGIES" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
];

export default function Homepage() {
    const isZoomed = useZoomLevel();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({
        about: null,
        technologies: null,
        projects: null,
        contact: null,
    });

    useEffect(() => {
        const handleScroll = () => {
            const bufferTop = window.innerHeight * 0.15;
            const scrollY = window.scrollY;

            if (scrollY < bufferTop) {
                setActiveSection(null);
                return;
            }

            let currentSection: string | null = null;
            let maxScore = 0;

            for (const section of SECTIONS) {
                const el = sectionRefs.current[section.id];
                if (!el) continue;

                const rect = el.getBoundingClientRect();
                const elementTop = rect.top;
                const elementBottom = rect.bottom;
                const elementHeight = rect.height;

                if (elementBottom < 0 || elementTop > window.innerHeight) {
                    continue;
                }

                const visibleTop = Math.max(elementTop, 0);
                const visibleBottom = Math.min(elementBottom, window.innerHeight);
                const visibleHeight = Math.max(visibleBottom - visibleTop, 0);
                const visibilityRatio = visibleHeight / elementHeight;

                const centerY = elementTop + elementHeight / 2;
                const viewportCenter = window.innerHeight / 2;
                const distanceFromCenter = Math.abs(centerY - viewportCenter);
                const maxDistance = window.innerHeight / 2 + elementHeight / 2;
                const positionScore = 1 - (distanceFromCenter / maxDistance);

                let topBottomBonus = 0;
                if (elementTop <= 50 && elementTop >= -50) {
                    topBottomBonus = 0.5;
                } else if (elementBottom >= window.innerHeight - 50 && elementBottom <= window.innerHeight + 50) {
                    topBottomBonus = 0.3;
                }

                if (section.id === SECTIONS[SECTIONS.length - 1].id) {
                    const documentHeight = document.documentElement.scrollHeight;
                    const windowBottom = window.scrollY + window.innerHeight;
                    const isNearBottom = windowBottom >= documentHeight - 100;

                    if (isNearBottom && visibilityRatio > 0.1) {
                        topBottomBonus = 1;
                    }
                }

                const score = visibilityRatio * 0.6 + positionScore * 0.3 + topBottomBonus;

                if (score > maxScore) {
                    maxScore = score;
                    currentSection = section.id;
                }
            }

            setActiveSection((prev) =>
                prev !== currentSection ? currentSection : prev
            );
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);
    return (
        <div className="homepage">
            {isDesktop && <WebGLCanvas />}
            <div className={classNames("homepage_content", {zoomed: isZoomed, "is-desktop": isDesktop})}>
                <header className={classNames("homepage_header", {zoomed: isZoomed})}>
                    <div>
                        <h1>Nguyen Vu</h1>
                        <h2>Full Stack Software Engineer</h2>
                        <nav>
                            <ul>
                                {SECTIONS.map((section) => (
                                    <li
                                        key={section.id}
                                        className={classNames("homepage_nav-item", {
                                            active: activeSection === section.id,
                                        })}
                                    >
                                        <a onClick={() => sectionRefs.current[section.id]?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        })}>
                                            <span/>
                                            {section.label}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <a href="/resume">RESUME</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <About ref={el => {sectionRefs.current["about"] = el}}/>
                    {/*<Technologies ref={el => (sectionRefs.current["technologies"] = el)} />*/}
                    <Projects ref={el => {sectionRefs.current["projects"] = el}}/>
                    <Contact ref={(el) => {sectionRefs.current["contact"] = el}}/>
                </main>
            </div>
        </div>
    );
}