import { useCallback, useEffect, useState } from 'react';
import { useCube } from './useCube';

export const useCubeCommand = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState('');
  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const { cube, progress, scramble, moveByCommand, checkSolved } = useCube();

  const pushHistory = useCallback((message: string) => {
    setHistory(s => [...s, `> ${message}`]);
  }, []);

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
    if (command.trim().length === 0) {
      return;
    }
    pushHistory(command);
    const [mainCommand, args] = command.split(' ');
    if (mainCommand.toUpperCase().match(/^START$/)) {
      setTimer(0);
      setStartTimer(true);
      scramble();
    } else if (mainCommand.toUpperCase().match(/^MOVE$/)) {
      moveByCommand(args)
        .then(executed => {
          pushHistory(`execute ${executed.join(' ')}`);
          if (checkSolved(args)) {
            setStartTimer(false);
            pushHistory('SOLVED!');
          }
        })
        .catch(err => setHistory(s => ([...s, `> ${err}`])));
    } else {
      pushHistory(`${mainCommand}: command not found`);
    }
    setCommand('');
  }, [command]);

  return { cube, progress, history, command, timer, inputCommand, execute };
};