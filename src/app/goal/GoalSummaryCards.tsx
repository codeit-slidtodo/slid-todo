'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { IconFlag } from '@/components/IconFlag';
import { IconMore } from '@/components/IconMore';
import { NotesBannerArt } from '@/components/NotesBannerArt';
import { ProgressRing } from '@/components/ProgressRing';

type GoalSummaryCardsProps = {
  title: string;
  progress: number;
  onEdit?: (title: string) => Promise<void> | void;
  onDelete?: () => void;
};

export function GoalSummaryCards({
  title,
  progress,
  onEdit,
  onDelete,
}: GoalSummaryCardsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const [saving, setSaving] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraft(title);
  }, [title]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const submitEdit = async (e?: FormEvent) => {
    e?.preventDefault();
    const next = draft.trim();
    if (!next || next === title) {
      setDraft(title);
      setEditing(false);
      return;
    }

    try {
      setSaving(true);
      await onEdit?.(next);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-stretch gap-4">
      <div className="bg-card relative flex min-w-0 flex-1 items-center gap-3 rounded-[20px] px-5 py-4 shadow-sm">
        <span className="bg-primary-soft text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          <IconFlag className="h-5 w-5" />
        </span>

        {editing ? (
          <form onSubmit={submitEdit} className="min-w-0 flex-1">
            <input
              autoFocus
              value={draft}
              disabled={saving}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => void submitEdit()}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setDraft(title);
                  setEditing(false);
                }
              }}
              className="text-foreground border-primary w-full rounded-lg border bg-white px-2 py-1 text-base font-semibold outline-none"
            />
          </form>
        ) : (
          <p className="text-foreground min-w-0 flex-1 truncate text-base font-semibold">
            {title}
          </p>
        )}

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            aria-label="더보기"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-muted hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          >
            <IconMore className="h-5 w-5" />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute top-full right-0 z-20 mt-1 min-w-[120px] overflow-hidden rounded-2xl bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              <button
                type="button"
                role="menuitem"
                className="text-foreground hover:bg-background w-full px-4 py-2.5 text-left text-sm font-medium transition-colors"
                onClick={() => {
                  setMenuOpen(false);
                  setDraft(title);
                  setEditing(true);
                }}
              >
                수정하기
              </button>
              <button
                type="button"
                role="menuitem"
                className="text-foreground hover:bg-background w-full px-4 py-2.5 text-left text-sm font-medium transition-colors"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.();
                }}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
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
        className="bg-teal flex w-[280px] shrink-0 items-center justify-between overflow-hidden rounded-[20px] px-5 py-4 text-left text-white shadow-[0_4px_20px_rgba(98,210,195,0.28)] transition-opacity hover:opacity-90"
      >
        <span className="inline-flex items-center gap-1 text-sm font-semibold">
          노트 모아보기
          <span aria-hidden>&gt;</span>
        </span>
        <NotesBannerArt className="h-14 w-[72px] shrink-0" />
      </button>
    </div>
  );
}
