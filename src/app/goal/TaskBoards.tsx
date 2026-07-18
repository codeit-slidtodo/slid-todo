'use client';

import { useState } from 'react';
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
};

export function TaskBoards({ todos, dones }: TaskBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(todos[1]?.id ?? null);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <section>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="text-foreground mr-auto text-lg font-bold tracking-wide">
            To Do
          </h2>
          <button
            type="button"
            className="border-bg-card text-foreground/80 hover:bg-background inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-medium transition-colors"
          >
            <IconCalendar className="text-primary h-4 w-4" />
          </button>
          <button
            type="button"
            className="bg-primary hover:bg-primary-hover inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold text-white transition-colors"
          >
            <IconPlus className="h-4 w-4" />할 일 추가
          </button>
        </div>

        <ul className="bg-todo-bg space-y-2 rounded-[20px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          {todos.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              active={activeId === task.id}
              onActivate={() => setActiveId(task.id)}
            />
          ))}
        </ul>
      </section>

      <section>
        <div className="mb-3 flex items-center">
          <h2 className="text-foreground text-lg font-bold tracking-wide">
            Done
          </h2>
        </div>

        <ul className="bg-card space-y-2 rounded-[20px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          {dones.map((task) => (
            <TaskItem key={task.id} task={task} active={false} muted />
          ))}
        </ul>
      </section>
    </div>
  );
}
