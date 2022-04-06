import { useCallback, useState } from 'react';
import { useCube } from './useCube';
import { useTimer } from './useTimer';

export const useCubeCommand = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState('');
  const { seconds, start, stop } = useTimer();
  const { cube, progress, scramble, moveByCommand, checkSolved } = useCube();

  const pushHistory = useCallback((message: string) => {
    setHistory(s => [...s, `> ${message}`]);
  }, []);

  const inputCommand = useCallback((text: string) => {
    setCommand(text.slice(0, 50));
  }, []);

  const execute = useCallback(() => {
    if (command.trim().length === 0) {
      return;
    }
    pushHistory(command);
    const [executeCommand, args] = command.split(' ');
    if (executeCommand.match(/^start$/)) {
      start();
      scramble();
    } else if (executeCommand.match(/^move$/)) {
      moveByCommand(args)
        .then(executed => {
          pushHistory(`execute ${executed.join(' ')}`);
          if (checkSolved(args)) {
            stop();
            pushHistory('SOLVED!');
          }
        })
        .catch(err => setHistory(s => ([...s, `> ${err}`])));
    } else {
      pushHistory(`${executeCommand}: command not found`);
    }
    setCommand('');
  }, [command]);

  return { cube, progress, history, command, seconds, inputCommand, execute };
};