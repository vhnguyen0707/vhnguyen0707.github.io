import { forwardRef } from "react";
import {projects} from "../constants/fileSystem";
import ProjectItem from "./ProjectItem";

const Projects = forwardRef<HTMLElement>((_, ref) => (
    <section
        id="projects"
        ref={ref}
        // style={{height: "80vh"}}
        className="homepage_section homepage_projects"
    >
        <h1>Projects</h1>
        <hr/>
        {projects.map(project => <ProjectItem project={project} key={project.id}/>)}
    </section>
));

export default Projects;