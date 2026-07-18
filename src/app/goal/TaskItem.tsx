import { IconCheck } from '../../components/IconCheck';
import type { Task } from './TaskBoards';
import { ActionButton } from '../../components/ActionButton';
import { IconEdit } from '../../components/IconEdit';
import { IconAlert } from '../../components/IconAlert';
import { IconTrash } from '../../components/IconTrash';
import { IconLink } from '../../components/IconLink';
import { IconStar } from '@/components/IconStar';

type TaskItemProps = {
  task: Task;
  active?: boolean;
  muted?: boolean;
  onActivate?: () => void;
};

export function TaskItem({ task, active, muted, onActivate }: TaskItemProps) {
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        onClick={onActivate}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onActivate?.();
        }}
        className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3.5 transition-colors ${active ? 'bg-todo-hover' : muted ? 'bg-transparent' : 'hover:bg-todo-hover/70 bg-white/60'} ${muted ? 'opacity-70' : ''}`}
      >
        <button
          type="button"
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${task.done ? 'border-primary bg-primary text-white' : 'hover:border-primary border-[#d4d4d4] bg-white'}`}
          aria-label={task.done ? '완료 취소' : '완료하기'}
          onClick={(e) => e.stopPropagation()}
        >
          {task.done && <IconCheck className="h-3.5 w-3.5" />}
        </button>
        <p
          className={`min-w-0 flex-1 truncate text-sm ${task.done ? 'text-foreground/50 font-medium line-through' : 'text-foreground font-medium'}`}
        >
          {task.title}
        </p>
        <div
          className={`flex shrink-0 items-center gap-0.5 ${active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}
        >
          {active && (
            <>
              <ActionButton label="수정">
                <IconEdit className="h-4 w-4" />
              </ActionButton>
              <ActionButton label="우선순위">
                <IconAlert className="h-4 w-4" />
              </ActionButton>
            </>
          )}
          <ActionButton label="삭제">
            <IconTrash className="h-4 w-4" />
          </ActionButton>
          <ActionButton label="링크">
            <IconLink className="h-4 w-4" />
          </ActionButton>
          <ActionButton label="찜하기">
            <IconStar
              className={`h-4 w-4 ${task.starred ? 'fill-primary text-primary' : ''}`}
            />
          </ActionButton>
        </div>
      </div>
    </li>
  );
}
