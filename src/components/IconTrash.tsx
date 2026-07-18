import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function IconTrash(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path
        d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
