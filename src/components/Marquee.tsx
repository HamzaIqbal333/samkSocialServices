import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  direction = 'left',
  speedSeconds = 28,
  pauseOnHover = true,
  className = ''
}: MarqueeProps) {
  const animationName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight';

  return (
    <div
      className={`relative flex w-full overflow-hidden select-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)'
      }}
    >
      <div
        className={`flex shrink-0 items-center justify-around gap-8 sm:gap-14 ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          minWidth: '100%',
          animation: `${animationName} ${speedSeconds}s linear infinite`,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-around gap-8 sm:gap-14 ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          minWidth: '100%',
          animation: `${animationName} ${speedSeconds}s linear infinite`,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}
