import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function IconCheck(props: IconProps) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" {...props}>
        <path d="M5 12.5l5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }