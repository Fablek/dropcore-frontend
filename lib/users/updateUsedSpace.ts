export async function updateUsedSpace(email: string, usedSpace: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_USER_SERVICE_URL}/users/${encodeURIComponent(email)}/space`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usedSpace }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update used space (${res.status}): ${text}`);
  }
}
