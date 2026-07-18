import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
export function IconPlus(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
