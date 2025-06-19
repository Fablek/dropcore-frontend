export interface ViewResult {
  type: "text" | "image" | "unsupported" | "error";
  content?: string;
  base64?: string;
  contentType?: string;
  message?: string;
}

export async function viewFile(fileId: string): Promise<ViewResult> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VIEWER_SERVICE_URL}/view/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch file preview");

  return await res.json();
}
