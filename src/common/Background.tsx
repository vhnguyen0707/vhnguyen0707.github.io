import React, {useEffect, useRef} from 'react'
import * as THREE from 'three';
import star1 from '../assets/star1.png';
import star2 from '../assets/star2.png';

const getRandomParticles = (numberOfParticles:number) => {
    const arr = new Float32Array(numberOfParticles * 3);
    for (let i = 0; i < numberOfParticles; i++){
        arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
}
const Background:React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!canvasRef.current) return;

        let [mouseX, mouseY] = [0,0];
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5);
        const renderer= new THREE.WebGLRenderer({canvas: canvasRef.current});
        renderer.setClearColor(new THREE.Color("#21262d"));

        const light = new THREE.DirectionalLight();
        light.position.set(-1, 2, 4);
        scene.add(light);

        camera.position.z = 5;

        const geometries = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];

        geometries[0].setAttribute(
            'position',
            new THREE.BufferAttribute(getRandomParticles(450), 3)
        )

        geometries[1].setAttribute(
            'position',
            new THREE.BufferAttribute(getRandomParticles(1500), 3)
        )
        const loader = new THREE.TextureLoader();
        const materials = [
            new THREE.PointsMaterial({
                size: 0.075,
                map: loader.load(star1),
                transparent: true
            }),
            new THREE.PointsMaterial({
                size: 0.1,
                map: loader.load(star2),
                transparent: true,
            }),
        ]
        const starsSet1 = new THREE.Points(geometries[0], materials[0]);
        const starsSet2 = new THREE.Points(geometries[1], materials[1]);

        scene.add(starsSet1);
        scene.add(starsSet2);
        function render() {
            // resize canvas if needed
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            const resizeNeeded = canvas.width !== width || canvas.height !== height;

            if (resizeNeeded) {
                renderer.setSize(width, height, false);
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            const [x, y] = [mouseX * 0.0005, mouseY * -0.0005];

            starsSet1.position.x = x;
            starsSet1.position.y = y;

            starsSet2.position.x = x;
            starsSet2.position.y = y;

            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
        const handleMouseMove = (e:MouseEvent) => {
            [mouseX, mouseY] = [e.clientX, e.clientY];
        }
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            renderer.dispose();
            scene.remove(starsSet1);
            scene.remove(starsSet2);
            geometries.forEach(geometry => geometry.dispose());
            materials.forEach(mat => {
                mat.dispose();
                mat.map?.dispose();
            })
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])
    return <canvas ref={canvasRef} className='background'/>
}

export default Background