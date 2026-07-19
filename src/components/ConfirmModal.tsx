'use client';

import { useEffect } from 'react';
import { IconAlert } from '@/components/IconAlert';

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title = '정말 삭제하시겠어요?',
  message = '삭제된 목표는 복구할 수 없습니다.',
  confirmLabel = '확인',
  cancelLabel = '취소',
  confirming = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !confirming) onCancel();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, confirming, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="presentation"
      onClick={() => {
        if (!confirming) onCancel();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="w-full max-w-[320px] rounded-[24px] bg-white px-6 pt-8 pb-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <h2
            id="confirm-modal-title"
            className="text-foreground text-lg font-bold tracking-tight"
          >
            {title}
          </h2>
          <p className="text-primary mt-3 flex items-center justify-center gap-1.5 text-sm font-medium">
            <IconAlert className="h-4 w-4 shrink-0" aria-hidden />
            <span>{message}</span>
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={confirming}
            onClick={onCancel}
            className="border-border text-foreground hover:bg-background rounded-full border bg-white py-3 text-sm font-semibold transition-colors disabled:opacity-40"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={confirming}
            onClick={onConfirm}
            className="bg-primary hover:bg-primary-hover rounded-full py-3 text-sm font-semibold text-white transition-colors disabled:opacity-40"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
