export async function deleteFile(fileName: string): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_FILE_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_FILE_SERVICE_URL in .env.local");
  }

  const res = await fetch(`${baseUrl}/files/${encodeURIComponent(fileName)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to delete file");
  }
}
