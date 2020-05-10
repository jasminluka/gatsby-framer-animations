import React, { useState, useEffect } from 'react';

import { useGlobalStateContext } from '../context/globalContext';

import { Cursor } from '../styles/globalStyles';

const CustomCursor = () => {
  const { cursorType } = useGlobalStateContext();
  const [mousePosition, setMousePosition] = useState({ x: 400, y: 400 });

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);

    return () => {
    document.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
  }

  return (
    <>
      <Cursor
        className={`${!!cursorType ? 'hovered' : ''} ${cursorType}`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px`}}
      />
    </>
  );
}

export default CustomCursor;