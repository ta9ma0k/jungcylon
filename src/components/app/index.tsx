import { Cube } from '../cube';
import { MOVE_NAMES, useRubiksCube } from './useRubiksCube';

export const App = () => {
  const { cube, move } = useRubiksCube();
  return (
    <div>
      <div className="flex justify-center mt-5">
        <Cube cube={cube}/>
      </div>
      <div className="flex justify-center mt-5">
        <div className="flex mt-3 space-x-3">
          {MOVE_NAMES.map(name => (
            <button
              className="px-2 py-1 text-xl w-10 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500"
              onClick={() => move(name)}
            >{name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};