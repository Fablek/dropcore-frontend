export interface FileMetadata {
  id?: string;
  fileName: string;
  contentType?: string;
  ownerId?: string;
}

export async function fetchFiles(): Promise<FileMetadata[]> {
  const res = await fetch("http://localhost:5002/files", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`, // jeśli wymagane
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch files");
  }

  return await res.json();
}
