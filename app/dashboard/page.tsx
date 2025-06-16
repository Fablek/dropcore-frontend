"use client";

import { useState } from "react";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Progress } from "@heroui/progress";
import { FileText, Download, Trash2 } from "lucide-react";

export default function DashboardPage() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const files = [
    { name: "plan.pdf", size: "840 KB", date: "2025-06-15" },
    { name: "photo.jpg", size: "3.1 MB", date: "2025-06-13" },
  ];

  return (
    <div className="bg-background text-foreground p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className={title()}>Dashboard</h1>
        <div className="flex gap-2">
          <Input placeholder="Search files..." className="w-64" />
          <Button variant="secondary">Upload File</Button>
        </div>
      </div>

      {/* File list */}
      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground text-xs uppercase">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-border hover:bg-muted/50 transition"
                  >
                    <td className="px-4 py-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {file.name}
                    </td>
                    <td className="px-4 py-2">{file.size}</td>
                    <td className="px-4 py-2">{file.date}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <Button size="icon" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Upload progress */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">Upload progress</p>
        <Progress value={uploadProgress} />
      </div>
    </div>
  );
}
