import React, { forwardRef } from "react";

const About = forwardRef<HTMLElement>((props, ref) => (
  <section
    id="about"
    ref={ref}
    style={{ height: "80vh", marginBottom: "40px" }}
    {...props}
  >
    <h1>About</h1>
    <p>About me...</p>
  </section>
));

export default About; 