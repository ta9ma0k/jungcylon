import { ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { useCubeCommand } from './useCubeCommand';
import { secondsToString } from './useTimer';
import { Cube } from '../cube';

export const Terminal = () => {
  const { cube, progress, history, command, seconds, guideArea, inputCommand, execute } = useCubeCommand();

  const handleOnEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      execute();
    }
  }, [execute]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    inputCommand(e.target.value);
  }, [inputCommand]);

  return (
    <div className="bg-black h-full pt-5 px-20 flex">
      <div className="mt-15 mr-20">
        <h3 className="text-6xl text-lime-500 text-center">{secondsToString(seconds)}</h3>
        <div className="flex justify-center">
          <Cube cube={cube} moveArea={guideArea}/>
        </div>
      </div>
      <div>
        <div className="lg:text-xl text-lime-500">
          {history.slice(-20).map((c, i) => (<p key={`history-${i}`} className="tracking-widest whitespace-pre-wrap">{c}</p>))}
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
      </div>
    </div>
  ); 
}