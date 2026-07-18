import { IconFlag } from '@/components/IconFlag';
import { IconMore } from '@/components/IconMore';
import { IconNote } from '@/components/IconNote';
import { ProgressRing } from '@/components/ProgressRing';

type GoalSummaryCardsProps = {
  title: string;
  progress: number;
};

export function GoalSummaryCards({ title, progress }: GoalSummaryCardsProps) {
  return (
    <div className="flex items-stretch gap-4">
      <div className="bg-card flex min-w-0 flex-1 items-center gap-3 rounded-[20px] px-5 py-4 shadow-sm">
        <span className="bg-primary-soft text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          <IconFlag className="h-5 w-5" />
        </span>
        <p className="text-foreground min-w-0 flex-1 truncate text-base font-semibold">
          {title}
        </p>
        <button
          type="button"
          aria-label="더보기"
          className="text-muted hover:text-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors"
        >
          <IconMore className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-primary flex w-[280px] shrink-0 items-center gap-4 rounded-[20px] px-5 py-4 text-white shadow-[0_4px_20px_rgba(255,132,66,0.28)]">
        <ProgressRing value={progress} size={64} strokeWidth={7} />
        <div>
          <p className="text-sm font-medium text-white/90">목표 진행도</p>
          <p className="text-2xl font-bold tracking-tight">{progress}%</p>
        </div>
      </div>

      <button
        type="button"
        className="bg-teal flex w-[280px] shrink-0 items-center gap-3 rounded-[20px] px-5 py-4 text-left text-white shadow-[0_4px_20px_rgba(98,210,195,0.28)] transition-opacity hover:opacity-90"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20">
          <IconNote className="h-5 w-5" />
        </span>
        <span className="text-sm font-semibold">노트 모아보기 &gt;</span>
      </button>
    </div>
  );
}
