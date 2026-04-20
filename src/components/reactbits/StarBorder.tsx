import type { ElementType, ComponentPropsWithoutRef } from 'react';

type StarBorderProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
  thickness?: number;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children' | 'color' | 'speed' | 'thickness'>;

const StarBorder = <T extends ElementType = 'button'>({
  as,
  className = '',
  color = '#6aa7ff',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      style={{ padding: `${thickness}px 0` }}
      {...(rest as Record<string, unknown>)}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div className="relative z-10 bg-gradient-to-b from-[#0c0d12] to-[#1a1b22] border border-white/10 text-white text-center text-sm py-3 px-6 rounded-full">
        {children}
      </div>
      <style>{`
        @keyframes star-movement-bottom { 0% { transform: translate(0%, 0%); opacity: 1; } 100% { transform: translate(-100%, 0%); opacity: 0; } }
        @keyframes star-movement-top { 0% { transform: translate(0%, 0%); opacity: 1; } 100% { transform: translate(100%, 0%); opacity: 0; } }
        .animate-star-movement-bottom { animation: star-movement-bottom linear infinite alternate; }
        .animate-star-movement-top { animation: star-movement-top linear infinite alternate; }
      `}</style>
    </Component>
  );
};

export default StarBorder;
