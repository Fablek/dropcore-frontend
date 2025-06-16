export async function loginUser(
  email: string,
  password: string
): Promise<{ token: string }> {
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_AUTH_SERVICE_URL in .env.local");
  }

  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Login failed");
  }

  return await res.json();
}
