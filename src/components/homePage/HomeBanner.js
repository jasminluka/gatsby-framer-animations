import React, { useEffect, useRef } from "react";

import useWindowSize from '../../hooks/useWindowSize';
import { useGlobalStateContext } from '../../context/globalContext';
import { Banner, Video, Canvas, BannerTitle, Headline } from '../../styles/homeStyles';

const HomeBanner = ({ onCursor }) => {
  let canvas = useRef(null);
  const { width, height } = useWindowSize();
  const { currentTheme } = useGlobalStateContext();
  
  useEffect(() => {
    let renderingElement = canvas.current;
    // Create an offscreen canvas only for the drawings
    let drawingElement = renderingElement.cloneNode();
    let drawingContext = drawingElement.getContext('2d');
    let renderingContext = renderingElement.getContext('2d');

    let lastX, lastY, moving = false;
    
    renderingContext.globalCompositeOperation = 'source-over';
    renderingContext.fillStyle = currentTheme === 'dark' ? '#000000' : '#ffffff';
    renderingContext.fillRect(0, 0, width, height);

    renderingElement.addEventListener('mouseover', e => {
      moving = true;
      lastX = e.pageX - renderingElement.offsetLeft;
      lastY = e.pageY - renderingElement.offsetTop;
    });

    renderingElement.addEventListener('mouseup', e => {
      moving = false;
      lastX = e.pageX - renderingElement.offsetLeft;
      lastY = e.pageY - renderingElement.offsetTop;
    });

    renderingElement.addEventListener('mousemove', e => {
      if (moving) {
        drawingContext.globalCompositeOperation = 'source-over';
        renderingContext.globalCompositeOperation = 'destination-out';

        let currentX = e.pageX - renderingElement.offsetLeft;
        let currentY = e.pageY - renderingElement.offsetTop;

        drawingContext.lineJoin = 'round';
        drawingContext.moveTo(lastX, lastY);
        drawingContext.lineTo(currentX, currentY);
        drawingContext.closePath();
        drawingContext.lineWidth = 120;
        drawingContext.stroke();
        lastX = currentX;
        lastY = currentY;
        renderingContext.drawImage(drawingElement, 0, 0);
      }
    });

  }, [currentTheme]);

  const parent = {
    initial: {
      y: 800
    },
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const child = {
    initial: {
      y: 800
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [.6, .05, -.01, .9]
      }
    }
  }

  return (
    <Banner>
      <Video>
        <video
          height='100%'
          width='100%'
          loop
          autoPlay
          src={require('../../assets/video/video.mp4')}
        />
      </Video>
      <Canvas
        height={height}
        width={width}
        ref={canvas}
        onMouseEnter={() => onCursor('hovered')}
        onMouseLeave={onCursor}
      />
      <BannerTitle variants={parent} initial='initial' animate='animate'>
        <Headline variants={child}>DIG</Headline>
        <Headline variants={child}>DEEP</Headline>
      </BannerTitle>
    </Banner>
  );
}

export default HomeBanner;