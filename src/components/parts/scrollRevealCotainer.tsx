import { useRef, useEffect, ReactNode } from "react";
import scrollReveal from "scrollreveal";

interface ScrollRevealContainerProps {
  children: ReactNode
  className: string
}

export default function ScrollRevealContainer ({children, className}: ScrollRevealContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        reset: true,
        delay: 500,
        duration: 800,
        opacity: 0,
        origin: 'top',
        distance: "20px"
      });
  }, [sectionRef]);

  return <section className={className} ref={sectionRef}>{children}</section>;
};

