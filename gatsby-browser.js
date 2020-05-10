import React from 'react';
import { GlobalProvider } from './src/context/globalContext';

export const wrapRootElement = ({ element }) => {
  return (
    <GlobalProvider>
      {/* our GATSBY APP is element */}
      {element}
    </GlobalProvider>
  );
}