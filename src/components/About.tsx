import { forwardRef } from "react";
import { isMobile } from "react-device-detect";

const About = forwardRef<HTMLElement>((_, ref) => (
    <section
        id="about"
        ref={ref}
        className="homepage_section homepage_about"
    >
        <h1>About</h1>
        <hr/>
        <div>
            Hi there, I'm Nguyen Vu — a highly motivated full stack software engineer with a B.Sc. in Computing Science
            from the University of Alberta (2022). I'm passionate about building innovative, impactful software
            solutions that blend creativity with function.
            <br/>
            <br/>
            Over the couple of years, I've worked on real-world projects that span everything from food delivery
            platforms to in-game overlay applications, always with a focus on thoughtful user experience and clean
            system design.
            My journey has equipped me with a diverse skill set, from performance optimization and UX improvements
            to integrating Web3 technologies and leveraging AI tools.
            <br />
            <br />
            I thrive in collaborative environments, and I take pride in being a supportive team member — someone who’s always willing
            to share knowledge, mentor junior developers, and help unblock teammates. I believe the best products come from open
            communication and shared curiosity.
            <br/>
            <br/>
            Outside of work, you'll find me dabbling in new technologies like AI, exploring digital forensics and OSINT
            for fun,
            cooking, or dancing. I'm deeply curious — about how things work and how to make them better — and I bring
            that
            curiosity into everything I build.

            <br/>
            <br/>
            Here are a few technologies I’ve been working with recently:
            <ul className="homepage_about_technologies">
                <li>JavaScript (ES6+)</li>
                <li>TypeScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>Python</li>
                <li>{isMobile ? "DRF" : "Django Rest Framework"}</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>GCP</li>
                <li>Docker</li>
            </ul>
        </div>
    </section>
));

export default About;