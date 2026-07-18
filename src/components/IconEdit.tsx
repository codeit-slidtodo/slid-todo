import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function IconEdit(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path
        d="M4 20h4l10.5-10.5a2.12 2.12 0 0 0-3-3L5 17v3z"
        strokeLinejoin="round"
      />
      <path d="M13.5 6.5l3 3" strokeLinecap="round" />
    </svg>
  );
}
