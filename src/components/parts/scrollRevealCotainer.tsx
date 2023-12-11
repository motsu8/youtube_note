import { useRef, useEffect, ReactNode } from 'react';
import scrollReveal from 'scrollreveal';

import { DEFAULT_DELAY } from '@/constants/lp';

type ScrollRevealContainerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function ScrollRevealContainer({
  children,
  className,
  delay,
}: ScrollRevealContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        reset: true,
        delay,
        duration: 1000,
        opacity: 0,
        origin: 'top',
        distance: '20px',
      });
  }, [sectionRef]);

  return (
    <section className={className} ref={sectionRef}>
      {children}
    </section>
  );
}

ScrollRevealContainer.defaultProps = {
  className: '',
  delay: DEFAULT_DELAY,
};
