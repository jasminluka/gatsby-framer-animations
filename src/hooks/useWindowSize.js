import { useState, useEffect } from 'react';

const useWindowSize = () => {
  let defaultWidth;
  let defaultHeight;

  if (typeof window !== 'undefined') {
    defaultWidth = window.innerWidth;
    defaultHeight = window.innerHeight;
  }

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

    console.log(window.innerWidth, window.innerHeight)

    const handleResize = () => {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;