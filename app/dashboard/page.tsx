"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { fetchFiles, FileMetadata } from "@/lib/files/fetchFiles";
import { deleteFile } from "@/lib/files/deleteFile";
import { uploadFile } from "@/lib/files/uploadFile";
import { downloadFile } from "@/lib/files/downloadFile";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Progress } from "@heroui/progress";
import { FileText, Download, Trash2 } from "lucide-react";
import { useDeleteFileDialog } from "@/components/files/DeleteFileDialog";
import { addToast } from "@heroui/toast";
import { parseJwt } from "@/lib/utils/parseJwt";

export default function DashboardPage() {
  const router = useRouter();
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [authChecked, setAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { open: confirmDelete, DeleteFileDialog } = useDeleteFileDialog();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const decoded = parseJwt(token);
      setUserEmail(decoded?.email || null);
      setAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;

    const load = async () => {
      try {
        const data = await fetchFiles();
        setFiles(data);
      } catch (err: any) {
        setError(err.message || "Error fetching files");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authChecked]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadProgress(0);
      await uploadFile(file, setUploadProgress);

      addToast({
        title: "Upload successful",
        description: `"${file.name}" uploaded successfully.`,
        color: "success",
      });

      const updated = await fetchFiles();
      setFiles(updated);
      fileInputRef.current!.value = "";
    } catch (err: any) {
      addToast({
        title: "Upload failed",
        description: err.message || "Unknown error",
        color: "danger",
      });
    }
  };

  if (!authChecked) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner color="default" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className={title()}>Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input placeholder="Search files..." className="w-full sm:w-64" />
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleUpload}
          />
          <Button
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload File
          </Button>
        </div>
      </div>

      {/* Desktop Table */}
      <Card className="hidden sm:block">
        <CardBody className="p-0">
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full text-sm">
              <thead className="bg-muted text-muted-foreground text-xs uppercase">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Owner</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-4 text-center text-red-500"
                    >
                      {error}
                    </td>
                  </tr>
                ) : files.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-4 text-center">
                      No files found.
                    </td>
                  </tr>
                ) : (
                  files.map((file) => (
                    <tr
                      key={file.fileName}
                      className="border-t border-border hover:bg-muted/50 transition"
                    >
                      <td className="px-4 py-2 flex items-center gap-2 break-all">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {file.fileName}
                      </td>
                      <td className="px-4 py-2">{file.contentType || "-"}</td>
                      <td className="px-4 py-2">{userEmail || "-"}</td>
                      <td className="px-4 py-2 text-right space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={async () => {
                            try {
                              await downloadFile(file.fileName);
                              addToast({
                                title: "Download started",
                                description: `Downloading "${file.fileName}"...`,
                                color: "success",
                              });
                            } catch (err: any) {
                              addToast({
                                title: "Download failed",
                                description: err.message || "Unknown error",
                                color: "danger",
                              });
                            }
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() =>
                            confirmDelete(file.fileName, async () => {
                              try {
                                await deleteFile(file.fileName);
                                setFiles((prev) =>
                                  prev.filter(
                                    (f) => f.fileName !== file.fileName
                                  )
                                );
                                addToast({
                                  title: "File deleted",
                                  description: `"${file.fileName}" was removed successfully.`,
                                  color: "success",
                                });
                              } catch (err: any) {
                                addToast({
                                  title: "Failed to delete file",
                                  description: err.message || "Unknown error",
                                  color: "danger",
                                });
                              }
                            })
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Upload Progress */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">Upload progress</p>
        <Progress value={uploadProgress} />
      </div>

      <DeleteFileDialog />
    </div>
  );
}
