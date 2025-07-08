import {useRef} from "react";

export default function StarScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    return <canvas ref={canvasRef} className=""></canvas>
}