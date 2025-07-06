import {useGLTF} from "@react-three/drei";
import {type JSX, useMemo, useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {type Sizes, valMap} from "./WebGLCanvas";
import type {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import useTerminalTexture from "../../hooks/useTerminalTexture";
import type {TerminalState} from "../../hooks/useTerminal";

const RetroScreenShader = {
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D textTexture;
    uniform float time;
    varying vec2 vUv;

    void main() {
      // Use proper UV coordinates for the texture
      vec3 textColor = texture2D(textTexture, vUv).rgb;
          
      // Horizontal scanlines
      float scanlines = sin(vUv.y * 800.0) * 0.1;

      // CRT flicker
      float flicker = sin(time * 10.0) * 0.05;

      gl_FragColor = vec4(textColor + scanlines + flicker, 1.0);
    }
  `
};

export default function Computer({scroll, sizes, terminal, ...props}: { scroll: number, sizes: Sizes, terminal: TerminalState } & JSX.IntrinsicElements['group']) {
    const {nodes} = useGLTF("model/computer.glb") as GLTF;
    const groupRef = useRef<THREE.Group>(null);
    const timeRef = useRef<number>(0);
    const screenMaterialRef = useRef<THREE.ShaderMaterial>(null);
    const terminalTexture = useTerminalTexture(terminal);
    const screenMaterial = useMemo(() => new THREE.ShaderMaterial({
        vertexShader: RetroScreenShader.vertexShader,
        fragmentShader: RetroScreenShader.fragmentShader,
        uniforms: {
            textTexture: { value: terminalTexture || new THREE.Texture() },
            time: { value: 0 }
        },
        transparent: true
    }), [terminalTexture]);

    const controlProps = {
        computerHeight: 1.5,
        computerAngle: Math.PI * -0.3,
        computerHorizontal: -5,
    };

    useFrame((state) => {
        if (!groupRef.current) return;
        timeRef.current = state.clock.elapsedTime;
        if (screenMaterialRef.current) {
            screenMaterialRef.current.uniforms.time.value = timeRef.current;
        }

        const zoomFac = valMap(scroll, [0, 0.15], [0, 1]);

        // Position updates from original code
        groupRef.current.position.x = controlProps.computerHorizontal * zoomFac;
        groupRef.current.position.y = valMap(scroll, [0, 0.15], [0, controlProps.computerHeight]);
        groupRef.current.rotation.y = controlProps.computerAngle * zoomFac;

        // Portrait mode rotation
        if (sizes.portraitOffset > 0.5) {
            groupRef.current.rotation.z = valMap(scroll, [0, 0.15], [0, -Math.PI / 2]);
        } else {
            groupRef.current.rotation.z = 0;
        }

        // Handle morph targets for CRT if available
        if (nodes.CRT?.morphTargetInfluences) {
            nodes.CRT.morphTargetInfluences[0] = valMap(zoomFac, [0, 0.15], [0.5, 0]);
        }
    });
    return (
        <group
            ref={groupRef}
            position={[controlProps.computerHorizontal, controlProps.computerHeight, 0]}
            rotation={[0, controlProps.computerAngle, 0]}
            {...props}
            dispose={null}
        >
            <mesh
                name="CRT"
                castShadow
                receiveShadow
                geometry={nodes.CRT.geometry}
                material={nodes.CRT.material}
                morphTargetDictionary={nodes.CRT.morphTargetDictionary}
                morphTargetInfluences={nodes.CRT.morphTargetInfluences}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Computer.geometry}
                material={nodes.Computer.material}
                rotation={[0, -0.117, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Keyboard.geometry}
                material={nodes.Keyboard.material}
                position={[0.122, 0, -0.196]}
                rotation={[0, 0.033, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                position={[0, 0, 0.015]}
                geometry={nodes.Screen.geometry}
                material={screenMaterial}
            />
        </group>
    );
};

useGLTF.preload('/model/computer.glb')

