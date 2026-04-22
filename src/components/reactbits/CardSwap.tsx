import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import gsap from 'gsap';

export interface CardSwapHandle {
  /** Bring the card at `index` to the front, animating all others into their new slots. */
  goTo: (index: number) => void;
  /** Index of the currently front-most card. */
  getFrontIndex: () => number;
}

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  /** Fired whenever the front-most card changes (auto-swap or goTo). */
  onFrontChange?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-2xl border border-white/15 bg-[#0c0d12] [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onFrontChange,
  skewAmount = 6,
  easing = 'elastic',
  children,
}, forwardedRef) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => ({ current: null }) as CardRef),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const startIntervalRef = useRef<() => void>(() => {});
  const stopIntervalRef = useRef<() => void>(() => {});
  const onFrontChangeRef = useRef(onFrontChange);
  useEffect(() => { onFrontChangeRef.current = onFrontChange; }, [onFrontChange]);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => r.current && placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));
    // Report the initial front card so consumers (e.g. active-tag highlight) can sync on mount.
    onFrontChangeRef.current?.(order.current[0]);

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: '+=500', duration: config.durDrop, ease: config.ease });
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${i * 0.15}`);
      });
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
      tl.call(() => {
        order.current = [...rest, front];
        onFrontChangeRef.current?.(order.current[0]);
      });
    };

    const startInterval = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(swap, delay);
    };
    const stopInterval = () => clearInterval(intervalRef.current);
    startIntervalRef.current = startInterval;
    stopIntervalRef.current = stopInterval;

    swap();
    startInterval();

    if (pauseOnHover) {
      const node = container.current;
      if (!node) return;
      const pause = () => {
        tlRef.current?.pause();
        stopInterval();
      };
      const resume = () => {
        tlRef.current?.play();
        startInterval();
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        stopInterval();
      };
    }
    return () => stopInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  useImperativeHandle(forwardedRef, () => ({
    getFrontIndex: () => order.current[0],
    goTo: (target: number) => {
      if (target < 0 || target >= refs.length) return;
      if (order.current[0] === target) return;

      // Cancel in-flight swap + pause the auto-rotator so the user's choice isn't stolen.
      tlRef.current?.kill();
      stopIntervalRef.current();

      // Rotate the order so `target` lands at slot 0; preserve the cyclic adjacency of the rest.
      const cur = order.current;
      const targetIdx = cur.indexOf(target);
      const newOrder = [...cur.slice(targetIdx), ...cur.slice(0, targetIdx)];

      const total = refs.length;
      const tl = gsap.timeline({
        onComplete: () => {
          order.current = newOrder;
          onFrontChangeRef.current?.(newOrder[0]);
          // Resume auto-cycling from the new front.
          startIntervalRef.current();
        },
      });
      tlRef.current = tl;

      newOrder.forEach((cardIdx, slotIdx) => {
        const el = refs[cardIdx].current;
        if (!el) return;
        const slot = makeSlot(slotIdx, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, 0);
        tl.to(
          el,
          { x: slot.x, y: slot.y, z: slot.z, duration: 0.75, ease: 'power3.out' },
          slotIdx * 0.04,
        );
      });
    },
  }), [refs, cardDistance, verticalDistance]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[2%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[10%] max-[768px]:translate-y-[6%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[15%] max-[480px]:translate-y-[8%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
});

CardSwap.displayName = 'CardSwap';

export default CardSwap;
