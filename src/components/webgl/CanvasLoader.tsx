import { Html, useProgress } from '@react-three/drei';

const CanvasLoader = () => {
    const { progress } = useProgress();
    return (
        <Html
            as="div"
            center
            className="computer-canvas_loader"
        >
            <span className="canvas-loader"></span>
            <p>
                {progress !== 0 ? `${progress.toFixed(2)}%` : 'Loading...'}
            </p>
        </Html>
    );
};

export default CanvasLoader;