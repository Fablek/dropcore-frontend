// lib/auth/registerUser.ts

export async function registerUser({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_AUTH_SERVICE_URL in .env.local");
  }

  const res = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Registration failed");
  }
}
