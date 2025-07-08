import {useState, useEffect} from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import pdf from '../assets/resume.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


function ResumePdf() {
    useEffect(() => {
        document.title = 'Nguyen\'s resume'
    }, [])
    const [width, setWidth] = useState(Math.min(window.innerWidth * 0.7, 800));
    useEffect(() => {
        const handleResizeWindow = () => {
            setWidth(Math.min(window.innerWidth * 0.7, 800));
        }
        window.addEventListener('resize', handleResizeWindow);
    }, [])

    const removeTextLayerOffset = () => {
        const textLayers = document.querySelectorAll(
            ".react-pdf__Page__textContent"
        );
        textLayers.forEach((layer: any) => {
            const { style } = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
        });
    };
    return (
        <div style={{height: width * (11/8.5), width: width}} className='overflow-hidden mx-auto'>
            <Document
                file={pdf}
                loading="Loading PDF..."
                externalLinkTarget="_blank"
            >
                <Page pageNumber={1} width={width} onLoadSuccess={removeTextLayerOffset}/>
            </Document>
        </div>
    )
}
export default function Resume() {
    return (
        <div className="resume">
            <header className="text-4xl text-center mb-5">
                <a href={pdf} target='_blank' className='underline text-sky-700'>Resume</a>
            </header>
            <ResumePdf />
        </div>
    )
}
