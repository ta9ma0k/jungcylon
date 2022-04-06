export type CubeColor = 'white' | 'blue' | 'red' | 'orange' | 'green' | 'yellow';

type Props = {
  color: CubeColor;
  label?: string;
  isHover?: boolean
}

const toColor = (color: CubeColor): string => {
  switch (color) {
    case 'white':
      return 'bg-slate-200';
    case 'blue':
      return 'bg-teal-300';
    case 'red':
      return 'bg-rose-500';
    case 'orange':
      return 'bg-orange-400';
    case 'green':
      return 'bg-lime-400';
    case 'yellow':
      return 'bg-yellow-200';
    default:
      throw new Error('not supported type.');
  }
};

export const CubeParts = ({ color, label, isHover = false }: Props) => (
  <div className={`${toColor(color)} ${isHover ? 'opacity-70' : ''} duration-200 border-slate-900 flex items-center justify-center lg:w-12 lg:h-12 w-8 w-8 lg:border-2 border`}>
    {label && <p className="text-2xl font-semibold">{label}</p>}
  </div>
);