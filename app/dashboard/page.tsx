"use client";

import { useEffect, useState } from "react";
import { fetchFiles, FileMetadata } from "@/lib/api/fetchFiles";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Progress } from "@heroui/progress";
import { FileText, Download, Trash2 } from "lucide-react";

export default function DashboardPage() {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={title()}>Dashboard</h1>
        <div className="flex gap-2">
          <Input placeholder="Search files..." className="w-64" />
          <Button variant="secondary">Upload File</Button>
        </div>
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-sm">
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
                      <td className="px-4 py-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {file.fileName}
                      </td>
                      <td className="px-4 py-2">{file.contentType || "-"}</td>
                      <td className="px-4 py-2">{file.ownerId || "-"}</td>
                      <td className="px-4 py-2 text-right space-x-2">
                        <Button size="icon" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="destructive">
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

      <div>
        <p className="text-sm text-muted-foreground mb-1">Upload progress</p>
        <Progress value={0} />
      </div>
    </div>
  );
}
