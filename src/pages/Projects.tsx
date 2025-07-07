import React, { forwardRef } from "react";

const Projects = forwardRef<HTMLElement>((props, ref) => (
  <section
    id="projects"
    ref={ref}
    style={{ height: "80vh", marginBottom: "40px" }}
    {...props}
  >
    <h1>Projects</h1>
    <p>My projects...</p>
  </section>
));

export default Projects; 