import ss01 from '../assets/projects/WheresWaldo/ss1.png';
import ss11 from '../assets/projects/FlickPedia/ss1.png';
import ss12 from '../assets/projects/FlickPedia/ss2.png';
import ss13 from '../assets/projects/FlickPedia/ss3.png';
import ss21 from '../assets/projects/efcl/ss1.png';
import ss22 from '../assets/projects/efcl/ss2.png';
import ss23 from '../assets/projects/efcl/ss3.png';
import ss31 from '../assets/projects/squawker/Home.png';
import ss32 from '../assets/projects/squawker/MyPost.png';
import ss33 from '../assets/projects/squawker/friends.png';
import ss41 from '../assets/projects/mobilibrary/ss1.png'
import ss42 from '../assets/projects/mobilibrary/ss2.png'
import ss43 from '../assets/projects/mobilibrary/ss3.png'
import ss51 from '../assets/projects/gomoku/ss1.png'
import devourgo1 from "../assets/projects/Devour/DevourGO1.png";
import devourgo2 from "../assets/projects/Devour/DevourGO2.png";
import devourgo3 from "../assets/projects/Devour/DevourGO3.png";
import devourgo4 from "../assets/projects/Devour/DevourGO4.png";
import devourgo5 from "../assets/projects/Devour/DevourGO5.png";

import devourplay1 from "../assets/projects/Devour/DevourPlay1.png";
import devourplay2 from "../assets/projects/Devour/DevourPlay2.png";
import summarAIze1 from "../assets/projects/SummarAIze/demo1.png";
import summarAIze2 from "../assets/projects/SummarAIze/demo2.png";
import summarAIzeVideo from "../assets/projects/SummarAIze/SummarAIze-demo.mp4";


interface FileSystemItem {
    type: 'file' | 'directory' | 'link';
    content?: string;
    contents?: { [key: string]: FileSystemItem };
}

interface FileSystemStructure {
    root: FileSystemItem;
}

export interface Project {
    id: number;
    name: string;
    technologies: string[];
    live: string;
    demo: string;
    code: string;
    images: string[];
    summary: string;
}

export const projects: Array<Project> = [
    {
        id: 1,
        name: "DevourGO - Food Delivery Platform",
        technologies: ["NodeJS", "React", "TypeScript", "MongoDB", "ExpressJS", "GCP", "Terraform", "Docker"],
        live: "https://devourgo.io/",
        demo: "",
        code: "",
        images: [devourgo1, devourgo2, devourgo3, devourgo4, devourgo5],
        summary: "DevourGO is a next-generation food ordering platform that blends traditional delivery services with Web3-powered " +
            "rewards and gamification. I contributed to the development and maintenance of core features across the admin, merchant, " +
            "and customer portals. My work spanned both frontend and backend systems, supporting experiences like interactive brand maps, " +
            "community and guild leaderboars NFT-based reward flows, and on-chain payment integration. The platform offers a seamless and engaging way for users to earn and " +
            "redeem digital assets while ordering food.",
    },
    {
        id: 2,
        name: "DevourPlay - In-Game Food Ordering Overlay",
        technologies: ["JavaScript", "NodeJS", "TypeScript", "Overwolf API"],
        live: "https://www.overwolf.com/app/devour-devourplay",
        demo: "https://drive.google.com/file/d/1GLVWcyY7qpk5D0SWG-5KJGz7MsZQtO0h/view?usp=drive_link",
        code: "",
        images: [devourplay1, devourplay2],
        summary: "DevourPlay is a PC gaming overlay app built with Overwolf that lets users order food from DevourGO without " +
            "leaving their game. I played a key role in integrating DevourGO’s backend with the in-game experience—focusing on " +
            "real-time data syncing, reward redemption, and gamer-friendly UI components. The app bridges gaming and food delivery" +
            ", offering a unique and immersive way to enhance gameplay with real-world incentives.",
    },
    {
        id: 3,
        name: "SummarAIze",
        technologies: ['React', 'TypeScript', 'TailwindCSS', "Chrome Extension API", 'OpenAI API'],
        live: "",
        demo: "",
        code: "https://github.com/vhnguyen0707/summarAIze",
        images: [summarAIze1, summarAIze2, summarAIzeVideo],
        summary: "SummarAIze is a Chrome extension that automatically detects, grabs transcripts and generates intelligent " +
            "summaries of YouTube videos using advanced AI technology. The extension extracts video transcripts and leverages " +
            "large language models to create concise, bullet-point summaries that highlight the main topics and key insights from" +
            "any YouTube video."
    },
    {
        id: 4,
        name: 'Where\'s Waldo?',
        technologies: ['React', 'TypeScript', 'TailwindCSS', 'Firebase'],
        live: '',
        demo: '',
        code: 'https://github.com/vhnguyen0707/wheres-waldo',
        images: [ss01],
        summary: 'Photo Tagging Game where players are presented with busy and crowded illustrations to find the hidden objects/characters.'
    },
    {
        id: 5,
        name: 'FlickPedia',
        technologies: ['MongoDB', 'React', 'NodeJS', 'Express', 'Redux', 'MaterialUI'],
        live: 'https://flickpedia.vercel.app/',
        demo: '',
        code: 'https://github.com/vhnguyen0707/FlickPedia',
        images: [ss11, ss12, ss13],
        summary: 'An IMDb-inspired platform for entertainment fans to exlore extensive and authorative source for movie, TV, and celebrity content. Users can review and see others\' ratings and reviews for the newest movie and TV shows.'
    },
    {
        id: 6,
        name: 'The EFCL Financial Proficiency Assessment Tool',
        technologies: ['DRF', 'PostgreSQL', 'React', 'MaterialUI', 'Jest', 'Docker', 'Nginx', 'Gunicorn'],
        live: '',
        demo: 'https://drive.google.com/file/d/1M9ZVnWc5KnsSL1X96Tpyzg6ePj8_dp7c/view',
        code: '',
        images: [ss21, ss22, ss23],
        summary: 'EFCL\'s Financial Proficiency Assessment Tool streamlines board member evaluations in community associations. With this digital solution, surveys are easily shared, responses automatically compiled, and real-time statistics empower surveyors for advanced analysis, eliminating the need for in-person meetings.'
    },
    {
        id: 7,
        name: 'Squawker Social Distribution',
        technologies: ['DRF', 'Django Template', 'SQLite', 'HTML', 'CSS', 'jQuery'],
        live: '',
        demo: 'https://www.youtube.com/watch?v=1o0HtBtiTNk',
        code: 'https://github.com/vhnguyen0707/social-distribution',
        images: [ss32, ss31, ss33],
        summary: `A fundamentally interconnected and peer-to-peer social network platform
         that integrates with 3 other social network platforms and GitHub, enabling seamless content retrieval
         and interactions such as post sharing, friend adding, likes and comments across all integrated platforms`
    },
    {
        id: 8,
        name: 'Mobilibrary',
        technologies: ['Java', 'Firebase', 'TravisCI'],
        live: '',
        demo: 'https://drive.google.com/file/d/17a5Ku1gbrIqqWongq8DNw87nulS4A793/view?usp=sharing',
        code: 'https://github.com/CMPUT301F20T33/MobiLibrary/wiki',
        images: [ss41, ss42, ss43],
        summary: 'An Android app providing book lovers with a convenient way to borrow and lend books online. The app has built-in ISBN barcode scanner for easy and quick search, adding and returning books, and integrated Google Maps API for scheduling a meet-up.'
    },
    {
        id: 9,
        name: 'GoMoku',
        technologies: ['Python'],
        live: '',
        demo: '',
        code: 'https://github.com/vhnguyen0707/GoBot.git',
        images: [ss51],
        summary: 'A competitive GoMoku bot that can play against Medium-level human player to participate in CMPUT455 tournament and placed 3rd. The bot is strengthend in finding the possible most rewarding moved with the combination of Monte Carlo tree, alpha-beta pruning search, and heuristic search.'
    }
]

export interface Experience {
    id: number,
    time: string;
    title: string;
    company: string;
    location: string;
    description: string;
}
export const experiences: Array<Experience> = [
    {
        id: 1,
        time: "October 2023 - May 2025",
        company: "Devour Next Canada Inc.",
        title: "Fullstack Software Engineer",
        location: "Vancouver, British Columbia, Canada",
        description: "• Developed and maintained key features across admin, merchant, and customer portals of DevourGO app, including Checkout and " +
            "Promotional Brand Maps, significantly enhancing user experience and platform functionality.\n" +
            "• Key team member responsible for the redesign and implementation of the DevourGO side of DevourPlay, an innovative " +
            "in-game overlay app leveraging the Overwolf API, driving 20% user growth and increasing daily active engagement by 40%, " +
            "allowing seamless rewards redemption and food ordering in the game.\n" +
            "• Enhanced system reliability by extending SimpleHash webhook API response handling, implementing cron jobs via GCP Cloud " +
            "Scheduler to efficiently manage digital NFT ownership transfer tracking and error recovery.\n" +
            "• Developed robust on-chain payment processing solutions utilizing ETH and Solana’s FUELX cryptocurrency, significantly " +
            "improving transaction efficiency and platform scalability.\n" +
            "• Improved performance by refining MongoDB aggregation pipelines and front-end data fetching processes, reducing page load times " +
            "by approximately 35%.\n" +
            "• Monitored system performance using GCP, rapidly addressing critical alerts and proactively resolving software issues, maintaining " +
            "a 99.9% application uptime SLA to ensure continuous platform availability.\n" +
            "• Created automated test suites using Jest and Playwright, improving error detection, reducing bugs, and increasing development " +
            "efficiency.\n" +
            "• Led technical execution for major platform features including Blockchain Reward Redemption, Gaming Guild integrations, and " +
            "Embeddable Widgets, optimizing database architecture and enhancing API performance with ExpressJS.\n" +
            "• Technologies: MongoDB, ReactJS, NodeJS, ExpressJS, TypeScript, Docker, GCP, Terraform."
    },
    {
        id: 2,
        time: "July 2022 - March 2023",
        company: "SIC Education",
        title: "System Analyst Intern",
        location: "Hanoi, Vietnam",
        description: "• Developed and launched a comprehensive MongoDB, Express, React, and Node (MERN) stack application for efficient schedule " +
            "and payroll management, significantly increasing productivity by 40% and reducing manual data entry errors by 30%.\n" +
            "• Delivered timely and effective technical support, including troubleshooting and maintenance of IT hardware, enhancing overall " +
            "operational reliability.\n" +
            "• Conducted in-depth system analysis, implemented robust software solutions, and optimized data processes, ensuring consistent " +
            "system reliability, accurate data management, and high user satisfaction.\n" +
            "• Technologies: MongoDB, ReactJS, NodeJS, ExpressJS."
    },
    {
        id: 3,
        time: "2021 - 2022",
        company: "University of Alberta",
        title: "Teaching Assistant & Software Developer",
        location: "Edmonton, Alberta, Canada",
        description: "• Developed and maintained websites, implementing front-end features and automated data scraping solutions with Python, " +
            "resulting in a 50% reduction in data processing time for research teams.\n" +
            "• Built a full-stack application supporting seamless CRUD operations for research inventory management, enhancing efficiency and " +
            "data management capabilities.\n" +
            "• Designed and implemented a Covid check-in system using Google Apps Script to automate daily data reporting to lab managers, " +
            "significantly streamlining lab management processes.\n" +
            "• Managed lab setups, assignment grading, and provided direct student support, facilitating learning outcomes and student success.\n" +
            "• Technologies: Django, PostgreSQL, SQLite, ReactJS."
    },
]

export const FileSystem: FileSystemStructure = {
    "root": {
        type: "directory",
        contents: {
            "projects": {
                type: "directory",
                contents: projects.reduce((acc, project) => {
                    acc[`${project.name.split(" ").join("_")}.txt`] = {
                        type: "file",
                        content: project.summary,
                    };
                    return acc;
                }, {} as Record<string, FileSystemItem>)
            },
            "experiences": {
                type: "directory",
                contents: experiences.reduce((acc, exp) => {
                    acc[`${exp.company.split(" ").join("_")}.txt`] = {
                        type: "file",
                        content: exp.description,
                    };
                    return acc;
                }, {} as Record<string, FileSystemItem>)
            },
            "about.txt": {
                type: "file",
                content: "Hi there, I'm Nguyen Vu — a highly motivated full stack software engineer with a B.Sc. in Computing" +
                    " Science from the University of Alberta (2022). I'm passionate about building innovative, impactful software solutions that blend creativity with function.\n\n" +
                    "Over the past few years, I've worked on real-world projects that span everything from food delivery platforms to in-game overlay applications — always with a focus on thoughtful user experience and clean system design. " +
                    "My journey has equipped me with a diverse skill set, from performance optimization and UX improvements to integrating Web3 technologies and leveraging AI tools.\n\n" +
                    "Outside of work, you'll find me dabbling in new technologies like AI, exploring digital forensics and OSINT for fun," +
                    " cooking, or dancing."
            },
        }},
    };
