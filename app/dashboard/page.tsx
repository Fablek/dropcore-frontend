"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { fetchFiles, FileMetadata } from "@/lib/files/fetchFiles";
import { deleteFile } from "@/lib/files/deleteFile";
import { uploadFile } from "@/lib/files/uploadFile";
import { downloadFile } from "@/lib/files/downloadFile";
import { fetchUserInfo, UserSpaceInfo } from "@/lib/users/fetchUserInfo";
import { updateUsedSpace } from "@/lib/users/updateUsedSpace";
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
  const [userInfo, setUserInfo] = useState<UserSpaceInfo | null>(null);
  const [userInfoError, setUserInfoError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!userEmail) return;

    const loadUserInfo = async () => {
      try {
        const info = await fetchUserInfo(userEmail);
        setUserInfo(info);
      } catch (err: any) {
        setUserInfoError(err.message || "Failed to fetch user info");
      }
    };

    loadUserInfo();
  }, [userEmail]);

  const recalculateUsedSpace = async (fileList: FileMetadata[]) => {
    const totalUsed = fileList.reduce((acc, f) => acc + (f.fileSize || 0), 0);

    if (userEmail) {
      try {
        await updateUsedSpace(userEmail, totalUsed);
        const updatedInfo = await fetchUserInfo(userEmail);
        setUserInfo(updatedInfo);
      } catch (err: any) {
        console.error("Failed to update used space:", err.message);
      }
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadProgress(0);
      await uploadFile(file, setUploadProgress);
      addToast({ title: "Upload successful", color: "success" });

      const updated = await fetchFiles();
      setFiles(updated);
      await recalculateUsedSpace(updated);

      fileInputRef.current!.value = "";
    } catch (err: any) {
      addToast({
        title: "Upload failed",
        description: err.message || "Unknown error",
        color: "danger",
      });
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await deleteFile(fileId);
      const updated = files.filter((f) => f.id !== fileId);
      setFiles(updated);
      await recalculateUsedSpace(updated);

      addToast({ title: "File deleted", color: "success" });
    } catch (err: any) {
      addToast({
        title: "Failed to delete",
        description: err.message,
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
    <div className="min-h-screen p-6 space-y-6">
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
          <Button onClick={() => fileInputRef.current?.click()}>
            Upload File
          </Button>
        </div>
      </div>

      {userInfo && (
        <div className="w-full sm:w-96">
          <p className="text-sm text-muted-foreground mb-1">
            Storage usage: {(userInfo.usedSpace / 1024 / 1024).toFixed(2)} MB /{" "}
            {(userInfo.spaceLimit / 1024 / 1024).toFixed(2)} MB (
            {((userInfo.usedSpace / userInfo.spaceLimit) * 100).toFixed(1)}%)
          </p>
          <Progress value={(userInfo.usedSpace / userInfo.spaceLimit) * 100} />
        </div>
      )}
      {userInfoError && (
        <div className="text-sm text-red-500">{userInfoError}</div>
      )}

      <Card className="hidden sm:block">
        <CardBody className="p-0">
          <table className="min-w-full text-sm">
            <thead className="bg-muted text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Size</th>
                <th className="px-4 py-2 text-left">Uploaded</th>
                <th className="px-4 py-2 text-left">Owner</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center text-red-500 py-4">
                    {error}
                  </td>
                </tr>
              ) : files.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No files found.
                  </td>
                </tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id}>
                    <td className="px-4 py-2 flex items-center gap-2 break-all">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {file.fileName}
                    </td>
                    <td className="px-4 py-2">{file.contentType}</td>
                    <td className="px-4 py-2">
                      {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                    </td>
                    <td className="px-4 py-2">
                      {new Date(file.uploadedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{userEmail}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => downloadFile(file.id!, file.fileName)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() =>
                          confirmDelete(file.fileName, () =>
                            handleDelete(file.id!)
                          )
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
        </CardBody>
      </Card>

      {/* Mobile View */}
      <div className="block sm:hidden space-y-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : files.length === 0 ? (
          <p className="text-center">No files found.</p>
        ) : (
          files.map((file) => (
            <Card key={file.id}>
              <CardBody className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium break-all">{file.fileName}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Type: {file.contentType}
                </div>
                <div className="text-sm text-muted-foreground">
                  Size: {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                </div>
                <div className="text-sm text-muted-foreground">
                  Uploaded: {new Date(file.uploadedAt).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Owner: {userEmail}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => downloadFile(file.id!, file.fileName)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                      confirmDelete(file.fileName, () => handleDelete(file.id!))
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-1">Upload progress</p>
        <Progress value={uploadProgress} />
      </div>

      <DeleteFileDialog />
    </div>
  );
}
