import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
export function IconCalendar(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" strokeLinecap="round" />
      <path d="M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}
