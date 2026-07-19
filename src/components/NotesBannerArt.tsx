import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** 노트 모아보기 배너용 일러스트 */
export function NotesBannerArt(props: IconProps) {
  return (
    <svg viewBox="0 0 88 72" fill="none" aria-hidden {...props}>
      <g transform="rotate(-12 44 36)">
        {/* spiral notebook */}
        <rect
          x="14"
          y="6"
          width="42"
          height="50"
          rx="9"
          fill="#B8EDE3"
        />
        <circle cx="25" cy="13" r="2.4" fill="#7FD4C5" />
        <circle cx="35" cy="13" r="2.4" fill="#7FD4C5" />
        <circle cx="45" cy="13" r="2.4" fill="#7FD4C5" />
        <path
          d="M24 26h22M24 34h22M24 42h14"
          stroke="#7FD4C5"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* note with dog-ear */}
        <path
          d="M40 30h24a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5H40a5 5 0 0 1-5-5V35a5 5 0 0 1 5-5z"
          fill="#D7F5EF"
        />
        <path d="M57 30v9h9L57 30z" fill="#9FE0D3" />
        <path
          d="M45 44h14M45 51h10"
          stroke="#62D2C3"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* pen */}
        <rect
          x="66"
          y="28"
          width="7"
          height="30"
          rx="2.5"
          transform="rotate(32 69.5 43)"
          fill="#2F8F82"
        />
        <path
          d="M73.8 54.2l2.8 5.6-5.8-1.6 3-4z"
          fill="#246F65"
        />
      </g>
    </svg>
  );
}
