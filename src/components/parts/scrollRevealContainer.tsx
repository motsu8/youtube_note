import { useRef, useEffect, ReactNode } from 'react';

import { DEFAULT_DELAY } from '@/constants/lp';

interface ScrollRevealContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollRevealContainer({
  children,
  className = '',
  delay = DEFAULT_DELAY,
}: ScrollRevealContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollAnimation = async () => {
      if (sectionRef.current) {
        const scrollReveal = (await import('scrollreveal')).default;
        scrollReveal().reveal(sectionRef.current, {
          reset: true,
          delay,
          duration: 1000,
          opacity: 0,
          origin: 'top',
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
