import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { Cube } from '../cube';
import { getMoveArea, MOVE_NAMES, MoveName, useRubiksCube } from './useRubiksCube';

export const App = () => {
  const { cube, progress, move, moveByCommand } = useRubiksCube();
  const [mouseOver, setMouseOver] = useState<MoveName>();
  const [command, setCommand] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');

  const handleOnEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      moveByCommand(inputText);
      setCommand(s => ([...s, inputText]));
      setInputText('');
    }
  }, [setCommand, inputText]);

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, [setInputText]);

  const onClick = useCallback((name: MoveName) => () => {
    move(name);
    setCommand(s => [...s, name]);
  }, []);

  return (
    <div className="bg-black py-10 px-8 grid grid-cols-2">
      <div>
        <Cube cube={cube} moveArea={mouseOver ? getMoveArea(mouseOver) : undefined}/>
      </div>
      <div>
        <div className="text-xl text-lime-500 font-semibold h-5/6">
          {command.map(c => (<p className="tracking-[.15em]">{c}</p>))}
          {progress !== 100 && <div className="bg-lime-500 h-4" style={{ width: `${progress}%` }}/>}
          {progress === 100 && (
            <>
              <span className="text-xl text-lime-500 mr-4">{'>'}</span>
              <input
                className="w-10/12 bg-black text-xl text-lime-500 caret-lime-500 focus:outline-0 tracking-[.15em]"
                value={inputText}
                onKeyPress={handleOnEnter}
                onChange={handleOnChange}
                autoFocus
                maxLength={50}
              />
            </>
          )}
        </div>
        <div className="flex mt-3 space-x-3">
          {MOVE_NAMES.map(name => (
            <button
              className="px-2 py-1 text-xl text-gray-100 w-10 bg-lime-500 text-white font-semibold rounded hover:bg-lime-400"
              onClick={onClick(name)}
              onMouseOver={() => setMouseOver(name)}
              onMouseOut={() => setMouseOver(undefined)}
            >{name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};