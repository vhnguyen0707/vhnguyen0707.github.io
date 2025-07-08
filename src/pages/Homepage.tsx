import React, { useEffect, useRef, useState, forwardRef } from "react";
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
    const observer = new window.IntersectionObserver(
        (entries) => {
          // Check if we're at the very top (before any sections)
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;

          // If we're in the top 20% of the viewport, clear active section
          if (scrollY < windowHeight * 0.2) {
            setActiveSection(null);
            return;
          }

          // Find the section with the highest intersection ratio
          let maxRatio = 0;
          let mostVisible: string | null = null;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              mostVisible = entry.target.id;
            }
          });

          // Only update if we found a section with decent visibility
          if (mostVisible && maxRatio > 0.1) {
            setActiveSection(mostVisible);
          }
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          rootMargin: '-10% 0px -10% 0px' // This helps with detection at viewport edges
        }
    );

    // Also add a scroll listener for the top detection
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.2) {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
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
                <About ref={el => (sectionRefs.current["about"] = el)}/>
                {/*<Technologies ref={el => (sectionRefs.current["technologies"] = el)} />*/}
                <Projects ref={el => (sectionRefs.current["projects"] = el)}/>
                <Contact ref={(el) => (sectionRefs.current["contact"] = el)}/>
            </main>
        </div>
    </div>
  );
}