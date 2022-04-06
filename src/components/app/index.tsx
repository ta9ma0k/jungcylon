import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { Cube } from '../cube';
import { useCubeCommand } from './useCubeCommand';
import { getMoveArea, MOVE_NAMES, MoveName } from './useCube';
import { secondsToString } from './useTimer';

export const App = () => {
  const [mouseOver, setMouseOver] = useState<MoveName>();
  const { cube, progress, history, command, seconds, inputCommand, execute } = useCubeCommand();

  const handleOnEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      execute();
    }
  }, [execute]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    inputCommand(e.target.value);
  }, [inputCommand]);

  return (
    <div className="bg-black h-full py-10 px-8 grid grid-cols-2">
      <div className="mt-20 flex justify-center">
        <Cube cube={cube} moveArea={mouseOver ? getMoveArea(mouseOver) : undefined}/>
      </div>
      <div>
        <div className="lg:text-xl text-lime-500 overflow-y-hidden lg:h-4/6 h-3/6">
          {history.slice(-15).map(c => (<p className="tracking-widest">{c}</p>))}
          {progress !== 100 && <div className="bg-lime-500 h-4" style={{ width: `${progress}%` }}/>}
          {progress === 100 && (
            <>
              <span className="lg:text-xl text-lime-500 mr-4">{'>'}</span>
              <input
                className="w-10/12 bg-black lg:text-xl text-lime-500 caret-lime-500 focus:outline-0 tracking-widest"
                value={command}
                onKeyPress={handleOnEnter}
                onChange={handleOnChange}
                autoFocus
                maxLength={50}
              />
            </>
          )}
        </div>
        <div>
          <h3 className="lg:text-8xl text-6xl text-lime-500">{secondsToString(seconds)}</h3>
        </div>
        <div className="mt-3 grid xl:grid-cols-12 grid-cols-6">
          {MOVE_NAMES.map(name => (
            <button
              key={`shortcut-${name}`}
              className="px-2 py-1 text-xl text-gray-100 w-10 bg-lime-500 text-white font-semibold rounded hover:bg-lime-400 mb-3"
              onMouseOver={() => setMouseOver(name)}
              onMouseOut={() => setMouseOver(undefined)}
            >{name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};