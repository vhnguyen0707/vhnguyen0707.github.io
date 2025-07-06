import {useEffect, useRef} from "react";
import type {TerminalState} from "../../hooks/useTerminal";

interface HiddenInputHandlerProps {
  terminal: TerminalState;
  isActive: boolean;
}
export default function HiddenInputHandler({ terminal, isActive }: HiddenInputHandlerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isActive || terminal.isBooting) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const linesCount = terminal.outputsText.split('\n').length;

      if (e.key.length === 1 && terminal.inputText.length + 3 < 55) {
        const newInput = terminal.inputText.slice(0, terminal.blinker.index) + e.key.toLowerCase() + terminal.inputText.slice(terminal.blinker.index);
        terminal.setInputText(newInput);
        terminal.setBlinker({index: terminal.blinker.index + 1, time: Date.now() * 0.001});
        if (terminal.scrollOffset < linesCount - 30) {
          terminal.setScrollOffset(Math.max(0, linesCount - 30));
        }
      } else if (e.key === 'Backspace' && terminal.inputText && terminal.blinker.index > 0) {
        const newInput = terminal.inputText.slice(0, terminal.blinker.index - 1) + terminal.inputText.slice(terminal.blinker.index);
        terminal.setInputText(newInput);
        terminal.setBlinker({index: terminal.blinker.index - 1, time: Date.now() * 0.001});
        if (terminal.scrollOffset < linesCount - 30) {
          terminal.setScrollOffset(Math.max(0, linesCount - 30));
        }
      } else if (e.key === 'ArrowLeft') {
        terminal.setBlinker({index: Math.max(0, terminal.blinker.index - 1), time: Date.now() * 0.001});
      } else if (e.key === 'ArrowRight') {
        terminal.setBlinker({index: Math.min(terminal.inputText.length, terminal.blinker.index + 1), time: Date.now() * 0.001});
      } else if (e.key === 'ArrowDown') {
        terminal.setScrollOffset(Math.max(0, terminal.scrollOffset - 1));
      } else if (e.key === 'ArrowUp') {
        terminal.setScrollOffset(Math.min(linesCount - 1, terminal.scrollOffset + 1));
      } else if (e.key === 'Tab') {
        e.preventDefault();
        terminal.autoComplete();
      } else if (e.key === 'Enter') {
        terminal.executeCommand(terminal.inputText);
        terminal.setInputText('');
        terminal.setBlinker({index: 0, time: Date.now() * 0.001});
        const newLinesCount = terminal.outputsText.split('\n').length;
        if (terminal.scrollOffset < newLinesCount - 30) {
          terminal.setScrollOffset(Math.max(0, newLinesCount - 30));
        }
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