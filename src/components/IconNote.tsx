import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function IconNote(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path
        d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        strokeLinejoin="round"
      />
      <path d="M15 3v4h4M9 12h6M9 16h4" strokeLinecap="round" />
      <path
        d="M14.5 9.5l2 2L12 16l-2.5.5.5-2.5 4.5-4.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
