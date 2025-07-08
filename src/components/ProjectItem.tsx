import type { Project } from "../constants/fileSystem";
import ProjectImagesCarousel from "./ProjectImagesCarousel";

export default function ProjectItem({project}: {project: Project}) {
    return <div className="homepage_projects_item">
        <div className="homepage_projects_item_name"><h2>{project.name}</h2></div>
        <div className="homepage_projects_item_images">
            <ProjectImagesCarousel images={project.images}/>
        </div>
        <div className="homepage_projects_item_metadata">
            <h4>Links:</h4>
            <div className="homepage_projects_item_metadata_row">
                {project.live && <a href={project.live} target="_blank" className="chip">🚀 Live Preview</a>}
                {project.demo && <a href={project.demo} target="_blank" className="chip">🎥 Demo Video</a>}
                {project.code && <a href={project.code} target="_blank" className="chip">💻 Source Code</a>}
            </div>

            <h4>Techonologies:</h4>
            <div className="homepage_projects_item_metadata_row">
                {project.technologies.map(item => <div className="chip" key={item}>{item}</div>)}
            </div>
        </div>
        <div className="homepage_projects_item_desc">
            {project.summary}
        </div>
    </div>
}