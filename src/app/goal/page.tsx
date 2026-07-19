'use client';

import { useCallback, useEffect, useState } from 'react';
import { ensureAuth } from '@/lib/auth';
import { del, get, patch, post } from '@/lib/api';
import { ConfirmModal } from '@/components/ConfirmModal';
import { Task, TaskBoards } from './TaskBoards';
import { GoalSummaryCards } from './GoalSummaryCards';

type User = {
  id: number;
  name: string;
};

type GoalSummary = {
  id: number;
  title: string;
};

type ApiTodo = {
  id: number;
  title: string;
  done: boolean;
  isFavorite: boolean;
};

type GoalDetail = {
  id: number;
  title: string;
  todos: ApiTodo[];
};

type GoalsResponse = {
  goals: GoalSummary[];
};

function toTask(todo: ApiTodo): Task {
  return {
    id: String(todo.id),
    title: todo.title,
    done: todo.done,
    starred: todo.isFavorite,
  };
}

function splitTasks(tasks: Task[]) {
  return {
    todos: tasks.filter((task) => !task.done),
    dones: tasks.filter((task) => task.done),
    progress:
      tasks.length > 0
        ? Math.round((tasks.filter((task) => task.done).length / tasks.length) * 100)
        : 0,
  };
}

export default function GoalPage() {
  const [userName, setUserName] = useState('');
  const [goalId, setGoalId] = useState<number | null>(null);
  const [goalTitle, setGoalTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [todos, setTodos] = useState<Task[]>([]);
  const [dones, setDones] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [goalDeleteOpen, setGoalDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const applyTasks = useCallback((tasks: Task[]) => {
    const next = splitTasks(tasks);
    setTodos(next.todos);
    setDones(next.dones);
    setProgress(next.progress);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadGoal() {
      try {
        setLoading(true);
        setError(null);
        await ensureAuth();

        const [userRes, goalsRes] = await Promise.all([
          get('/users/me'),
          get('/goals'),
        ]);

        if (!userRes.ok || !goalsRes.ok) {
          throw new Error('목표 정보를 불러오지 못했습니다.');
        }

        const user = (await userRes.json()) as User;
        const { goals } = (await goalsRes.json()) as GoalsResponse;
        const firstGoal = goals[0];

        if (!firstGoal) {
          if (!cancelled) {
            setUserName(user.name);
            setGoalId(null);
            setGoalTitle('');
            applyTasks([]);
          }
          return;
        }

        const goalRes = await get(`/goals/${firstGoal.id}`);
        if (!goalRes.ok) {
          throw new Error('목표 상세를 불러오지 못했습니다.');
        }

        const goal = (await goalRes.json()) as GoalDetail;

        if (!cancelled) {
          setUserName(user.name);
          setGoalId(goal.id);
          setGoalTitle(goal.title);
          applyTasks(goal.todos.map(toTask));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadGoal();
    return () => {
      cancelled = true;
    };
  }, [applyTasks]);

  const allTasks = [...todos, ...dones];

  const handleAddTodo = async (title: string) => {
    if (!goalId) return;

    const res = await post('/todos', { title, goalId });
    if (!res.ok) {
      setActionError('할 일 추가에 실패했습니다.');
      return;
    }

    const created = (await res.json()) as ApiTodo;
    setActionError(null);
    applyTasks([toTask(created), ...allTasks]);
  };

  const handleToggleDone = async (task: Task) => {
    setBusyId(task.id);
    try {
      const res = await patch(`/todos/${task.id}`, { done: !task.done });
      if (!res.ok) {
        setActionError('할 일 상태 변경에 실패했습니다.');
        return;
      }
      const updated = (await res.json()) as ApiTodo;
      setActionError(null);
      applyTasks(
        allTasks.map((item) => (item.id === task.id ? toTask(updated) : item)),
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleEditTodo = async (task: Task, title: string) => {
    setBusyId(task.id);
    try {
      const res = await patch(`/todos/${task.id}`, { title });
      if (!res.ok) {
        setActionError('할 일 수정에 실패했습니다.');
        return;
      }
      const updated = (await res.json()) as ApiTodo;
      setActionError(null);
      applyTasks(
        allTasks.map((item) => (item.id === task.id ? toTask(updated) : item)),
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleDeleteTodo = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleEditGoal = async (title: string) => {
    if (!goalId) return;

    const res = await patch(`/goals/${goalId}`, { title });
    if (!res.ok) {
      setActionError('목표 수정에 실패했습니다.');
      return;
    }

    const updated = (await res.json()) as GoalSummary;
    setActionError(null);
    setGoalTitle(updated.title);
  };

  const handleRequestDeleteGoal = () => {
    setGoalDeleteOpen(true);
  };

  const handleCancelDelete = useCallback(() => {
    if (deleting) return;
    setTaskToDelete(null);
    setGoalDeleteOpen(false);
  }, [deleting]);

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      setDeleting(true);
      setBusyId(taskToDelete.id);
      try {
        const res = await del(`/todos/${taskToDelete.id}`);
        if (!res.ok) {
          setActionError('할 일 삭제에 실패했습니다.');
          return;
        }
        setActionError(null);
        applyTasks(allTasks.filter((item) => item.id !== taskToDelete.id));
        setTaskToDelete(null);
      } finally {
        setBusyId(null);
        setDeleting(false);
      }
      return;
    }

    if (!goalDeleteOpen || !goalId) return;

    setDeleting(true);
    try {
      const res = await del(`/goals/${goalId}`);
      if (!res.ok) {
        setActionError('목표 삭제에 실패했습니다.');
        return;
      }

      setActionError(null);
      setGoalDeleteOpen(false);
      setGoalId(null);
      setGoalTitle('');
      applyTasks([]);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-[1312px] flex-col gap-8 px-8 py-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">
          {userName ? `${userName}님의 목표` : '목표'}
        </h2>
        {loading ? (
          <p className="text-muted text-sm">불러오는 중...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : goalTitle ? (
          <GoalSummaryCards
            title={goalTitle}
            progress={progress}
            onEdit={handleEditGoal}
            onDelete={handleRequestDeleteGoal}
          />
        ) : (
          <p className="text-muted text-sm">등록된 목표가 없습니다.</p>
        )}
      </section>
      {!loading && !error && goalId && (
        <section className="flex flex-col gap-3">
          {actionError && (
            <p className="text-sm text-red-500">{actionError}</p>
          )}
          <TaskBoards
            todos={todos}
            dones={dones}
            busyId={busyId}
            onAddTodo={handleAddTodo}
            onToggleDone={handleToggleDone}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </section>
      )}

      <ConfirmModal
        open={taskToDelete !== null || goalDeleteOpen}
        confirming={deleting}
        message={
          goalDeleteOpen
            ? '삭제된 목표는 복구할 수 없습니다.'
            : '삭제된 할 일은 복구할 수 없습니다.'
        }
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
