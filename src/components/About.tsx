import { forwardRef } from "react";

const About = forwardRef<HTMLElement>((_, ref) => (
    <section
        id="about"
        ref={ref}
        className="homepage_section homepage_about"
    >
        <h1>About</h1>
        <hr/>
        <p>
            Hi there, I'm Nguyen Vu — a highly motivated full stack software engineer with a B.Sc. in Computing Science
            from the University of Alberta (2022). I'm passionate about building innovative, impactful software
            solutions
            that blend creativity with function.
            <br/>
            <br/>
            Over the past few years, I've worked on real-world projects that span everything from food delivery
            platforms to in-game overlay applications — always with a focus on thoughtful user experience and clean
            system design.
            My journey has equipped me with a diverse skill set, from performance optimization and UX improvements
            to integrating Web3 technologies and leveraging AI tools.
            <br/>
            <br/>
            Outside of work, you'll find me dabbling in new technologies like AI, exploring digital forensics and OSINT
            for fun,
            cooking, or dancing. I'm deeply curious — about how things work and how to make them better — and I bring
            that
            curiosity into everything I build.
        </p>
    </section>
));

export default About;