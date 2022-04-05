import { useCallback, useEffect, useState } from 'react';
import { useRubiksCube } from './useRubiksCube';

export const useCubeCommand = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState('');
  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const { cube, progress, scramble, solved, moveByCommand } = useRubiksCube();

  useEffect(() => {
    if (startTimer) {
      const timerId = setInterval(() => {
        setTimer(s => ++s);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [startTimer]);

  const inputCommand = useCallback((text: string) => {
    setCommand(text.slice(0, 50));
  }, []);

  const execute = useCallback(() => {
    if (command.toUpperCase().match(/START/)) {
      moveByCommand('R');
      setTimer(0);
      setStartTimer(true);
      // scramble();
    } else {
      moveByCommand(command);
    }
    setHistory(s => ([...s, command]));
    setCommand('');
  }, [command]);

  return { cube, progress, history, command, timer, inputCommand, execute };
};