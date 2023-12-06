import { useRef, useEffect, ReactNode } from "react";
import scrollReveal from "scrollreveal";

interface ScrollRevealContainerProps {
  children: ReactNode
}

export default function ScrollRevealContainer ({children}: ScrollRevealContainerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        reset: true,
        delay: 400,
        opacity: 0,
        origin: 'top',
        distance: "20px"
      });
  }, [sectionRef]);

  return <section className="w-full" ref={sectionRef}>{children}</section>;
};

