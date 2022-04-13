import { Terminal } from '../terminal';
import { AipSrc, useAip } from './useAip';

export const App = () => {
  useAip();

  return (
    <>
      <AipSrc/>
      <Terminal/>
    </>
  );
};