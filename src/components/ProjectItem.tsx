import {useRef} from 'react';
import { useInView } from 'framer-motion';
type ItemProps = {
    id: number,
    name: string,
    technologies: string[],
    live: string,
    demo: string, 
    code: string,
    images: string[],
    summary: string
}

// https://www.framer.com/motion/use-in-view/
const ProjectItem = ({ project }:{project: ItemProps}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true});
    console.log(isInView)
    return (
        <div ref={ref} className='flex flex-col border-b p-3 border-b-white/50 last:border-b-0 gap-4'>
            <h3 className={`${isInView ? 'transform': ''} opacity-0 project title text-xl`}>{project.name}</h3>
            <div className={`${isInView ? 'transform': ''} opacity-0 project info project-transform-info flex -lg:flex-col`}>
                <div className='flex-[50%]'>
                    <div className='overflow-hidden max-h-[400px] border-2 border-white/50 rounded-xl'>
                    <img src={project.images[0]} 
                        alt={project.name} 
                        loading="lazy" 
                        className={`${project.name==='Squawker Social Distribution' ? 'scale-110': ''} mx-auto hover:scale-125 transition duration-300`}/>
                    </div>
                </div>
                <div className='flex-[50%] p-5 md:px-8 flex flex-col gap-3 text-justify'>
                    <div>
                        <h3 className='text-lg font-semibold'>Summary</h3>
                        <p className='font-light'>{project.summary}</p>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold'>Technologies</h3>
                        <p>{project.technologies.join(', ')}</p>
                    </div>
                    <div className='mt-4 flex gap-5'>
                        {!!project.live && <a href={project.live} target='_blank' className='border border-white/50 p-2 rounded-lg'><span className='whitespace-nowrap'>🚀 Live Preview</span></a>}
                        {!!project.demo && <a href={project.demo} target='_blank' className='border border-white/50 p-2 rounded-lg'><span className='whitespace-nowrap'>🎥 Demo Video</span></a>}
                        {!!project.code && <a href={project.code} target='_blank' className='border border-white/50 p-2 rounded-lg'><span className='whitespace-nowrap'>💻 Source Code</span></a>}
                    </div>
                </div>
            </div>

        </div>
  )
}

export default ProjectItem