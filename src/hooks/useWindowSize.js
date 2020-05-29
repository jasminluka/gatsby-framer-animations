import { useState, useEffect } from 'react';

let defaultHeight;
let defaultWidth;

if (typeof window !== 'undefined') {
  defaultHeight = window.innerHeight;
  defaultWidth = window.innerWidth;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: defaultWidth,
    height: defaultHeight
  });

  useEffect(() => {
    const getSize = () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
    
    const handleResize = () => {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;