export interface FileMetadata {
  id?: string;
  fileName: string;
  contentType?: string;
  ownerId?: string;
}

export async function fetchFiles(): Promise<FileMetadata[]> {
  const baseUrl = process.env.NEXT_PUBLIC_FILE_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_FILE_SERVICE_URL in .env.local");
  }

  const res = await fetch(`${baseUrl}/files`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch files");
  }

  return await res.json();
}
