import { useWindowSize } from '@studio-freight/hamo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { ReactNode, useEffect, useRef } from 'react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  id?: string;
  childClass?: string;
}

function Parallax({
  children,
  className,
  childClass,
  speed = 1,
  id = 'parallax',
}: ParallaxProps) {
  const trigger = useRef(null);
  const target = useRef(null);
  const timeline = useRef<gsap.core.Timeline>();

  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const y = windowWidth * speed * 0.1;

    const setY = gsap.quickSetter(target.current, 'y', 'px');

    timeline.current = gsap.timeline({
      scrollTrigger: {
        id,
        trigger: trigger.current,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (e) => {
          setY(e.progress * y);
        },
      },
    });

    return () => {
      timeline.current?.kill();
    };
  }, [id, speed, windowWidth]);

  return (
    <div ref={trigger} className={className}>
      <div ref={target} className={childClass ?? ''}>
        {children}
      </div>
    </div>
  );
}

export default Parallax;
