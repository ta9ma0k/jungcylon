import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const useAip = () => {
  useEffect(() => {
    const functionText = document.createTextNode(`aiptag.cmd.display.push(function() { aipDisplayTag.display('${import.meta.env.VITE_AIP_PLACEMENT_ID}'); });`);
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.appendChild(functionText);
    const divElement = document.createElement('div');
    divElement.id = import.meta.env.VITE_AIP_PLACEMENT_ID;
    divElement.appendChild(scriptElement);
    document.getElementById('root')!.appendChild(divElement);
  }, []);
};

export const AipSrc = () => (
  <HelmetProvider>
    <Helmet>
      <script>
        {`
          window.aiptag = window.aiptag || {cmd: []};
          aiptag.cmd.display = aiptag.cmd.display || [];

          //CMP tool settings
          aiptag.cmp = {
            show: true,
            position: "bottom",  //centered, bottom
            button: true,
            buttonText: "Privacy settings",
            buttonPosition: "top-left" //bottom-left, bottom-right, top-left, top-right
          }
          `}
      </script>
      <script async src={`//api.adinplay.com/libs/aiptag/pub/${import.meta.env.VITE_AIP_ID}/tag.min.js`}/>
    </Helmet>
  </HelmetProvider>
);