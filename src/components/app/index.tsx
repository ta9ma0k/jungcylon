import { Cube } from '../cube';
import { useRubiksCube } from './useRubiksCube';

export const App = () => {
  const { cube, move } = useRubiksCube();
  return (
    <>
      <div className="m-5">
        <Cube cube={cube}/>
      </div>
    </>
  );
};