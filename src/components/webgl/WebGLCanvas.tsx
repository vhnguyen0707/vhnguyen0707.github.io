import {useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import Scene from "./Scene";
import HiddenInputHandler from "./HiddenInputHandler";
import useTerminal from "../../hooks/useTerminal";

// eslint-disable-next-line react-refresh/only-export-components
export function valMap(x: number, from: [number, number], to: [number, number]): number {
    const y = ((x - from[0]) / (from[1] - from[0])) * (to[1] - to[0]) + to[0];

    if (to[0] < to[1]) {
        if (y < to[0]) return to[0];
        if (y > to[1]) return to[1];
    } else {
        if (y > to[0]) return to[0];
        if (y < to[1]) return to[1];
    }

    return y;
}

export type Sizes = {
    width: number;
    height: number;
    portraitOffset: number;
}

export default function WebGLCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scroll, setScroll] = useState(0);
    // Track viewport dimentions and screen orientation
    const [sizes, setSizes] = useState<Sizes>({
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
        portraitOffset: 0,
    });
    const [viewHeight, setViewHeight] = useState(document.documentElement.clientHeight);
    // const [isScreenFocused, setIsScreenFocused] = useState(true);
    const isInputActive = scroll >= 0 && scroll <= 0.05;
    const terminal = useTerminal();
    useEffect(() => {
        const initialSizes = {
            width: document.documentElement.clientWidth,
            height: window.innerHeight,
            portraitOffset: valMap(
                window.innerHeight / document.documentElement.clientWidth,
                [0.75, 1.75],
                [0, 2]
            ),
        };
        setSizes(initialSizes);
        setViewHeight(document.documentElement.clientHeight);
        setScroll(window.scrollY / document.documentElement.clientHeight);
    }, []);

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY / viewHeight);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [viewHeight]);

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            const newViewHeight = document.documentElement.clientHeight;
            const newSizes = {
                width: document.documentElement.clientWidth,
                height: window.innerHeight,
                portraitOffset: valMap(
                    window.innerHeight / document.documentElement.clientWidth,
                    [0.8, 1.8],
                    [0, 2.5]
                ),
            };

            setViewHeight(newViewHeight);
            setSizes(newSizes);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Canvas
                className="computer-canvas"
                style={{
                    width: "100%",
                    height: "100vh",
                }}
                ref={canvasRef}
                camera={{
                    fov: 50,
                    aspect: sizes.width / sizes.height,
                    near: 0.1,
                    far: 100,
                    position: [0, 0, -2.5],
                    rotation: [-Math.PI, 0, Math.PI],
                }}
                shadows
            >
                <Scene
                    scroll={scroll}
                    sizes={sizes}
                    terminal={terminal}
                />
            </Canvas>
            <HiddenInputHandler
                terminal={terminal}
                isActive={isInputActive}
            />
            <div
                className="computer-canvas_terminal-status"
                style={{
                // position: 'fixed',
                // bottom: '20px',
                // left: '20px',
                color: isInputActive ? '#00ff00' : '#888',
                // fontFamily: 'monospace',
                // fontSize: '14px',
                // background: 'rgba(0, 0, 0, 0.7)',
                // padding: '10px',
                // borderRadius: '5px',
                // zIndex: 1000,
                // transition: 'all 0.3s ease'
            }}>
                {isInputActive ? (
                    <>
                        <div>🟢 Terminal Active</div>
                        <div>Type commands • Scroll down to exit</div>
                    </>
                ) : (
                    <>
                        <div>⚫ Terminal Inactive</div>
                        <div>Scroll to the top to activate</div>
                    </>
                )}
            </div>
        </div>

    )
}