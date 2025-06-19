"use client";

import { useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";

interface FilePreviewDialogProps {
  fileName: string;
  loading: boolean;
  data: {
    type: "text" | "image" | "error";
    content?: string;
    base64?: string;
    contentType?: string;
    message?: string;
  } | null;
  onClose: () => void;
}

export function FilePreviewDialog({
  fileName,
  loading,
  data,
  onClose,
}: FilePreviewDialogProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
      style={{ marginTop: 0 }}
    >
      <Card
        className="w-full max-w-2xl rounded-2xl shadow-2xl relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition cursor-pointer"
          aria-label="Close preview"
        >
          ✖
        </button>
        <CardBody className="p-6 space-y-4 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold break-all">{fileName}</h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner color="default" />
            </div>
          ) : data?.type === "text" ? (
            <pre className="p-3 bg-muted rounded-md overflow-auto whitespace-pre-wrap text-sm">
              {data.content}
            </pre>
          ) : data?.type === "image" ? (
            <img
              src={`data:${data.contentType};base64,${data.base64}`}
              alt="Preview"
              className="rounded-lg max-h-[70vh] mx-auto"
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              {data?.message || "Unsupported file type"}
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
