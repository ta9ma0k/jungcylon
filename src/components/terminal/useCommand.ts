import { useCallback, useState } from 'react';

export const useCommand = (initialMessage: string[] = []) => {
  const [history, setHistory] = useState<string[]>(initialMessage);
  const [command, setCommand] = useState('');

  const pushHistory = useCallback((...message: string[]) => {
    setHistory(s => [...s, ...message]);
  }, []);

  const pushCommand = useCallback((message: string) => {
    setHistory(s => [...s, `> ${message}`]);
  }, []);

  const inputCommand = useCallback((text: string) => {
    setCommand(text.slice(0, 50));
  }, []);

  return { command, history, inputCommand, pushCommand, pushHistory };
};