import { forwardRef } from "react";

const Projects = forwardRef<HTMLElement>((_, ref) => (
    <section
        id="projects"
        ref={ref}
        style={{height: "80vh", marginBottom: "40px"}}
        className="homepage_section homepage_about"
    >
        <h1>Projects</h1>
        <hr/>
        <p>About me...</p>
    </section>
));

export default Projects;