import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  duration?: number;
  as?: 'span' | 'p' | 'div';
  startDelay?: number;
  scrollTrigger?: boolean;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 55,
  className = '',
  animateBy = 'words',
  direction = 'top',
  duration = 1.0,
  as = 'span',
  startDelay = 0,
  scrollTrigger = false,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(':scope > .bt-unit');
    if (!targets.length) return;

    gsap.set(targets, {
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'top' ? -22 : 22,
    });

    const vars: gsap.TweenVars = {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      duration,
      ease: 'power3.out',
      stagger: delay / 1000,
      delay: startDelay,
    };

    if (scrollTrigger) {
      vars.scrollTrigger = {
        trigger: el,
        start: 'top 90%',
        once: true,
      };
    }

    const tween = gsap.to(targets, vars);

    // Safety net: if rAF is paused (e.g. doc hidden in preview), force final state after a timeout
    const totalTime = (startDelay + duration + (elements.length * delay) / 1000) * 1000 + 500;
    const safety = window.setTimeout(() => {
      if (document.visibilityState === 'hidden') {
        gsap.set(targets, { filter: 'blur(0px)', opacity: 1, y: 0 });
      }
    }, totalTime);

    const onVis = () => {
      if (document.visibilityState === 'visible') {
        gsap.ticker.wake();
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
      clearTimeout(safety);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [text, delay, direction, duration, startDelay, scrollTrigger, elements.length]);

  const Wrapper = as as React.ElementType;

  return (
    <Wrapper ref={ref as React.RefObject<HTMLElement>} className={className} style={{ display: 'inline' }}>
      {elements.map((segment, i) => (
        <span
          key={i}
          className="bt-unit"
          style={{
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
          }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && i < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </Wrapper>
  );
};

export default BlurText;
