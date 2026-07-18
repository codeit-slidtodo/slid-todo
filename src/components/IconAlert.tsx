import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function IconAlert(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16.5v.5" strokeLinecap="round" />
    </svg>
  );
}
