import { useCallback, useState } from 'react';
import { sleep } from '../../util/sleep';
import { useCommand } from './useCommand';
import { getMoveArea, MOVE_NAMES, MoveName, useCube } from './useCube';
import { useTimer } from './useTimer';

const HELP_MESSAGE = [
  'cush version 1.0',
  'play with the puzzle of matching the colors of the cube\'s development.',
  'command       description',
  'help                show description of cush.',
  'start               play in time measurement mode.',
  'scramble        shuffle the parts.',
  'move [arg]     move parts according to arg.',
  '                       arg can be entered as a sequence of values and is case insensitive.',
  '                       WBRGOY moves clockwise around the entered value.',
  '                       WBRGOY with Apostrophe(\') moves leftward around the entered value.',
  'guide [move]  show the WBRGOY W\'B\'R\'G\'O\'Y\' guide.',
];

export const useCubeCommand = () => {
  const { command, history, pushCommand, pushHistory, inputCommand } = useCommand(HELP_MESSAGE);
  const { seconds, start, stop } = useTimer();
  const { cube, progress, scramble, move, checkSolved } = useCube();
  const [guide, setGuide] = useState<MoveName | undefined>();

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
      const moveNames = args.toUpperCase().match(/[WBRGOY]'|[WBRGOY]/g) as MoveName[];
      if (!moveNames) {
        pushHistory(`${args}: move name not found.`);
      } else {
        move(moveNames)
          .then(executed => {
            pushHistory(`execute ${executed.join('->')}`);
            if (checkSolved(executed)) {
              stop();
              pushHistory('solved!!!!');
            }
          });
      }
    } else if (executeCommand.match(/^scramble$/)) {
      scramble();
    } else if (executeCommand.match(/^help$/)) {
      pushHistory(...HELP_MESSAGE);
    } else if (executeCommand.match(/^guide$/)) {
      const moveNames = args.toUpperCase().match(/[WBRGOY]'|[WBRGOY]/g) as MoveName[];
      if (!moveNames) {
        pushHistory(`please input ${MOVE_NAMES}`);
      } else {
        setGuide(moveNames[0]);
        pushHistory(`show moving area of ${moveNames[0]}`);
        sleep(1)
          .then(() => setGuide(undefined));
      }
    } else {
      pushHistory(`${executeCommand}: command not found`);
    }
    inputCommand('');
  }, [command]);

  return { cube, progress, history, command, seconds, guideArea: guide ? getMoveArea(guide) : undefined, inputCommand, execute };
};