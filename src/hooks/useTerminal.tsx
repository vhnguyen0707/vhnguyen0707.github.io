import {useEffect, useState} from "react";
import {FileSystem} from "../constants/fileSystem";


interface Blinker {
    index: number;
    time: number;
}

export interface TerminalState {
    displayText: string;
    inputText: string;
    setInputText: (text: string) => void;
    executeCommand: (command: string) => void;
    autoComplete: () => void;
    blinker: Blinker;
    setBlinker: (blinker: Blinker) => void;
    isBooting: boolean;
    scrollOffset: number;
    setScrollOffset: (offset: number) => void;
    outputsText: string;
}

// const FileSystem: FileSystemStructure = {
//     "root": {type: "directory", contents: {
//         "projects": {type: "directory", contents: {
//                 "projects.txt": {type: "file", content: "Below are some of the projects I have developed over\nmy 6+ years of coding. This is just a small selection\nof the many projects I've worked on, with several\nothers not making the list. Please note that some of\nthese projects are unfinished—either because I lacked\nthe necessary skills at the time or simply moved on to\nmore interesting challenges. However, rest assured I\nplan to revisit and polish these projects in the future\nimproving their code with my current level of expertise."},
//                 "lighting_engine.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/Pygame_Lighting_Engine"},
//                 "wakeword_engine.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/Python-Wake-Word-Engine"},
//                 "square_game_halloween.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/Square-Game-Halloween"},
//                 "personal_website.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/luckeyduckey.github.io/tree/main"},
//                 "password_vault.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/Password-Vault"},
//                 "jarvis.lnk": {type: "link", content: "https://github.com/LuckeyDuckey/Jarvis"},
//             }},
//         "about.txt": {type: "file", content: "I'm an aspiring software developer with a passion\nfor exploring the vast possibilities of programming.\nI've been coding since I was 12, starting with small\ngames in Python and evolving into a diverse range of\nprojects. Over the years, I've delved into AI,\nmachine learning, graphics programming, cybersecurity\nand web development. My experience spans from creating\nvirtual assistants and VR applications to developing\nshaders and procedurally generated visuals. I'm driven\nby a love for technology and a desire to learn, create\nand solve complex problems. I'm proficient in Python\nC++, JavaScript, and C#, with Python being my\nstrongest language."},
//         "experience.txt": {type: "file", content: "Error 404 not found. That's right I have no\nprofessional in industry experience, however I still\nbring over 6 years of hands-on experience in coding\nand software development from personal projects and\nself-driven learning. I've tackled a wide range of\nchallenges, from developing AI-powered virtual\nassistants and machine learning models to creating\ngraphics and VR applications. My projects have allowed\nme to build strong skills in Python, C++, JavaScript\nand C#, and I've gained a solid foundation in problem\nsolving, collaboration, and adaptability. I'm eager\nto apply my knowledge and passion for technology in\na professional setting, where I can continue to learn\nand grow as a software developer."},}},
// };

export default function useTerminal(): TerminalState {
    const [outputsText, setOutputsText] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const [directory, setDirectory] = useState<string>('C:/Users/guest');
    const [scrollOffset, setScrollOffset] = useState<number>(0);
    const [blinker, setBlinker] = useState<Blinker>({index: 0, time: Date.now() * 0.001});
    const [bootTime, setBootTime] = useState<number>(0);
    const [isBooting, setIsBooting] = useState<boolean>(true);

    // Boot sequence
    useEffect(() => {
        const interval = setInterval(() => {
            setBootTime(prev => prev + 0.1);
        }, 100);

        const bootTimeout = setTimeout(() => {
            setIsBooting(false);
            clearInterval(interval);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(bootTimeout);
        };
    }, []);

    // Generate boot sequence text
    const getBootSequence = (): string => {
        let bootText = "";
        const loadingChars = ["-", "\\", "|", "/"];

        if (bootTime > 0.1) bootText += "███╗   ██╗ ██████╗ ██╗   ██╗██╗   ██╗███████╗███╗   ██╗\n";
        if (bootTime > 0.2) bootText += "████╗  ██║██╔════╝ ██║   ██║╚██╗ ██╔╝██╔════╝████╗  ██║\n";
        if (bootTime > 0.3) bootText += "██╔██╗ ██║██║  ███╗██║   ██║ ╚████╔╝ █████╗  ██╔██╗ ██║\n";
        if (bootTime > 0.4) bootText += "██║╚██╗██║██║   ██║██║   ██║  ╚██╔╝  ██╔══╝  ██║╚██╗██║\n";
        if (bootTime > 0.5) bootText += "██║ ╚████║╚██████╔╝╚██████╔╝   ██║   ███████╗██║ ╚████║\n";
        if (bootTime > 0.6) bootText += "╚═╝  ╚═══╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═══╝\n";
        if (bootTime > 1.1) bootText += "Welcome to Nguyen-OS 2.0.0 x86_64\n";
        if (bootTime > 1.2) bootText += "Type 'help' to list available commands\n";
        if (bootTime > 1.7) bootText += `Loading ${loadingChars[Math.ceil((Math.min(3.7, bootTime) % 0.4) / 0.1) - 1]} ${Math.ceil(Math.min(100, (bootTime - 1.7) / 0.02))}%\n`;
        if (bootTime > 4.0) bootText += "Complete!\n\n";

        return bootText;
    };

    // List files in current directory
    const listFiles = (): string => {
        let directoryContents = FileSystem.root;
        const pathParts = directory.slice(15).split("/").filter(Boolean);

        for (const dir of pathParts) {
            if (directoryContents.contents && directoryContents.contents[dir]) {
                directoryContents = directoryContents.contents[dir];
            }
        }

        let result = `\nC:/../${directory.split("/").slice(-1)}`;
        const files = Object.keys(directoryContents.contents || {});

        for (const [index, file] of files.entries()) {
            result += `\n${index === files.length - 1 ? "┗" : "┣"}${file.includes(".") ? "━▷" : "━━━━"} ${file}`;
        }

        return result + "\n\n";
    };

    // Change directory
    const changeDirectory = (inputDirectory: string): string => {
        let currentDirectory = directory.slice(15).split("/").filter(Boolean);

        if (inputDirectory === "..") {
            currentDirectory.pop();
        } else if (inputDirectory === "/") {
            currentDirectory = [];
        } else {
            let directoryContents = FileSystem.root;
            for (const dir of currentDirectory) {
                if (directoryContents.contents && directoryContents.contents[dir]) {
                    directoryContents = directoryContents.contents[dir];
                }
            }

            if (directoryContents.contents &&
                directoryContents.contents[inputDirectory] &&
                directoryContents.contents[inputDirectory].type === "directory") {
                currentDirectory.push(inputDirectory);
            } else {
                return `\ncd: '${inputDirectory}' No such directory\n\n`;
            }
        }

        setDirectory(`C:/Users/guest${currentDirectory.length ? "/" : ""}${currentDirectory.join("/")}`);
        return "";
    };

    // Start file
    const startFile = (inputFile: string): string => {
        let directoryContents = FileSystem.root;
        const pathParts = directory.slice(15).split("/").filter(Boolean);

        for (const dir of pathParts) {
            if (directoryContents.contents && directoryContents.contents[dir]) {
                directoryContents = directoryContents.contents[dir];
            }
        }

        if (directoryContents.contents && directoryContents.contents[inputFile]) {
            const file = directoryContents.contents[inputFile];

            if (file.type === "file") {
                return `\n${file.content}\n\n`;
            } else if (file.type === "link") {
                window.open(file.content);
                return `\nRedirecting to '${file.content}'\n\n`;
            }
        }

        return `\nshow: '${inputFile}' No such file\n\n`;
    };

    // Execute command
    const executeCommand = (command: string): void => {
        const [cmd, ...args] = command.split(" ");
        let result = "";

        switch (cmd) {
            case "ls":
                if (args.length) {
                    result = "\nError: 'ls' doesn't accept any arguments\n\n";
                } else {
                    result = listFiles();
                }
                break;

            case "cd":
                if (args.length > 1) {
                    result = "\nError: 'cd' doesn't accept more than one argument\n\n";
                } else {
                    result = changeDirectory(args[0] || "");
                }
                break;

            case "show":
                if (args.length > 1) {
                    result = "\nError: 'show' doesn't accept more than one argument\n\n";
                } else {
                    result = startFile(args[0] || "");
                }
                break;

            case "clear":
                if (args.length) {
                    result = "\nError: 'clear' doesn't accept any arguments\n\n";
                } else {
                    setOutputsText('');
                    setScrollOffset(0);
                    return;
                }
                break;

            case "help":
                if (args.length) {
                    result = "\nError: 'help' doesn't accept any arguments\n\n";
                } else {
                    result = "\nPress 'tab' for auto complete\n\nLS       Lists current directory contents\nCD       Change directory, '..' moves back, '/' to root\nSHOW    Opens specified file in current directory\nCLEAR    Clears all previous terminal outputs\n\n";
                }
                break;

            case "":
                break;

            default:
                result = `\nCommand not found '${cmd}'\n\n`;
        }

        setOutputsText(prev => prev + `${directory}> ${command}\n` + result);
    };

    // Auto complete
    const autoComplete = (): void => {
        const [cmd, ...args] = inputText.split(" ");
        const commandsList = ["ls", "cd", "show", "clear", "help"];

        if (!args.length) {
            const completedCommand = commandsList.filter(element => element.startsWith(cmd));
            if (completedCommand.length) {
                setInputText(completedCommand[0]);
                setBlinker({index: completedCommand[0].length, time: Date.now() * 0.001});
            }
        }

        if (["cd", "show"].includes(cmd) && args.length < 2) {
            let directoryContents = FileSystem.root;
            const pathParts = directory.slice(15).split("/").filter(Boolean);

            for (const dir of pathParts) {
                if (directoryContents.contents && directoryContents.contents[dir]) {
                    directoryContents = directoryContents.contents[dir];
                }
            }

            const possibleCompletions = Object.keys(directoryContents.contents || {})
                .filter(item => item.startsWith(args[0] || ""));
            if (possibleCompletions.length) {
                const newInput = `${cmd} ${possibleCompletions[0]}`;
                setInputText(newInput);
                setBlinker({index: newInput.length, time: Date.now() * 0.001});
            }
        }
    };

    // Get display text
    const getDisplayText = (): string => {
        // Always show the boot sequence at the top
        let finalText = getBootSequence();

        if (isBooting) {
            return finalText;
        }

        // Add terminal output after boot sequence
        const lines = outputsText.split("\n");
        const displayLines = lines.slice(scrollOffset, Math.min(scrollOffset + 30, lines.length));
        finalText += displayLines.join("\n");

        if (scrollOffset + 30 >= lines.length) {
            const currentTime = Date.now() * 0.001;
            const showCursor = (currentTime - blinker.time) % 1 < 0.5;

            if (showCursor) {
                finalText += `${directory}> ${inputText.slice(0, blinker.index)}█${inputText.slice(blinker.index + 1)}`;
            } else {
                finalText += `${directory}> ${inputText}`;
            }
        }

        return finalText;
    };

    return {
        displayText: getDisplayText(),
        inputText,
        setInputText,
        executeCommand,
        autoComplete,
        blinker,
        setBlinker,
        isBooting,
        scrollOffset,
        setScrollOffset,
        outputsText
    };
}