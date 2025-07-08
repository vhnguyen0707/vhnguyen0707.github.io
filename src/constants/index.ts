// Global application constants
export const APP_CONSTANTS = {
    // Terminal settings
    TERMINAL: {
        MAX_VISIBLE_LINES: 19, // Calculated as Math.floor((384 - 40) / 18)
        LINE_HEIGHT: 18,
        PADDING: 20,
        CANVAS_WIDTH: 512,
        CANVAS_HEIGHT: 384,
    },
    
    // Scroll settings
    SCROLL: {
        MAX_OFFSET: 50,
    },
} as const; 