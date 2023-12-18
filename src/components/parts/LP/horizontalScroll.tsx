import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { ReactNode, useEffect, useRef } from 'react';

type Props = {
  children: ReactNode;
};

function HorizontalScroll({ children }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  const getScrollAmount = () =>
    -(sectionRef.current!.offsetWidth - window.innerWidth);

  useEffect(() => {
    const gsapFnc = gsap.context(() => {
      gsap.to(sectionRef.current, {
        x: getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 15%',
          end: () => `+=${getScrollAmount() * -1}`,
          pin: sectionRef.current,
          scrub: true,
          markers: true,
        },
      });
    });

    return () => gsapFnc.revert();
  });

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden">
      <div
        ref={sectionRef}
        className="h-[70vh] w-fit flex flex-nowrap py-10 px-96 mx-16 space-x-24"
      >
        {children}
      </div>
    </div>
  );
}

export default HorizontalScroll;
