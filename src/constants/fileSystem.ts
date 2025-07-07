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


const getId = (()=> {
    let id = 0;
    return () => id++;
})();

interface FileSystemItem {
    type: 'file' | 'directory' | 'link';
    content?: string;
    contents?: { [key: string]: FileSystemItem };
}

interface FileSystemStructure {
    root: FileSystemItem;
}

interface Project {
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
        id: getId(),
        name: 'Where\'s Waldo?',
        technologies: ['React', 'TypeScript', 'TailwindCSS', 'Firebase'],
        live: '',
        demo: '',
        code: '',
        images: [ss01],
        summary: 'Photo Tagging Game where players are presented with busy and crowded illustrations to find the hidden objects/characters.'
    },
    {
        id: getId(),
        name: 'FlickPedia',
        technologies: ['MongoDB', 'React', 'NodeJS', 'Express', 'Redux', 'MaterialUI'],
        live: 'https://flickpedia.vercel.app/',
        demo: '',
        code: 'https://github.com/vhnguyen0707/FlickPedia',
        images: [ss11, ss12, ss13],
        summary: 'An IMDB-inspired platform for entertainment fans to exlore extensive and authorative source for movie, TV, and celebrity content. Users can review and see others\' ratings and reviews for the newest movie and TV shows.'
    },
    {
        id: getId(),
        name: 'The EFCL Financial Proficiency Assessment Tool',
        technologies: ['DRF', 'PostgreSQL', 'React', 'MaterialUI', 'Jest', 'Docker', 'NGINX', 'Gunicorn'],
        live: '',
        demo: 'https://drive.google.com/file/d/1M9ZVnWc5KnsSL1X96Tpyzg6ePj8_dp7c/view',
        code: '',
        images: [ss21, ss22, ss23],
        summary: 'EFCL\'s Financial Proficiency Assessment Tool streamlines board member evaluations in community associations. With this digital solution, surveys are easily shared, responses automatically compiled, and real-time statistics empower surveyors for advanced analysis, eliminating the need for in-person meetings.'
    },
    {
        id: getId(),
        name: 'Squawker Social Distribution',
        technologies: ['DRF', 'Django Template', 'SQLite', 'HTML', 'CSS', 'jQuery', 'GithubActions'],
        live: '',
        demo: 'https://www.youtube.com/watch?v=1o0HtBtiTNk',
        code: 'https://github.com/vhnguyen0707/social-distribution',
        images: [ss32, ss31, ss33],
        summary: `A fundamentally interconnected and peer-to-peer social network platform
         that integrates with 3 other social network platforms and GitHub, enabling seamless content retrieval
         and interactions such as post sharing, friend adding, likes and comments across all integrated platforms`
    },
    {
        id: getId(),
        name: 'Mobilibrary',
        technologies: ['Java', 'Firebase', 'TravisCI'],
        live: '',
        demo: 'https://drive.google.com/file/d/17a5Ku1gbrIqqWongq8DNw87nulS4A793/view?usp=sharing',
        code: 'https://github.com/CMPUT301F20T33/MobiLibrary/wiki',
        images: [ss41, ss42, ss43],
        summary: 'An Android app providing book lovers with a convenient way to borrow and lend books online. The app has built-in ISBN barcode scanner for easy and quick search, adding and returning books, and integrated Google Maps API for scheduling a meet-up.'
    },
    {
        id: getId(),
        name: 'GoMoku',
        technologies: ['Python'],
        live: '',
        demo: '',
        code: 'https://github.com/vhnguyen0707/GoBot.git',
        images: [ss51],
        summary: 'A competitive GoMoku bots that can play against Medium-level human player to participate in CMPUT455 tournament and placed 3rd. The bot is strengthend in finding the possible most rewarding moved with the combination of Monte Carlo tree, alpha-beta pruning search, and heuristic search.'
    }
]

export const FileSystem: FileSystemStructure = {
    "root": {
        type: "directory",
        contents: {
            "projects": {
                type: "directory",
                contents: projects.reduce((acc, project) => {
                    acc[`${project.name.split(" ").join("_")}`] = {
                        type: "file",
                        content: project.summary,
                    };
                    return acc;
                }, {})},
            "about.txt": {
                type: "file",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            "experience.txt": {
                type: "file",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
        }},
    };