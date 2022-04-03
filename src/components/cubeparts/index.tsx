export type CubeColor = 'white' | 'blue' | 'red' | 'orange' | 'green' | 'yellow';

type Props = {
  color: CubeColor;
  isHover?: boolean
}

const toColor = (color: CubeColor): string => {
  switch (color) {
    case 'white':
      return 'bg-slate-200';
    case 'blue':
      return 'bg-blue-600';
    case 'red':
      return 'bg-red-600';
    case 'orange':
      return 'bg-orange-600';
    case 'green':
      return 'bg-green-600';
    case 'yellow':
      return 'bg-yellow-300';
    default:
      throw new Error('not supported type.');
  }
};

export const CubeParts = ({ color, isHover = false }: Props) => (
  <div className={`${toColor(color)} ${isHover ? 'opacity-70' : ''} duration-200 border-2 border-slate-900 w-16 h-16`}/>
);