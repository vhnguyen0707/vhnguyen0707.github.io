import { forwardRef } from "react";

const Technologies = forwardRef<HTMLElement>((_, ref) => (
    <section
        id="technologies"
        ref={ref}
        style={{height: "80vh", marginBottom: "40px"}}
        className="homepage_section homepage_about"
    >
        <h1>Technologies</h1>
        <hr/>

        <p>About me...</p>
    </section>
));

export default Technologies;