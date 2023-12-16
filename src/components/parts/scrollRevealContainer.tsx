import { useRef, useEffect, ReactNode } from 'react';

import {
  DEFAULT_DELAY,
  DEFAULT_MOVE_TO,
  DEFAULT_DURATION,
} from '@/constants/lp';

interface ScrollRevealContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  moveTo?: string;
  duration?: number;
}

export default function ScrollRevealContainer({
  children,
  className = '',
  delay = DEFAULT_DELAY,
  moveTo = DEFAULT_MOVE_TO,
  duration = DEFAULT_DURATION,
}: ScrollRevealContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollAnimation = async () => {
      if (sectionRef.current) {
        const scrollReveal = (await import('scrollreveal')).default;
        scrollReveal().reveal(sectionRef.current, {
          reset: true,
          delay,
          duration,
          opacity: 0,
          origin: moveTo,
          distance: '20px',
        });
      }
    };

    scrollAnimation();
  }, [sectionRef]);

  return (
    <section className={className} ref={sectionRef}>
      {children}
    </section>
  );
}
