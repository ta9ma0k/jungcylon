import { useState } from 'react';
import { Cube } from '../cube';
import { getMoveArea, MOVE_NAMES, MoveName, useRubiksCube } from './useRubiksCube';

export const App = () => {
  const { cube, move } = useRubiksCube();
  const [mouseOver, setMouseOver] = useState<MoveName>();

  return (
    <div>
      <div className="flex justify-center mt-5">
        <Cube cube={cube} moveArea={mouseOver ? getMoveArea(mouseOver) : undefined}/>
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex mt-3 space-x-3">
          {MOVE_NAMES.map(name => (
            <button
              className="px-2 py-1 text-xl w-10 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500"
              onClick={() => move(name)}
              onMouseOver={() => setMouseOver(name)}
              onMouseOut={() => setMouseOver(undefined)}
            >{name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};