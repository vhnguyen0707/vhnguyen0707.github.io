import {useEffect, useRef} from "react";
import type {TerminalState} from "../../hooks/useTerminal";
import { TERMINAL_CONSTANTS } from "./constants";

interface HiddenInputHandlerProps {
  terminal: TerminalState;
  isActive: boolean;
}
export default function HiddenInputHandler({ terminal, isActive }: HiddenInputHandlerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isActive || terminal.isBooting) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const {totalLines, scrollOffset} = terminal;

      if (e.key.length === 1 && terminal.inputText.length + 3 < 55) {
        const newInput = terminal.inputText.slice(0, terminal.blinker.index) + e.key + terminal.inputText.slice(terminal.blinker.index);
        terminal.setInputText(newInput);
        terminal.setBlinker({index: terminal.blinker.index + 1, time: terminal.blinker.time});
        // Only auto-scroll to bottom if we're already at the bottom
        if (scrollOffset === 0) {
          terminal.setScrollOffset(0);
        }
              } else if (e.key === 'Backspace' && terminal.inputText && terminal.blinker.index > 0) {
          const newInput = terminal.inputText.slice(0, terminal.blinker.index - 1) + terminal.inputText.slice(terminal.blinker.index);
          terminal.setInputText(newInput);
          terminal.setBlinker({index: terminal.blinker.index - 1, time: terminal.blinker.time});
          // Only auto-scroll to bottom if we're already at the bottom
          if (scrollOffset === 0) {
            terminal.setScrollOffset(0);
          }
      } else if (e.key === 'ArrowLeft') {
        terminal.setBlinker({index: Math.max(0, terminal.blinker.index - 1), time: Date.now() * 0.001});
      } else if (e.key === 'ArrowRight') {
        terminal.setBlinker({index: Math.min(terminal.inputText.length, terminal.blinker.index + 1), time: Date.now() * 0.001});
      } else if (e.key === 'ArrowDown') {
        terminal.setScrollOffset(Math.max(0, scrollOffset - 1));
      } else if (e.key === 'ArrowUp') {
        const maxScroll = Math.max(0, totalLines - TERMINAL_CONSTANTS.MAX_VISIBLE_LINES); // clamp so we don’t over-scroll
        console.log('maxScroll:', maxScroll, 'current scrollOffset:', scrollOffset);
        terminal.setScrollOffset(Math.min(maxScroll, scrollOffset + 1));
      } else if (e.key === 'Tab') {
        e.preventDefault();
        terminal.autoComplete();
      } else if (e.key === 'Enter') {
        terminal.executeCommand(terminal.inputText);
        terminal.setInputText('');
        terminal.setBlinker({index: 0, time: terminal.blinker.time});
        // Always scroll to bottom when executing a command
        terminal.setScrollOffset(0);
      }
    };

    const handleBlur = () => {
      if (isActive && !terminal.isBooting) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 0);
      }
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('keydown', handleKeyDown);
      input.addEventListener('blur', handleBlur);
      input.focus();

      return () => {
        input.removeEventListener('keydown', handleKeyDown);
        input.removeEventListener('blur', handleBlur);
      };
    }
  }, [terminal, isActive]);

  if (!isActive || terminal.isBooting) return null;

  return (
      <input
          className="computer-canvas_hidden-input"
          ref={inputRef}
          autoFocus
          value=""
          onChange={() => {}}
      />
  );
}