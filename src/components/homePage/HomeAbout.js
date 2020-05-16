import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { useGlobalStateContext } from '../../context/globalContext';
import { Container, Flex } from '../../styles/globalStyles';
import { HomeAboutSection, About, Services, AccordionHeader, AccordionIcon, AccordionContent } from '../../styles/homeStyles';

const accordionIds = [
  {
    id: 0,
    title: "Pre-Production",
    results: [
      "Creative Development",
      "Writing",
      "Creative Development",
      "Writing",
      "Storyboards",
      "Art Direction",
      "Creative Direction",
      "Location Scouting",
      "Casting"
    ]
  },
  {
    id: 1,
    title: "Video Production",
    results: [
      "Principle Photography",
      "Production Management",
      "Crew",
      "Dailies",
      "LTO-Archiving"
    ]
  },
  {
    id: 2,
    title: "Post-Production",
    results: [
      "Colour correction",
      "Offline editing",
      "Online editing",
      "VFX",
      "Animation and motion graphics",
      "Closed captioning and subtitles",
      "Descriptive video",
      "Dailies",
      "Quality control",
      "LTO Archiving"
    ]
  },
  {
    id: 3,
    title: "Audio Post-Production",
    results: [
      "We work with some amazing partners who provide:",
      "Sound Design",
      "SFX",
      "Music",
      "Sound Mix"
    ]
  }
];

const HomeAbout = ({ onCursor }) => {
  const [expanded, setExpanded] = useState(0);
  const animation = useAnimation();
  const [aboutRef, inView] = useInView({
    triggerOnce: true,
    // Giving our scrollwheel additional 300px before executing animation
    rootMargin: "-300px",
  });

  useEffect(() => {
    if (inView) {
      animation.start("visible")
    }
  }, [animation, inView]);

  return (
    <HomeAboutSection
      ref={aboutRef}
      animate={animation}
      initial='hidden'
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: .8,
            ease: [.6, .05, -.01, .9]
          }
        },
        hidden: {
          opacity: 0,
          y: 72
        }
      }}
    >
      <Container>
        <Flex alignTop>
          <About>
            <h2>
              Furrow is an integrated, full-service creative studio offering
              video production, creative development, and post-production
              services.
            </h2>
            <p>
              Everybody’s got a story. And we don’t stop until we’ve uncovered
              what makes yours worth telling. Whether it’s working directly with
              you, an agency partner, or putting the finishing touches on
              something special, we’re ready to dig in and get our hands
              dirty—are you?
            </p>
          </About>
          <Services>
            <h3>Services</h3>
            {
              accordionIds.map((accordion, index) => (
                <Accordion
                  key={index}
                  accordion={accordion}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  onCursor={onCursor}
                />
              ))
            }
          </Services>
        </Flex>
      </Container>
    </HomeAboutSection>
  );
}

export default HomeAbout;

const Accordion = ({ accordion, expanded, setExpanded, onCursor }) => {
  const isOpen = accordion.id === expanded;
  const [isHovered, setIsHovered] = useState(false);
  const { currentTheme } = useGlobalStateContext();

  return (
    <>
      <AccordionHeader
        onClick={() => setExpanded(isOpen ? false : accordion.id)}
        onMouseEnter={() => onCursor('hovered')}
        onMouseLeave={onCursor}
        onHoverStart={() => setIsHovered(!isHovered)}
        onHoverEnd={() => setIsHovered(!isHovered)}
        whileHover={{
          color: currentTheme === "dark" ? "#ffffff" : "#000000",
        }}
      >
        <AccordionIcon>
          <motion.span
            animate={{
              rotate: isOpen || isHovered ? 0 : 45,
              x: 3
            }}
            transition={{
              duration: .2,
              ease: [.6, .05, -.01, .9]
            }}
          />
          <motion.span
            animate={{
              rotate: isOpen || isHovered  ? 0 : -45,
              x: -3
            }}
            transition={{
              duration: .2,
              ease: [.6, .05, -.01, .9]
            }}
          />
        </AccordionIcon>
        {accordion.title}
      </AccordionHeader>
      <AccordionContent
        key='content'
        animate={{ height: isOpen ? '100%' : 0 }}
        transition={{
          duration: .8,
          ease: [.6, .05, -.01, .9]
        }}
      >
        {
          accordion.results.map((result, index) => (
            <span key={index}>{result}</span>
          ))
        }
      </AccordionContent>
    </>
  );
}