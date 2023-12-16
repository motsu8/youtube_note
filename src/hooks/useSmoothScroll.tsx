import Lenis from '@studio-freight/lenis';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';

const useSmoothScroll = () => {
  const [lenis, setLenis] = useState<Lenis | null>();
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>();

  useEffect(() => {
    const animate = (time: DOMHighResTimeStamp) => {
      lenis?.raf(time);
      reqIdRef.current = requestAnimationFrame(animate);
    };
    reqIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqIdRef.current as number);
  }, [lenis]);

  useLayoutEffect(() => {
    // インスタンスを生成
    const lenisInstance = new Lenis();
    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);
  return lenis;
};

export default useSmoothScroll;
