import { CornerOrientation, EdgeOrientation, MoveArea, RubiksCube } from '../app/useRubiksCube';
import { CubeColor, CubeParts } from '../cubeparts';

const CORNER_PARTS = [
  ['white', 'blue', 'orange'],
  ['white', 'red', 'blue'],
  ['white', 'green', 'red'],
  ['white', 'orange', 'green'],
  ['yellow', 'orange', 'blue'],
  ['yellow', 'blue', 'red'],
  ['yellow', 'red', 'green'],
  ['yellow', 'green', 'orange'],
] as CubeColor[][];

const EDGE_PARTS = [
  ['blue', 'orange'],
  ['blue', 'red'],
  ['green', 'red'],
  ['green', 'orange'],
  ['white', 'blue'],
  ['white', 'red'],
  ['white', 'green'],
  ['white', 'orange'],
  ['yellow', 'blue'],
  ['yellow', 'red'],
  ['yellow', 'green'],
  ['yellow', 'orange'],
] as CubeColor[][];

const getCOrientationOfRightSide = (orientation: CornerOrientation): CornerOrientation => {
  if (orientation === 0) {
    return 1;
  }
  if (orientation === 1) {
    return 2;
  }
  return 0;
};

const getCOrientationOfLeftSide = (orientation: CornerOrientation): CornerOrientation => {
  if (orientation === 0) {
    return 2;
  }
  if (orientation === 1) {
    return 0;
  }
  return 1;
};

const getEOrientationOfReverse = (orientation: EdgeOrientation): EdgeOrientation => {
  if (orientation === 0) {
    return 1;
  }
  return 0;
};

export const Cube = ({ cube, moveArea }: { cube: RubiksCube, moveArea?: MoveArea }) => (
  <div>
    <div className="ml-48">
      <div className="w-48 flex">
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[0]][getCOrientationOfRightSide(cube.cornerOrientation[0])]} isHover={moveArea?.corner[0]}/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[0]][cube.edgeOrientation[0]]} isHover={moveArea?.edge[0]}/>
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[4]][getCOrientationOfLeftSide(cube.cornerOrientation[4])]} isHover={moveArea?.corner[4]}/>
      </div>
      <div className="w-48 flex">
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[4]][getEOrientationOfReverse(cube.edgeOrientation[4])]} isHover={moveArea?.edge[4]}/>
        <CubeParts color="blue"/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[8]][getEOrientationOfReverse(cube.edgeOrientation[8])]} isHover={moveArea?.edge[8]}/>
      </div>
      <div className="w-48 flex">
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[1]][getCOrientationOfLeftSide(cube.cornerOrientation[1])]} isHover={moveArea?.corner[1]}/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[1]][cube.edgeOrientation[1]]} isHover={moveArea?.edge[1]}/>
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[5]][getCOrientationOfRightSide(cube.cornerOrientation[5])]} isHover={moveArea?.corner[5]}/>
      </div>
    </div>
    <div className="ml-48">
      <div className="w-48 flex">
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[1]][getCOrientationOfRightSide(cube.cornerOrientation[1])]} isHover={moveArea?.corner[1]}/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[1]][getEOrientationOfReverse(cube.edgeOrientation[1])]} isHover={moveArea?.edge[1]}/>
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[5]][getCOrientationOfLeftSide(cube.cornerOrientation[5])]} isHover={moveArea?.corner[5]}/>
      </div>
      <div className="w-48 flex">
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[5]][getEOrientationOfReverse(cube.edgeOrientation[5])]} isHover={moveArea?.edge[5]}/>
        <CubeParts color="red"/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[9]][getEOrientationOfReverse(cube.edgeOrientation[9])]} isHover={moveArea?.edge[9]}/>
      </div>
      <div className="w-48 flex">
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[2]][getCOrientationOfLeftSide(cube.cornerOrientation[2])]} isHover={moveArea?.corner[2]}/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[2]][getEOrientationOfReverse(cube.edgeOrientation[2])]} isHover={moveArea?.edge[2]}/>
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[6]][getCOrientationOfRightSide(cube.cornerOrientation[6])]} isHover={moveArea?.corner[6]}/>
      </div>
    </div>
    <div className="flex">
      <div>
        <div className="w-48 flex">
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[1]][cube.cornerOrientation[1]]} isHover={moveArea?.corner[1]}/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[5]][cube.edgeOrientation[5]]} isHover={moveArea?.edge[5]}/>
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[2]][cube.cornerOrientation[2]]} isHover={moveArea?.corner[2]}/>
        </div>
        <div className="w-48 flex">
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[4]][cube.edgeOrientation[4]]} isHover={moveArea?.edge[4]}/>
          <CubeParts color="white"/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[6]][cube.edgeOrientation[6]]} isHover={moveArea?.edge[6]}/>
        </div>
        <div className="w-48 flex">
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[0]][cube.cornerOrientation[0]]} isHover={moveArea?.corner[0]}/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[7]][cube.edgeOrientation[7]]} isHover={moveArea?.edge[7]}/>
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[3]][cube.cornerOrientation[3]]} isHover={moveArea?.corner[3]}/>
        </div>
      </div>
      <div>
        <div className="w-48 flex">
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[2]][getCOrientationOfRightSide(cube.cornerOrientation[2])]} isHover={moveArea?.corner[2]}/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[2]][cube.edgeOrientation[2]]} isHover={moveArea?.edge[2]}/>
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[6]][getCOrientationOfLeftSide(cube.cornerOrientation[6])]} isHover={moveArea?.corner[6]}/>
        </div>
        <div className="w-48 flex">
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[6]][getEOrientationOfReverse(cube.edgeOrientation[6])]} isHover={moveArea?.edge[6]}/>
          <CubeParts color="green"/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[10]][getEOrientationOfReverse(cube.edgeOrientation[10])]} isHover={moveArea?.edge[10]}/>
        </div>
        <div className="w-48 flex">
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[3]][getCOrientationOfLeftSide(cube.cornerOrientation[3])]} isHover={moveArea?.corner[3]}/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[3]][cube.edgeOrientation[3]]} isHover={moveArea?.edge[3]}/>
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[7]][getCOrientationOfRightSide(cube.cornerOrientation[7])]} isHover={moveArea?.corner[7]}/>
        </div>
      </div>
      <div>
        <div className="w-48 flex">
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[6]][cube.cornerOrientation[6]]} isHover={moveArea?.corner[6]}/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[9]][cube.edgeOrientation[9]]} isHover={moveArea?.edge[9]}/>
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[5]][cube.cornerOrientation[5]]} isHover={moveArea?.corner[5]}/>
        </div>
        <div className="w-48 flex">
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[10]][cube.edgeOrientation[10]]} isHover={moveArea?.edge[10]}/>
          <CubeParts color="yellow"/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[8]][cube.edgeOrientation[8]]} isHover={moveArea?.edge[8]}/>
        </div>
        <div className="w-48 flex">
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[7]][cube.cornerOrientation[7]]} isHover={moveArea?.corner[7]}/>
          <CubeParts color={EDGE_PARTS[cube.edgePermutation[11]][cube.edgeOrientation[11]]} isHover={moveArea?.edge[11]}/>
          <CubeParts color={CORNER_PARTS[cube.cornerPermutation[4]][cube.cornerOrientation[4]]} isHover={moveArea?.corner[4]}/>
        </div>
      </div>
    </div>
    <div className="ml-48">
      <div className="w-48 flex">
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[3]][getCOrientationOfRightSide(cube.cornerOrientation[3])]} isHover={moveArea?.corner[3]}/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[3]][getEOrientationOfReverse(cube.edgeOrientation[3])]} isHover={moveArea?.edge[3]}/>
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[7]][getCOrientationOfLeftSide(cube.cornerOrientation[7])]} isHover={moveArea?.corner[7]}/>
      </div>
      <div className="w-48 flex">
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[7]][getEOrientationOfReverse(cube.edgeOrientation[7])]} isHover={moveArea?.edge[7]}/>
        <CubeParts color="orange"/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[11]][getEOrientationOfReverse(cube.edgeOrientation[11])]} isHover={moveArea?.edge[11]}/>
      </div>
      <div className="w-48 flex">
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[0]][getCOrientationOfLeftSide(cube.cornerOrientation[0])]} isHover={moveArea?.corner[0]}/>
        <CubeParts color={EDGE_PARTS[cube.edgePermutation[0]][getEOrientationOfReverse(cube.edgeOrientation[0])]} isHover={moveArea?.edge[0]}/>
        <CubeParts color={CORNER_PARTS[cube.cornerPermutation[4]][getCOrientationOfRightSide(cube.cornerOrientation[4])]} isHover={moveArea?.corner[4]}/>
      </div>
    </div>
  </div>
);