import {useEffect, useState} from "react";
import {FileSystem} from "../constants/fileSystem";
import {TERMINAL_CONSTANTS} from "../components/webgl/constants";


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
    totalLines: number;
}

const wordWrap = (text: string, maxWidth: number): string => {
    // Split by explicit line breaks first
    return text.split('\n').map(line => {
        const words = line.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxWidth) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) lines.push(currentLine);

        return lines.join('\n');
    }).join('\n');
};

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
        }, 50);

        const bootTimeout = setTimeout(() => {
            setIsBooting(false);
            clearInterval(interval);
        }, 2500);

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
        if (bootTime > 2.0) bootText += "Complete!\n";

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
                const wrappedContent = wordWrap(file.content || "", 50);
                return `\n${wrappedContent}\n\n`;
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
                    result = "\nPress 'tab' for auto complete\n\nLS       Lists current directory contents\nCD       Changes directory, '..' moves back, '/' to root\nSHOW     Opens specified file in current directory\nCLEAR    Clears all previous terminal outputs\n\n";
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

    // Helper function to get total line count for scrolling
    const getAllLines = () => {
        const bootLines = getBootSequence().split("\n");
        const outputLines = outputsText.split("\n");
        return [...bootLines, ...outputLines];
    }

    // Get display text
    const getDisplayText = (): string => {
        // Always show the boot sequence at the top

        if (isBooting) {
            return getBootSequence();
        }
        let finalText = "";
        // Combine boot sequence and outputs for scrolling
        const allLines = getAllLines();
        // const maxVisible = TERMINAL_CONSTANTS.MAX_VISIBLE_LINES;
        const totalLines = allLines.length;

        // Show the last maxVisible lines, or scroll up if needed
        const start = Math.max(0, totalLines - TERMINAL_CONSTANTS.MAX_VISIBLE_LINES - scrollOffset);
        const end = Math.max(0, totalLines - scrollOffset);
        const displayLines = allLines.slice(start, end);

        finalText += displayLines.join("\n");
        if (scrollOffset === 0) {
            const currentTime = Date.now() * 0.001;
            const showCursor = (currentTime - blinker.time) % 1 < 0.5;

            if (showCursor) {
                finalText += `${directory}> ${inputText.slice(0, blinker.index)}█${inputText.slice(blinker.index)}`;
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
        outputsText,
        totalLines: getAllLines().length,
    };
}
