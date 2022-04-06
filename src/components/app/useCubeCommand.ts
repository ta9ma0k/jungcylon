import { useCallback } from 'react';
import { useCommand } from './useCommand';
import { useCube } from './useCube';
import { useTimer } from './useTimer';

export const useCubeCommand = () => {
  const { command, history, pushCommand, pushHistory, inputCommand } = useCommand();
  const { seconds, start, stop } = useTimer();
  const { cube, progress, scramble, moveByCommand, checkSolved } = useCube();

  const execute = useCallback(() => {
    if (command.trim().length === 0) {
      return;
    }
    pushCommand(command);
    const [executeCommand, args] = command.split(' ');
    if (executeCommand.match(/^start$/)) {
      start();
      scramble();
    } else if (executeCommand.match(/^move$/)) {
      moveByCommand(args)
        .then(executed => {
          pushHistory(`execute ${executed.join('->')}`);
          if (checkSolved(args)) {
            stop();
            pushHistory('SOLVED!');
          }
        })
        .catch(err => pushHistory(err));
    } else if (executeCommand.match(/^scramble$/)) {
      scramble();
    } else {
      pushHistory(`${executeCommand}: command not found`);
    }
    inputCommand('');
  }, [command]);

  return { cube, progress, history, command, seconds, inputCommand, execute };
};