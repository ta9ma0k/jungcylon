import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { Cube } from '../cube';
import { useCubeCommand } from './useCubeCommand';
import { getMoveArea, MOVE_NAMES, MoveName } from './useCube';

export const App = () => {
  const [mouseOver, setMouseOver] = useState<MoveName>();
  const { cube, progress, history, command, timer, inputCommand, execute } = useCubeCommand();

  const handleOnEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      execute();
    }
  }, [execute]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    inputCommand(e.target.value);
  }, [inputCommand]);

  const handleOnShortCut = useCallback((name: MoveName) => () => {
    inputCommand(command + name);
  }, [inputCommand]);

  return (
    <div className="bg-black py-10 px-8 grid grid-cols-2">
      <div>
        <Cube cube={cube} moveArea={mouseOver ? getMoveArea(mouseOver) : undefined}/>
      </div>
      <div>
        <div className="text-xl text-lime-500 font-semibold h-5/6 overflow-y-hidden">
          {history.slice(-15).map(c => (<p className="tracking-[.15em]">{c}</p>))}
          {progress !== 100 && <div className="bg-lime-500 h-4" style={{ width: `${progress}%` }}/>}
          {progress === 100 && (
            <>
              <span className="text-xl text-lime-500 mr-4">{'>'}</span>
              <input
                className="w-10/12 bg-black text-xl text-lime-500 caret-lime-500 focus:outline-0 tracking-[.15em]"
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
          <h3 className="text-8xl text-lime-500">{new Date(timer * 1000).toISOString().substring(11, 19)}</h3>
        </div>
        <div className="flex mt-3 space-x-3">
          {MOVE_NAMES.map(name => (
            <button
              key={`shortcut-${name}`}
              className="px-2 py-1 text-xl text-gray-100 w-10 bg-lime-500 text-white font-semibold rounded hover:bg-lime-400"
              onClick={handleOnShortCut(name)}
              onMouseOver={() => setMouseOver(name)}
              onMouseOut={() => setMouseOver(undefined)}
            >{name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};