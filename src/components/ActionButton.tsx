export function ActionButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="text-muted hover:text-foreground rounded-lg p-1.5 transition-colors hover:bg-white/80"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </button>
  );
}
