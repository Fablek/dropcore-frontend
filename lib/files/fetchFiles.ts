export interface FileMetadata {
  id: string;
  fileName: string;
  storageFileName: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
  ownerId: string;
}

export async function fetchFiles(): Promise<FileMetadata[]> {
  const baseUrl = process.env.NEXT_PUBLIC_FILE_SERVICE_URL;

  const res = await fetch(`${baseUrl}/files`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch files");

  return await res.json();
}
