export async function deleteFile(id: string): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_FILE_SERVICE_URL;

  const res = await fetch(`${baseUrl}/files/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to delete file");
  }
}
