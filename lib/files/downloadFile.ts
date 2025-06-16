export async function downloadFile(fileName: string) {
  const url = `${process.env.NEXT_PUBLIC_FILE_SERVICE_URL}/files/${encodeURIComponent(fileName)}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to download file");
  }

  const blob = await res.blob();
  const href = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}
