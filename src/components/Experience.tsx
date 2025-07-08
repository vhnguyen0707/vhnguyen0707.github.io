import { forwardRef } from "react";
import {experiences, type Experience} from "../constants/fileSystem";

const ExperienceItem = ({exp, isLast} : {exp: Experience, isLast: boolean}) => {
    return <div className="exp-item">
        {/*  Vertical line   */}
        {!isLast && <div className="exp-item_line" />}
        {/* Circle marker    */}
        <div className="exp-item_marker"><div className="exp-item_marker_inner" /></div>

    {/*    Content */}
        <div className="exp-item_details">
            <div className="exp-item_details_time">{exp.time}</div>
            <h3>{exp.title} <span className="company">@ {exp.company}</span></h3>
            <ul>
                {exp.description.replace(/• /g, "").split("\n").map((item, idx) => (
                    <li key={`${exp.id}_${idx}`}>{item}</li>
                ))}
            </ul>
        </div>
    </div>
}

const Experiences = forwardRef<HTMLElement>((_, ref) => (
    <section
        id="experiences"
        ref={ref}
        className="homepage_section homepage_exp"
    >
        <h1>Experiences</h1>
        <hr/>
        <div className="homepage_exp_content">
            {experiences.map((exp, idx) =>
                <ExperienceItem exp={exp} isLast={idx === experiences.length - 1} key={exp.id}/>)}
        </div>
    </section>
));

export default Experiences