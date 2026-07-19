'use client';

import {  useState } from 'react';
import { IconCalendar } from '../../components/IconCalendar';
import { IconPlus } from '../../components/IconPlus';
import { TaskItem } from './TaskItem';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  starred?: boolean;
};

type TaskBoardProps = {
  todos: Task[];
  dones: Task[];
  busyId?: string | null;
  onAddTodo?: (title: string) => Promise<void> | void;
  onToggleDone?: (task: Task) => Promise<void> | void;
  onEditTodo?: (task: Task, title: string) => Promise<void> | void;
  onDeleteTodo?: (task: Task) => Promise<void> | void;
};

export function TaskBoards({
  todos,
  dones,
  busyId,
  onAddTodo,
  onToggleDone,
  onEditTodo,
  onDeleteTodo,
}: TaskBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const title = draft.trim();
    if (!title || submitting) return;

    try {
      setSubmitting(true);
      await onAddTodo?.(title);
      setDraft('');
      setAdding(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <section>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="text-foreground mr-auto text-lg font-bold tracking-wide">
            To Do
          </h2>
          <button
            type="button"
            className="border-[#cccccc] text-foreground/80 hover:bg-background inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-colors"
          >
            <IconCalendar className="text-[#cccccc] h-4 w-4" />캘린더 보기
          </button>
          <button
            type="button"
            onClick={() => setAdding((prev) => !prev)}
            className="bg-primary hover:bg-primary-hover inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold text-white transition-colors"
          >
            <IconPlus className="h-4 w-4" />할 일 추가
          </button>
        </div>

        {adding && (
          <form
            onSubmit={handleAdd}
            className="bg-todo-bg mb-2 flex items-center gap-2 rounded-[20px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          >
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="할 일을 입력하세요"
              disabled={submitting}
              className="text-foreground min-w-0 flex-1 rounded-xl border border-transparent bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={submitting || !draft.trim()}
              className="bg-primary hover:bg-primary-hover rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              추가
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => {
                setDraft('');
                setAdding(false);
              }}
              className="text-muted hover:text-foreground rounded-xl px-3 py-2.5 text-sm font-medium"
            >
              취소
            </button>
          </form>
        )}

        <ul className="bg-todo-bg space-y-2 rounded-[20px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          {todos.length === 0 ? (
            <li className="text-muted px-2 py-4 text-center text-sm">
              할 일이 없습니다
            </li>
          ) : (
            todos.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                active={activeId === task.id}
                busy={busyId === task.id}
                onActivate={() => setActiveId(task.id)}
                onToggleDone={onToggleDone}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo}
              />
            ))
          )}
        </ul>
      </section>

      <section>
        <div className="mb-3 flex items-center">
          <h2 className="text-foreground text-lg font-bold tracking-wide">
            Done
          </h2>
        </div>

        <ul className="bg-card space-y-2 rounded-[20px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          {dones.length === 0 ? (
            <li className="text-muted px-2 py-4 text-center text-sm">
              완료한 할 일이 없습니다
            </li>
          ) : (
            dones.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                active={activeId === task.id}
                muted
                busy={busyId === task.id}
                onActivate={() => setActiveId(task.id)}
                onToggleDone={onToggleDone}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo}
              />
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
