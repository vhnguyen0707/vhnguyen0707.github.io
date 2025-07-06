import {useEffect, useRef, useState} from "react";
import * as THREE from 'three';
import type {TerminalState} from './useTerminal';

export default function useTerminalTexture(terminal: TerminalState) {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);
    const [blinkState, setBlinkState] = useState(true);

    // Create canvas and context
    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 384;
        const ctx = canvas.getContext('2d');

        canvasRef.current = canvas;
        contextRef.current = ctx;

        // Create texture
        const canvasTexture = new THREE.CanvasTexture(canvas);
        canvasTexture.minFilter = THREE.LinearFilter;
        canvasTexture.magFilter = THREE.LinearFilter;
        canvasTexture.format = THREE.RGBAFormat;

        setTexture(canvasTexture);

        return () => {
            if (canvasTexture) canvasTexture.dispose();
        };
    }, []);

    // Cursor blink animation
    useEffect(() => {
        const interval = setInterval(() => {
            setBlinkState(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Render terminal content to canvas
    useEffect(() => {
        if (!contextRef.current || !canvasRef.current || !texture) return;

        const ctx = contextRef.current;
        const canvas = canvasRef.current;

        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        ctx.fillStyle = '#00ff00';
        ctx.font = '14px "Courier New", monospace';
        ctx.textBaseline = 'top';

        // Render terminal text
        const lines = terminal.displayText.split('\n');
        const lineHeight = 18;
        const padding = 20; // Add padding
        const maxLines = Math.floor((canvas.height - padding * 2) / lineHeight);

        // Show only the last maxLines lines
        const visibleLines = lines.slice(-maxLines);

        visibleLines.forEach((line: string, index: number) => {
            ctx.fillText(line, padding, padding + index * lineHeight);
        });

        // Update texture
        texture.needsUpdate = true;
    }, [terminal.displayText, texture, blinkState]);

    return texture;
}
