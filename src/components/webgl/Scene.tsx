import {useFrame, useThree} from "@react-three/fiber";
import {Suspense, useEffect} from "react";
import * as THREE from "three";
import {type Sizes, valMap} from "./WebGLCanvas";
import Computer from "./Computer";
import type {TerminalState} from "../../hooks/useTerminal.tsx";

// Canvas Loader Component
function CanvasLoader() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="gray" />
        </mesh>
    );
}

function CameraController({ scroll, sizes }: { scroll: number, sizes: Sizes }) {
    const { camera, gl } = useThree();

    useFrame(() => {
        // Update camera position based on scroll
        camera.position.z = valMap(
            scroll,
            [0, 0.15],
            [-2.35 - sizes.portraitOffset, -10 - sizes.portraitOffset]
        );

        // Always look at origin
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Canvas opacity based on scroll
        gl.domElement.style.opacity = `${valMap(scroll, [0.8, 1.2], [1, 0])}`;
    });

    return null;
}

export default function Scene({ scroll, sizes, terminal }: { scroll: number, sizes: Sizes, terminal: TerminalState }) {
    const { gl } = useThree();

    useEffect(() => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
    }, [gl]);

    return (
        <>
            <ambientLight color={0xffffff} intensity={0.55}/>
            <directionalLight
              position={[10, 10, 0]}
              intensity={5.5}
              color="0xffffff"
            />

            {/* Camera Controller */}
            <CameraController
                scroll={scroll}
                sizes={sizes}
            />

            {/* Computer Model */}
            <Suspense fallback={<CanvasLoader/>}>
                <Computer
                    scroll={scroll}
                    sizes={sizes}
                    terminal={terminal}
                />
            </Suspense>
        </>
    );
}