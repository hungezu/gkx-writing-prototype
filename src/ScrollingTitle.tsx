import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

export default function ScrollingTitle({text, className = ''}: {text:string;className?:string}) {
  const viewport = useRef<HTMLParagraphElement>(null);
  const content = useRef<HTMLSpanElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const frame = viewport.current;
    const label = content.current;
    if (!frame || !label) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const overflow = label.scrollWidth - (frame.clientWidth - 24);
      setDistance(overflow > 1 ? overflow : 0);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(label);
    measure();
    document.fonts.ready.then(measure);
    return () => {active = false; observer.disconnect();};
  }, [text]);

  const style = {
    '--title-scroll-distance': `${-distance}px`,
    '--title-scroll-duration': `${Math.max(2.8, distance / 28 + 1.2)}s`,
  } as CSSProperties;
  return <p ref={viewport} className={`scrolling-title ${className}`} data-overflow={distance > 0} style={style}><span ref={content}>{text}</span></p>;
}
