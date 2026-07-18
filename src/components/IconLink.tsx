import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function IconLink(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path
        d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.5 5.43"
        strokeLinecap="round"
      />
      <path
        d="M14 11a5 5 0 0 0-7.07 0L4.8 13.12a5 5 0 0 0 7.07 7.07L13.5 18.57"
        strokeLinecap="round"
      />
    </svg>
  );
}
