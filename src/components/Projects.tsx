import React from 'react'
import { projects } from './constants'
import ProjectItem from './ProjectItem'
const Projects:React.FC = () => {
  return (
    <div id="projects">
      <h1 className='text-[30px] font-bold'>Projects</h1>
      {projects.map(project => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  )
}

export default Projects