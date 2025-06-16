"use client";

import { useState } from "react";

interface DeleteFileDialogProps {
  fileName: string;
  onConfirm: () => void;
}

export function useDeleteFileDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const open = (file: string, callback: () => void) => {
    setFileName(file);
    setOnConfirm(() => callback);
    setIsOpen(true);
  };

  const DeleteFileDialog = () =>
    isOpen && fileName ? (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl w-full max-w-md space-y-4">
          <h2 className="text-lg font-semibold">Delete file?</h2>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{fileName}</strong>? This
            action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 text-sm rounded-md bg-muted hover:bg-muted/70"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                setIsOpen(false);
                onConfirm();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ) : null;

  return { open, DeleteFileDialog };
}
