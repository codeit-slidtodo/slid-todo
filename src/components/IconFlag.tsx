import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function IconFlag(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="M5 21V4" strokeLinecap="round" />
      <path
        d="M5 4h11l-1.5 3.5L16 11H5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
