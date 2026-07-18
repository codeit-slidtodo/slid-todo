type ProgressRingProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
};

export function ProgressRing({
  value,
  size = 72,
  strokeWidth = 8,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(value, 0), 100) / 100);

  return (
    <svg width={size} height={size} className="rotate-90" aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255, 255,255, 0.35)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}
